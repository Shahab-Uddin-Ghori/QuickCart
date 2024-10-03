import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function PageNotFound() {
  const navigate = useNavigate(); // Initialize navigation hook
  const [countdown, setCountdown] = useState(3); // State to manage countdown value

  // Function to handle navigation back to the homepage
  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage when called
  };

  // Effect to handle countdown and redirect after reaching zero
  useEffect(() => {
    // If countdown reaches zero, navigate to the homepage
    if (countdown === 0) {
      navigate("/"); // Automatically navigate to the homepage
      return; // Exit effect if countdown is zero
    }

    // Decrease countdown every second
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1); // Decrease countdown by 1
    }, 1000); // Interval set for 1 second

    // Cleanup function to clear the interval if the component unmounts or countdown reaches zero
    return () => clearInterval(timer);
  }, [countdown, navigate]); // Dependency array ensures effect runs when countdown changes

  return (
    <div className={`h-screen w-screen flex items-center `}>
      <div className="container flex flex-col md:flex-row items-center justify-between px-5">
        {/* 404 Text and Message Section */}
        <div className="w-full lg:w-1/2 mx-8">
          <h3 className="text-3xl sm:text-7xl mt-16">404</h3>{" "}
          {/* Displaying the 404 error code */}
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry, we couldn't find the page you're looking for.{" "}
            {/* Error message */}
          </p>
          {/* Back to Homepage Button */}
          <button
            onClick={handleBackToHome} // Calling function on click
            className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-zinc-50 bg-orange-600 hover:bg-orange-700 transition-all duration-400 border border-transparent rounded-lg focus:outline-none"
          >
            Back to Homepage {/* Button text */}
          </button>
          <div className="mt-4 text-lg">
            Redirecting in {countdown} seconds... {/* Countdown display */}
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" // Image representing "Page Not Found"
            alt="Page not found" // Alt text for accessibility
          />
        </div>
      </div>
    </div>
  );
}

export default PageNotFound; // Exporting the component for use in other parts of the application
