import React, { useState, useEffect, useContext } from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { UserContext } from "../Context/UserProvider"; // Import UserContext for user data management
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth, db } from "../utils/firebase"; // Import Firebase instances
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { useNavigate } from "react-router-dom";
import { toast } from "react-toast";

function Signup() {
  const [introVisible, setIntroVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const { user, updateProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the animations after the component mounts
    setIntroVisible(true);
    setSignupVisible(true);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.contact) newErrors.contact = "Contact number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop if there are validation errors
    }

    setLoading(true); // Start loading state
    try {
      // Handle the signup logic
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const { user: newUser } = userCredential;

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        profilePicture: "", // Default value for profile picture
        // Add any other default fields here
      });

      // Update context with new profile data
      updateProfile({
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        profilePicture: "", // Set the default profile picture
      });

      // Reset form and errors
      setFormData({ name: "", contact: "", email: "", password: "" });
      setErrors({});
      toast.success("Signup Successful");

      // Redirect after successful signup
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message);
      setErrors({ general: "Error signing up. Please try again." });
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Right - Intro Section */}
        <div
          className={`flex flex-col justify-center bg-white p-8 shadow-lg rounded-lg lg:order-1 transform transition-transform duration-700 ease-out ${
            introVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4">
            Join QuickCart Today!
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4">
            QuickCart is your ultimate e-commerce destination for buying and
            selling goods. Sign up now and gain access to a wide range of
            products at competitive prices, ensuring a seamless and secure
            shopping experience.
          </p>
          <ul className="list-disc list-inside text-gray-700 text-sm md:text-base">
            <li>Wide range of mobile phones and accessories</li>
            <li>Fast and secure transactions</li>
            <li>Easy-to-use platform for buying and selling</li>
            <li>24/7 customer support</li>
          </ul>
          <p className="text-gray-700 mt-4 text-sm md:text-base lg:text-lg">
            Join thousands of happy customers today and enjoy a smooth,
            hassle-free shopping experience with QuickCart!
          </p>
        </div>

        {/* Left - Sign Up Form */}
        <div
          className={`bg-white p-8 shadow-lg rounded-lg order-1 lg:order-2 transform transition-transform duration-700 ease-out ${
            signupVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-full">
            {/* Title */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Create an Account
              </h2>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <button
                type="button"
                className="flex items-center justify-center w-full py-2.5 text-gray-500 font-bold rounded-lg transition-all duration-300"
              >
                <img
                  alt="Google Logo"
                  src="https://cdn.visily.ai/app/production/1727419164556/static/GoogleLogo-842bfc2a.svg"
                  className="h-5 w-5 mr-2"
                />
                Continue with Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center w-full py-2.5 text-gray-500 font-bold rounded-lg transition-all duration-300"
              >
                <BiLogoFacebook size={24} className="text-blue-500 font-bold" />
                Continue with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex justify-center text-sm my-4">
              <span className="bg-white px-4 text-gray-500">OR</span>
              <div className="absolute inset-0 border-t border-gray-300"></div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full py-2 px-4 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name"
                  autoComplete="name" // Added autocomplete attribute
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              {/* Contact Input */}
              <div className="relative mb-4">
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 11);
                    setFormData({ ...formData, contact: value });
                  }}
                  maxLength={11}
                  className="w-full py-2 px-4 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contact Number"
                  autoComplete="tel" // Added autocomplete attribute
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs">{errors.contact}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative mb-4">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full py-2 px-4 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                  autoComplete="email" // Added autocomplete attribute
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative mb-4">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full py-2 px-4 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                  autoComplete="current-password" // Added autocomplete attribute
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              {/* Error Message */}
              {errors.general && (
                <p className="text-red-500 text-xs text-center mt-2">
                  {errors.general}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
