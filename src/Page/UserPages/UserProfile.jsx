import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/UserProvider";
import { db, storage } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    city: "",
    zipcode: "",
    profilePicture: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150"); // Default image

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      // Fetch profile data if user is available
      const fetchProfileData = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const profileData = userDoc.data();
          setFormData({
            ...profileData,
          });
          setImageUrl(
            profileData.profilePicture || "https://via.placeholder.com/150"
          );
        } else {
          console.log("No such document!");
        }
      };

      fetchProfileData();
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile)); // Preview the selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let uploadedImageUrl = formData.profilePicture; // Use existing URL if no new file

    if (file) {
      const storageRef = ref(
        storage,
        `profilePictures/${user.uid}/${file.name}`
      );
      await uploadBytes(storageRef, file);
      uploadedImageUrl = await getDownloadURL(storageRef);
    }

    const updatedData = {
      ...formData,
      email: user?.email || "", // Make sure email is set if available
      profilePicture: uploadedImageUrl,
    };

    await updateProfile(updatedData);
    setUploading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl text-gray-700 font-bold mb-2">Profile</h2>

        {/* Profile Picture Section */}
        <div className="flex justify-center mb-4">
          <label className="relative cursor-pointer">
            <img
              src={imageUrl}
              alt="Profile"
              className="h-32 w-32 rounded-full border border-gray-300 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user?.email || ""}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              id="contact"
              value={formData.contact || ""}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Enter your location"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city || ""}
              onChange={handleChange}
              placeholder="Enter your city"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium text-gray-700"
            >
              Zip Code
            </label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              value={formData.zipcode || ""}
              onChange={handleChange}
              placeholder="Enter your zip code"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all duration-300"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
