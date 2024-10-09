import React from "react";
import { FaHandshake, FaRocket, FaHeart, FaSmile } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          About Us
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Welcome to our online store! We are dedicated to providing you with
          the best shopping experience possible, offering a wide range of
          high-quality products tailored to your needs and preferences.
        </p>

        {/* Our Story Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-semibold text-center text-sky-600 mb-6">
            Our Story
          </h3>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Our journey began with a passion for delivering premium products
            directly to our customers' doorsteps. Over the years, we've grown
            into a trusted brand known for quality, variety, and exceptional
            customer service.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
            >
              <FaRocket className="text-5xl text-sky-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-center mb-2">
                Our Mission
              </h4>
              <p className="text-gray-600 text-center">
                To bring you the best shopping experience with high-quality
                products that suit every lifestyle.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <FaHandshake className="text-5xl text-sky-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-center mb-2">
                Our Promise
              </h4>
              <p className="text-gray-600 text-center">
                A commitment to quality, reliability, and building lasting
                relationships with our valued customers.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaHeart className="text-5xl text-sky-600 mb-4 mx-auto" />
              <h4 className="text-xl font-bold text-center mb-2">Our Values</h4>
              <p className="text-gray-600 text-center">
                We believe in transparency, customer satisfaction, and creating
                a positive impact through every product we offer.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-semibold text-center text-sky-600 mb-6">
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Alice", "Bob", "Charlie", "David"].map((name, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                data-aos="zoom-in"
                data-aos-delay={`${index * 100}`}
              >
                <div className="w-24 h-24 bg-sky-100 rounded-full mx-auto mb-4">
                  <img
                    src={`https://via.placeholder.com/150?text=${name}`}
                    alt={`${name}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="text-xl font-semibold">{name}</h4>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-semibold text-center text-sky-600 mb-6">
            What Our Customers Say
          </h3>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            {[
              "Amazing products and great customer service!",
              "Quality is top-notch and delivery was quick.",
              "I'm always impressed by the variety they offer.",
              "Reliable and trustworthy. My go-to online store!",
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <p className="text-gray-600 text-center">{review}</p>
                <div className="flex items-center justify-center mt-4">
                  <FaSmile className="text-sky-600 text-3xl" />
                  <span className="text-gray-600 ml-2">
                    Customer {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-sky-500 to-indigo-500 py-10 px-6 rounded-lg shadow-lg text-white text-center">
          <h3 className="text-3xl font-semibold mb-4">Ready to Shop?</h3>
          <p className="mb-6">
            Discover our wide range of products and find exactly what you need.
            Join our community of satisfied customers today!
          </p>
          <button className="bg-white text-sky-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
