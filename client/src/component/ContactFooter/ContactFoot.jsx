import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";

const ContactFoot = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
      offset: 50, // Start animation when 50px of the element is visible
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/contact/get-touch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("we will get back you soon....");
        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      } else {
        setLoading(false);
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting the form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      ) : null}
      <div className="contact-foot bg-[#E7FFE7] py-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title and Description */}
          <div className="mb-6 text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
              Get In Touch
            </h3>
            <p className="text-gray-600 text-lg md:text-xl font-semibold">
              Unlock Your Brand’s Potential
            </p>
          </div>

          {/* Form */}
          <form
            className="flex flex-wrap sm:flex-nowrap gap-4 items-center"
            onSubmit={handleSubmit}
          >
            {/* Name Input */}
            <div
              className="relative flex-grow"
              data-aos="zoom-in-up"
              data-aos-delay="100"
            >
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-4 sm:py-3 md:py-4 bg-[#DAD9D9] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7FFE7] text-black relative"
              />
              <span className="absolute top-0 left-4 text-gray-500 text-sm m-1 pt-1">
                Name
              </span>
            </div>

            {/* Email Input */}
            <div
              className="relative flex-grow"
              data-aos="zoom-in-up"
              data-aos-delay="200"
            >
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-4 sm:py-3 md:py-4 bg-[#DAD9D9] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7FFE7] text-black relative"
              />
              <span className="absolute top-0 left-4 text-gray-500 text-sm m-1 pt-1">
                Email
              </span>
            </div>

            {/* Phone Input */}
            <div
              className="relative flex-grow"
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <label className="sr-only" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                className="w-full px-4 py-4 sm:py-3 md:py-4 bg-[#DAD9D9] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7FFE7] text-black relative"
              />
              <span className="absolute top-0 left-4 text-gray-500 text-sm m-1 pt-1">
                Phone
              </span>
            </div>

            {/* Submit Button */}
            <div
              className="w-full sm:w-auto"
              data-aos="zoom-in-up"
              data-aos-delay="400"
            >
              <button
                type="submit"
                className="bg-[#00FF00] hover:bg-green-600 text-black font-semibold py-3 px-8 rounded-full transition duration-300 w-full sm:w-auto"
              >
                Get In Touch
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactFoot;
