import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api";
import AdminNav from "../component/Sidebar/Sidebar";
import Loader from "../component/Loader/Loader";

const Event = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, isModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allDeleted, setAllDeleted] = useState(false);

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

  const handleDeleteAll = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must log in to perform this action.");
      navigate("/login");
      return;
    }
    try {
      const response = await axiosInstance.delete(`/api/event/delete-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("All Events have been deleted successfully.");
        setSuggestions([]);
        setAllDeleted(true);
      } else {
        toast.error("Failed to delete all Event.");
      }
    } catch (error) {
      console.error("Error deleting all Event:", error);
      toast.error("An error occurred while deleting all Event.");
    }
  };

  useEffect(() => {
    fetchDataValid();
  }, []);
  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/event/get-event`);
      setSuggestions(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSuggestion = async (id) => {
    const suggestionToDelete = suggestions.find(
      (suggestion) => suggestion._id === id
    );
    if (!suggestionToDelete) {
      console.error("Suggestion not found");
      return;
    }
    try {
      await axiosInstance.delete(`/api/event/delete/${id}`);
      setSuggestions(suggestions.filter((suggestion) => suggestion._id !== id));
      toast.success(
        `${suggestionToDelete.name} has been deleted successfully.`
      );
    } catch (error) {
      console.error("Error deleting suggestion:", error);
      toast.error(`Failed to delete ${suggestionToDelete.name}.`);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    image: null, // Added for image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the category already exists
    const isDuplicate = suggestions.some(
      (suggestion) =>
        suggestion.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("You have already added this category!");
      return;
    }

    setLoading(true);

    try {
      // Create a FormData object to include the image file
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("date", formData.date);
      formPayload.append("location", formData.location);
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const response = await axiosInstance.post(
        `/api/event/add-event`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Event added successfully!");
      fetchSuggestions(); // Fetch the updated suggestions
      isModal(false);
      setFormData({
        name: "",
        date: "",
        location: "",
        image: null,
      });
      setLoading(false);

      // Reset allDeleted state to false as we added new categories
      setAllDeleted(false); // This will allow the button text to update in real-time
    } catch (error) {
      setLoading(false);

      toast.error("Something went wrong");
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [eidtformData, editsetFormData] = useState({
    name: "",
    date: "",
    location: "",
    image: null,
  });

  const openEditModal = (suggestion) => {
    setSelectedSuggestion(suggestion);
    editsetFormData({
      name: suggestion.name,
      date: suggestion.date,
      location: suggestion.location,
    });
    setEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    editsetFormData({
      ...eidtformData,
      [name]: value,
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    setLoading(true);
    formData.append("name", eidtformData.name);
    formData.append("date", eidtformData.date);
    formData.append("location", eidtformData.location);

    if (eidtformData.image) {
      formData.append("image", eidtformData.image);
    }

    try {
      await axiosInstance.put(
        `/api/event/update/${selectedSuggestion._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLoading(false);

      fetchSuggestions();
      setEditModalOpen(false);
    } catch (error) {
      setLoading(false);

      console.error("Error updating suggestion:", error);
    }
  };

  const filteredContacts = suggestions.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSuggestions = filteredContacts.slice(indexOfFirst, indexOfLast);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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

  return (
    <div>
      <ToastContainer />
      <AdminNav />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      ) : null}{" "}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          <div className="flex flex-col sm:flex-row justify-end items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-700 rounded-lg p-2 w-full sm:w-1/3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Add Category Button */}
            <button
              className="px-4 py-2  text-black rounded-md bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] w-full sm:w-auto"
              onClick={() => isModal(true)}
            >
              Add Event
            </button>

            {/* Delete All Categories Button */}
            <button
              onClick={handleDeleteAll}
              disabled={suggestions.length === 0 || allDeleted}
              className={`${
                allDeleted
                  ? "bg-gray-700 cursor-not-allowed"
                  : suggestions.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#000] hover:bg-[#000] focus:ring-blue-500"
              } text-white px-6 py-2 rounded-md focus:outline-none focus:ring-2 w-full sm:w-auto`}
            >
              {allDeleted ? "All Items Deleted" : "Delete All Event"}
            </button>
          </div>
          {/* Table content */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-black-500 dark:text-black-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-300 dark:text-black-400">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSuggestions && currentSuggestions.length > 0 ? (
                  currentSuggestions.map((suggestion) => (
                    <tr
                      key={suggestion._id}
                      className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-200"
                    >
                      <td className="px-6 py-3">{suggestion.name}</td>
                      <td className="px-6 py-3">
                        {new Date(suggestion.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">{suggestion.location}</td>
                      <td className="px-6 py-3">
                        {suggestion.image?.data?.data &&
                        suggestion.image.contentType ? (
                          <img
                            src={createImageUrl(
                              suggestion.image.data.data,
                              suggestion.image.contentType
                            )}
                            alt={suggestion.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex space-x-2">
                          <FaTrash
                            className="h-6 w-6 text-red-500 cursor-pointer"
                            onClick={() => deleteSuggestion(suggestion._id)}
                          />
                          <FaEdit
                            className="h-6 w-6 text-blue-500 cursor-pointer"
                            onClick={() => openEditModal(suggestion)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center px-6 py-3 text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of{" "}
              {Math.ceil(filteredContacts.length / itemsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredContacts.length / itemsPerPage)
              }
              className="px-4 py-2 bg-black text-white rounded-md mr-2"
            >
              Next
            </button>
          </div>

          {/* Add Category Modal */}
          {modal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-bold mb-4">Add Event</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => isModal(false)}
                      className="mr-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded-md"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {editModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                <form onSubmit={handleSubmitEdit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={eidtformData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={eidtformData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={eidtformData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) =>
                        handleInputChange({
                          target: { name: "image", value: e.target.files[0] },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      className="mr-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-600"
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
