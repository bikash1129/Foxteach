import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faBuilding,
  faBars,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const ContactForm = ({ val, location, name, normal }) => {
  // State to track the form width
  const [inputWidth, setInputWidth] = useState(50);
  // Set width to 100% once the form is rendered
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputWidth(100); // Increase the width to 100% after the form has loaded
    }, 500); // Set a small delay for smooth transition (500ms or whatever works best)

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    email: "",
    company: "",
    subject: "",
    related: val,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Ensure `related` field is updated when `val` changes
    setFormData((prevData) => ({
      ...prevData,
      related: val,
      subject: `${location}`, // Set the subject field correctly
    }));
  }, [val]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/contact/add`,
        formData
      );
      if (normal) {
        toast.success("Register Successfully");
      } else {
        toast.success("We will get back to you soon...");
      }
      setFormData({
        email: "",
        phone: "",
        message: "",
        name: "",
        company: "",
        subject: "",
      });
    } catch (error) {
      toast.error("Internal Server Error");
      setResponseMessage("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-white p-4">
        <div className="w-full max-w-4xl bg-[#E7FFE7] p-8 rounded-lg">
          {/* Header */}
          <div className="text-center">
            <div className="inline-block bg-[#46FF46] text-white px-6 py-2 rounded-tr-3xl rounded-bl-3xl shadow-md mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide text-black">
                JOIN US
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex justify-center items-center ">
            <form
              className="space-y-6 w-full sm:w-3/4 md:w-1/2 p-6"
              onSubmit={handleSubmit}
            >
              {/* Name Field */}
              <div>
                <label className="block text-black font-semibold mb-2 capitalize font-sans">
                  Name
                </label>
                <div
                  className="relative flex items-center bg-[#E7FFE7] border border-black rounded transition-all duration-500"
                  style={{ width: `${inputWidth}%` }}
                >
                  <span className="absolute left-3 text-black">
                    <FontAwesomeIcon icon={faBuilding} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-10 p-3 bg-transparent text-black outline-none transition-all duration-500 font-sans"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-black font-semibold mb-2 capitalize font-sans">
                  Email
                </label>
                <div
                  className="relative flex items-center bg-[#E7FFE7] border border-black rounded transition-all duration-500"
                  style={{ width: `${inputWidth}%` }}
                >
                  <span className="absolute left-3 text-black">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 p-3 bg-transparent text-black outline-none transition-all duration-500 font-sans"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-black font-semibold mb-2 capitalize font-sans">
                  Phone
                </label>
                <div
                  className="relative flex items-center bg-[#E7FFE7] border border-black rounded transition-all duration-500"
                  style={{ width: `${inputWidth}%` }}
                >
                  <span className="absolute left-3 text-black">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    className="w-full pl-10 p-3 bg-transparent text-black outline-none transition-all duration-500 font-sans"
                    required
                  />
                </div>
              </div>
              {!normal && (
                <div>
                  <label className="block text-black font-semibold mb-2 capitalize font-sans">
                    Company
                  </label>
                  <div
                    className="relative flex items-center bg-[#E7FFE7] border border-black rounded transition-all duration-500"
                    style={{ width: `${inputWidth}%` }}
                  >
                    <span className="absolute left-3 text-black">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter your Company"
                      className="w-full pl-10 p-3 bg-transparent text-black outline-none transition-all duration-500 font-sans"
                    />
                  </div>
                </div>
              )}

              {/* Subject Field */}
              {!normal && (
                <div>
                  <label className="block text-black font-semibold mb-2 capitalize font-sans">
                    Subject
                  </label>
                  <div
                    className="relative flex items-center bg-[#E7FFE7] border border-black rounded transition-all duration-500"
                    style={{ width: `${inputWidth}%` }}
                  >
                    <span className="absolute left-3 text-black">
                      <FontAwesomeIcon icon={faBars} />
                    </span>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter your subject"
                      className="w-full pl-10 p-3 bg-transparent text-black outline-none transition-all duration-500 font-sans"
                    />
                  </div>
                </div>
              )}

              {/* Message Field */}
              {!normal && (
                <div className="relative">
                  <label className="block text-black font-semibold mb-2 font-sans">
                    Message
                  </label>
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
                    <FontAwesomeIcon icon={faMessage} />
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi! I would like to ask you something..."
                    rows="4"
                    style={{ width: `${inputWidth}%` }}
                    className="p-3 pl-10 bg-[#E7FFE7] text-black border border-black rounded transition-all duration-500 font-sans"
                  ></textarea>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  style={{ width: `${inputWidth}%` }} // Adjust width dynamically
                  className="bg-[#00FF00] hover:bg-green-600 text-black font-semibold py-3 px-8 rounded-full transition-all duration-500 font-sans"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>

              {/* Response Message */}
              {responseMessage && (
                <p className="text-center mt-4 text-lg font-medium text-black">
                  {responseMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
