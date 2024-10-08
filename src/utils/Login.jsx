import React, { useState, useEffect, useContext } from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { UserContext } from "../Context/UserProvider"; // Import UserContext
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth } from "../utils/firebase"; // Import Firebase auth instance
import { toast } from "react-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [introVisible, setIntroVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To store error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(UserContext); // Access user context

  useEffect(() => {
    // Trigger the animations after the component mounts
    setIntroVisible(true);
    setLoginVisible(true);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true when starting the login process
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or handle successful login
      if (email === "adminShahab@quickCard.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Logged in Successfully");
    } catch (error) {
      setError(error.message); // Set error message on failure
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after the process is done
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
            Welcome to QuickCart!
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4">
            QuickCart is your ultimate e-commerce destination for buying and
            selling goods. We offer a wide range of products at competitive
            prices, ensuring a seamless and secure shopping experience. Our
            platform is designed for convenience, with a focus on trust and
            transparency.
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

        {/* Left - Login Form */}
        <div
          className={`bg-white p-8 shadow-lg rounded-lg order-1 lg:order-2 transform transition-transform duration-700 ease-out ${
            loginVisible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-full">
            {/* Title */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                Log in to QuickCart
              </h2>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-xs text-center">{error}</p>
            )}

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

            {/* Form for Login */}
            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="relative mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-4 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                  autoComplete="email" // Added autocomplete attribute
                  required // Make it a required field
                />
              </div>
              {/* Password Input */}
              <div className="relative mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-4 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                  autoComplete="current-password" // Added autocomplete attribute
                  required // Make it a required field
                />
              </div>
              {/* Forgot Password */}
              <div className="text-right mb-6">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              {/* Login Button */}
              <button
                type="submit" // Changed to "submit" type
                className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-all duration-300"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12c0-4.418 3.582-8 8-8v2a6 6 0 00-6 6H4z"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Log in"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to={`/auth/signup`}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
