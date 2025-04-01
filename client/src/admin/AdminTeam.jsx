import React, { useState, useEffect } from "react";
import AdminNav from "../component/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../component/Loader/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AdminTeam = () => {
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [spec, setSpec] = useState(false); // Added spec state

  useEffect(() => {
    fetchTeamMembers();
  }, []);

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

  // Fetch all team members
  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/team`
      );
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching team members.");
      setLoading(false);
    }
  };

  const createImageUrl = (fileData, contentType) => {
    try {
      const blob = new Blob([new Uint8Array(fileData)], { type: contentType });
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error) {
      console.error("Error decoding image:", error);
      return "";
    }
  };

  // Handle form submission for creating or updating a member
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("spec", spec); // Added spec to formData
    if (image) {
      formData.append("image", image);
    }

    try {
      if (selectedMember) {
        // Update the member
        await axios.put(
          `${import.meta.env.VITE_SERVER}/api/team/${selectedMember._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Member updated successfully.");
      } else {
        // Create new member
        await axios.post(`${import.meta.env.VITE_SERVER}/api/team`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Member created successfully.");
      }
      fetchTeamMembers(); // Refresh the list
      setModalVisible(false); // Close modal
      setName(""); // Clear form
      setDescription("");
      setSelectedMember(null);
      setImage(null);
      setImagePreview(null);
      setSpec(false); // Reset spec value
    } catch (error) {
      toast.error("Error processing request.");
      setLoading(false);
    }
  };

  // Open modal for editing
  const openEditModal = (member) => {
    setSelectedMember(member);
    setName(member.name);
    setDescription(member.description);
    setImagePreview(member.image || null);
    setSpec(member.spec || false); // Set spec field for editing
    setModalVisible(true);
  };

  // Handle delete request
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/team/${id}`);
      toast.success("Member deleted successfully.");
      fetchTeamMembers(); // Refresh the list
    } catch (error) {
      toast.error("Error deleting member.");
      setLoading(false);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview of the image
    }
  };

  return (
    <div>
      <AdminNav />
      <ToastContainer />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      ) : null}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14 bg-white">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <button
            onClick={() => setModalVisible(true)}
            className="px-4 py-2 bg-black text-white rounded-lg mb-4"
          >
            Add New Member
          </button>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Image</th>
                <th className="px-4 py-2 border-b">Special Person</th>{" "}
                {/* New column */}
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member._id}>
                  <td className="px-4 py-2 border-b">{member.name}</td>
                  <td className="px-4 py-2 border-b">{member.description}</td>
                  <td className="px-4 py-2 border-b">
                    {member.image && (
                      <img
                        src={createImageUrl(
                          member.image.data.data,
                          member.image.contentType
                        )}
                        alt={member.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {member.spec ? "Yes" : "No"} {/* Display spec field */}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => openEditModal(member)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2 flex items-center justify-center"
                    >
                      <FaEdit className="text-red" />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="px-4 py-2 bg-black text-white rounded-lg flex items-center justify-center"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for creating/updating team member */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h3 className="text-xl font-semibold mb-4">Add Member</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={spec}
                  onChange={() => setSpec(!spec)}
                  className="mr-2"
                />
                <span>Special Person</span>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  {selectedMember ? "Update" : "Add"}
                </button>
              </div>
            </form>
            <button
              onClick={() => setModalVisible(false)}
              className="absolute top-0 right-0 m-2 text-white bg-red-500 rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
