import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

// Create a UserContext to share user data across the application
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "", // Consider removing password from the profile for security reasons
    contact: "",
    profilePicture: "",
    location: "",
    city: "",
    zipcode: "",
    trackingNumber: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Listen to user profile data from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const unsubscribeProfile = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            console.log("Fetched profile data:", doc.data()); // Log fetched data
            setProfile(doc.data()); // Update profile data in context
          } else {
            console.log("No profile found, initializing empty profile.");
            // Optionally reset profile state or handle it accordingly
          }
        });

        return () => {
          unsubscribeProfile(); // Cleanup listener on unmount
        };
      } else {
        setUser(null);
        // Reset profile state on logout
        setProfile({
          name: "",
          email: "",
          password: "",
          contact: "",
          profilePicture: "",
          location: "",
          city: "",
          zipcode: "",
          trackingNumber: "",
        });
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const updateProfile = async (newProfileData) => {
    try {
      if (!user) return; // Ensure user is logged in before updating
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, newProfileData, { merge: true });
      setProfile((prev) => ({ ...prev, ...newProfileData }));
    } catch (error) {
      console.error("Error updating profile:", error); // Log error
    }
  };

  console.log("🚀 ~ UserProvider ~ profile:", profile); // Log profile data for debugging
  return (
    <UserContext.Provider value={{ user, profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming user context
const useUser = () => {
  return useContext(UserContext);
};

export { useUser, UserContext };
