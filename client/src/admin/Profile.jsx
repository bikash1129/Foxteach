import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AdminNav from "../component/Sidebar/Sidebar";
import Loader from "../component/Loader/Loader";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
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
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during token validation:", error);
      toast.error("Unable to validate session. Please log in again.");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchDataValid();
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data.");
      });
  }, []);

  const handleEditClick = (field) => {
    if (field === "email") return;
    setFieldToEdit(field);
    setEditValue(user[field] || "");
    setShowModal(true);
  };

  const handleSave = () => {
    if (!editValue.trim()) {
      toast.warn("Value cannot be empty.");
      return;
    }

    setLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_SERVER}/api/auth/updateProfile`,
        { field: fieldToEdit, value: editValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setUser((prevUser) => ({ ...prevUser, [fieldToEdit]: editValue }));
        setShowModal(false);
        toast.success(
          `${
            fieldToEdit.charAt(0).toUpperCase() + fieldToEdit.slice(1)
          } updated successfully.`
        );
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error(`Failed to update ${fieldToEdit}.`);
      })
      .finally(() => setLoading(false));
  };

  const goToDashboard = () => {
    navigate("/admin");
  };

  return (
    <>
      <AdminNav />
      {loading ? (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
    <Loader />
  </div>
) : null}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          <div className="container mx-auto mt-10 max-w-2xl">
            <div className="flex items-center mb-5">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-3xl text-gray-600">
                  {user.name ? user.name[0] : "U"}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="space-y-5">
              {["name", "password", "phone"].map((field) => (
                <div
                  key={field}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow"
                >
                  <div>
                    <strong className="capitalize">{field}:</strong>{" "}
                    {field === "password" ? "*******" : user[field]}
                  </div>

                  <button
                    className={`text-blue-500 ${
                      field === "email" ? "cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleEditClick(field)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg mt-[4rem]">
                  <h4 className="text-lg font-medium mb-4">
                    Edit {fieldToEdit}
                  </h4>
                  <input
                    type={fieldToEdit === "password" ? "password" : "text"}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      className="px-4 py-2 bg-black text-white rounded-md mr-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-black rounded-md bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] "
                      onClick={handleSave}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Go to Dashboard Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={goToDashboard}
                className="px-4 py-2 text-black rounded-md bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] "
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
