import React from "react";
import {
  FaPalette,
  FaBrush,
  FaAdjust,
  FaClock,
  FaUserAlt,
  FaShapes,
  FaBorderStyle,
  FaTint,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      title: "Unique and Exclusive Designs",
      description:
        "Each design is a blend of tradition and modernity, crafted with meticulous attention by skilled artisans to ensure you stand out from the crowd.",
      icon: <FaPalette className="text-indigo-500 text-6xl" />,
    },
    {
      title: "Vibrant Colors & Intricate Details",
      description:
        "Our products feature vibrant colors with intricate details, ensuring a stunning visual appeal that leaves a lasting impression.",
      icon: <FaAdjust className="text-green-500 text-6xl" />,
    },
    {
      title: "Smooth, Soft Brushstrokes",
      description:
        "Experience comfort like never before with our smooth brushstrokes and soft textures, making each piece perfect for long-term wear.",
      icon: <FaBrush className="text-blue-500 text-6xl" />,
    },
    {
      title: "Long-lasting Colors",
      description:
        "Crafted to withstand time, our colors are resistant to fading or bleeding, ensuring that your favorite pieces look brand new for years.",
      icon: <FaClock className="text-yellow-500 text-6xl" />,
    },
    {
      title: "Personalized to Your Taste",
      description:
        "We offer personalized designs tailored to your preferences. Choose your favorite motifs, colors, and styles to create something truly unique.",
      icon: <FaUserAlt className="text-purple-500 text-6xl" />,
    },
    {
      title: "Hand-painted Motifs",
      description:
        "Our artisans create beautiful motifs, including florals, geometric patterns, and abstract designs, adding a personal touch to each product.",
      icon: <FaShapes className="text-red-500 text-6xl" />,
    },
    {
      title: "Delicate Borders",
      description:
        "Add a touch of elegance to your outfits with hand-painted borders that highlight the craftsmanship of each piece.",
      icon: <FaBorderStyle className="text-pink-500 text-6xl" />,
    },
    {
      title: "Customizable Colors",
      description:
        "Match any occasion or outfit with customizable color options. Choose from a variety of shades that resonate with your style.",
      icon: <FaTint className="text-teal-500 text-6xl" />,
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-12">
          Discover Our Features
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          Each of our products is designed with passion, attention to detail,
          and a commitment to quality, ensuring you receive a piece that is as
          unique as you are.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {feature.description}
              </p>
              <button className="block mx-auto bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section for a Banner Ad */}
      <div className="mt-16 w-full bg-gradient-to-r from-indigo-600 to-blue-500 py-12 px-6 rounded-lg shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Special Offer: 30% Off on Custom Orders!
            </h2>
            <p className="text-white mt-4">
              Personalize your order today and enjoy a special discount. Limited
              time only!
            </p>
          </div>
          <button className="mt-6 lg:mt-0 bg-white text-indigo-600 px-8 py-4 rounded-full shadow-lg font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Additional Section: Why Choose Us */}
      <div className="mt-20 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              Our commitment to quality ensures that every piece is made with
              the finest materials and expert craftsmanship.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tailored Experience
            </h3>
            <p className="text-gray-600">
              Get a personalized shopping experience with designs tailored to
              your taste and preferences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Fast Shipping
            </h3>
            <p className="text-gray-600">
              Enjoy fast and reliable shipping options, ensuring your orders
              reach you without delays.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Easy Returns
            </h3>
            <p className="text-gray-600">
              Shop with confidence with our hassle-free return policy, making
              your shopping experience worry-free.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Secure Payment
            </h3>
            <p className="text-gray-600">
              We prioritize your safety with secure payment options, keeping
              your information safe.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-gray-600">
              Our dedicated customer support team is here to assist you at any
              time, ensuring a smooth shopping experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
