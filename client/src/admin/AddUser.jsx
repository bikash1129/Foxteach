import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../component/Sidebar/Sidebar";
import axiosInstance from "../api";
import Loader from "../component/Loader/Loader";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  // 10 digit number error
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Format the value to allow only digits and restrict it to 10 characters
      const formattedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const navigate = useNavigate();
  const fetchDataValid = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/auth/validateToken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.isValid) {
        return;
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during token validation:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchDataValid();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (formData.phone.length <= 9) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      const response = await axiosInstance.post(`/api/auth/register`, formData);
    
      toast.success(response.data.message);
      setFormData({ name: "", email: "", password: "", phone: "" });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <>
      <AdminNav />
      <ToastContainer />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      ) : null}{" "}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-white-800 dark:border-white-700 max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-black mb-8 text-center">
              Add New User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-black-700 dark:text-black mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white-800 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
                  placeholder="Enter user's name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-black-700 dark:text-black mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white-800 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
                  placeholder="Enter user's email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-black-700 dark:text-black mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white-800 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
                  placeholder="Enter a password"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-black-700 dark:text-black mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10} // Restricts input length at the browser level
                  placeholder="Enter 10-digit phone number"
                  className="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white-800 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm px-6 py-3 w-full sm:w-auto shadow-md transition duration-200 ease-in-out"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
