import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../api";

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchParams] = useSearchParams();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const token = searchParams.get("token");
    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/auth/reset-password?token=${token}`,
        { password: formData.password }
      );
      setSuccess(response.data.message || "Password reset successfully.");
      navigate("/login");
      setFormData({ password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-white-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="flex items-center mb-6 text-2xl font-semibold text-black-900 dark:text-black">
          FOXTEACH
          </p>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-white-800 dark:border-white-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl dark:text-black">
              Change Password
            </h2>
            {error && (
              <div className="mb-4 text-sm text-red-600">
                <strong>Error:</strong> {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-sm text-green-600">
                <strong>Success:</strong> {success}
              </div>
            )}
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-black-900 dark:text-black"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordReset;
