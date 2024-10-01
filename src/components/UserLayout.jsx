import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/logo.png";
import { useAds } from "../Context/AdProvider"; // Use the custom hook here
import { UserContext } from "../Context/UserProvider";

function UserLayout() {
  const navigate = useNavigate();
  const { ads } = useAds(); // Use the custom hook
  const { profile } = useContext(UserContext);
  console.log(profile);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing option
      once: true, // Animation happens only once while scrolling
    });
  }, []);

  // Section 3: Testimonials Data
  const testimonials = [
    {
      id: 1,
      quote: "Amazing service and top-notch products!",
      name: "John Doe",
    },
    // ... other testimonials
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialItemsToShow, setTestimonialItemsToShow] = useState(4);

  useEffect(() => {
    const updateItemsToShow = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        setTestimonialItemsToShow(4);
      } else if (screenWidth >= 768) {
        setTestimonialItemsToShow(3);
      } else if (screenWidth >= 640) {
        setTestimonialItemsToShow(2);
      } else {
        setTestimonialItemsToShow(1);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const handleNextTestimonial = () => {
    setTestimonialIndex((prevIndex) =>
      prevIndex + testimonialItemsToShow >= testimonials.length
        ? 0
        : prevIndex + testimonialItemsToShow
    );
  };

  const handlePreviousTestimonial = () => {
    setTestimonialIndex((prevIndex) =>
      prevIndex === 0
        ? testimonials.length - testimonialItemsToShow
        : prevIndex - testimonialItemsToShow
    );
  };

  return (
    <div className="w-full min-h-[calc(100vh-4.5rem)] flex flex-col overflow-x-hidden">
      {/* Section 1: Hero Section with 3D effect */}
      <div className="sec1 w-full h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center text-center px-4 relative">
        {/* Floating background card */}
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <div className="w-80 h-80 bg-white/10 backdrop-blur-lg rounded-lg shadow-2xl transform scale-110 rotate-12 hover:rotate-0 transition-all duration-500 flex justify-center items-center">
            <img src={logo} alt="" className="opacity-20" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-700 z-10  animate-bounce">
          Next-Gen Shopping Experience
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mt-4 z-10">
          Discover new dimensions in eCommerce today
        </p>

        <button
          className="mt-8 bg-gray-700 text-white text-lg md:text-xl px-8 py-4 rounded-lg shadow-lg hover:drop-shadow-2xl shadow-md transition-transform duration-300 transform hover:scale-110 z-10"
          onClick={() => navigate("/Allproducts")}
        >
          Shop Now
        </button>

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-0 bg-zinc-200 rounded-full w-32 h-32 blur-3xl"></div>
      </div>

      {/* Section 2: Featured Products */}
      <div className="w-full py-12 px-4 bg-white" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ads.slice(0, 8).map((ad) => (
            <div
              key={ad.id}
              className="relative bg-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col justify-between"
              data-aos="zoom-in"
            >
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="w-full h-auto object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {ad.title}
              </h3>
              <p className="text-lg font-bold text-gray-600 mt-2 flex justify-between">
                Rs: {ad.price}{" "}
                <span className="line-through text-red-500">
                  {ad.discount}% off
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Testimonials with Carousel */}
      <div className="w-full py-12 px-4" data-aos="fade-right">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          What Our Customers Say
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {testimonials
              .slice(
                testimonialIndex,
                testimonialIndex + testimonialItemsToShow
              )
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
                  data-aos="flip-left"
                >
                  <p className="text-lg italic text-gray-600">
                    "{testimonial.quote}"
                  </p>
                  <p className="mt-4 font-bold text-gray-800">
                    - {testimonial.name}
                  </p>
                </div>
              ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handlePreviousTestimonial}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleNextTestimonial}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
