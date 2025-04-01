import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import login12 from "../pages/images/4.png"; // Ensure the path is correct
import smalllogo from "../pages/images/3.png";
import Loader from "../component/Loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({ email: "", password: "" });
  const [emailForReset, setEmailForReset] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/auth/forgot-password`,
        { email: emailForReset },
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);
      if (response.data.success) {
        toast.success("Password reset link sent to your email!");
        setShowModal(false);
      } else {
        toast.error(response.data.message || "Error sending reset link.");
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/auth/login`,
        post,
        config
      );
      setLoading(false);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", response.data.isAdmin);
        localStorage.setItem("name", response.data.user.name);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        toast.error(response.data.message || "Invalid credentials!");
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
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

      <div className="flex flex-col md:flex-row h-screen flex justify-center items-center ">
        {/* Left Section - Image for Larger Screens */}
        <div className="flex-1 flex justify-center items-center hidden sm:block ml-10">
          <img
            className="hidden sm:block w-full max-w-md h-auto object-contain "
            src={login12}
            alt="Logo"
          />
        </div>

        {/* Image for Small Screens */}
        <div className="sm:hidden w-full flex justify-center items-center mt-14">
          <img
            className="w-full max-w-xs h-auto object-contain"
            src={smalllogo}
            alt="Logo"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 flex flex-col justify-start items-center sm:items-start px-6 sm:px-12 md:px-16 py-8 bg-white">
          <div className="w-full max-w-md mt-8 sm:mt-0">
            <form onSubmit={login}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={post.email}
                  onChange={handleInput}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="john.doe@gmail.com"
                  required
                />
              </div>

              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={post.password}
                  onChange={handleInput}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#46FF46] text-black rounded-md hover:bg-[#E7FFE7]"
              >
                Log in
              </button>

              <div className="mt-4 text-right">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-sm text-black hover:underline"
                >
                  Did you forget your password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
              <label
                htmlFor="emailForReset"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email address
              </label>
              <input
                type="email"
                id="emailForReset"
                name="emailForReset"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                className="mt-2 mb-4 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="example@example.com"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#46FF46] text-black rounded hover:bg-[#E7FFE7]"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
