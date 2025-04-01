import React, { useState, useEffect } from "react";
import AdminNav from "../component/Sidebar/Sidebar";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../component/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    headline: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/faq`
      );
      setFaqs(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching FAQs:", error.message);
    }
  };

  // Add or Edit FAQ
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (formData.id) {
        // Edit existing FAQ
        await axios.put(
          `${import.meta.env.VITE_SERVER}/api/faq/${formData.id}`,
          {
            headline: formData.headline,
            description: formData.description,
          }
        );
      } else {
        // Add new FAQ
        await axios.post(`${import.meta.env.VITE_SERVER}/api/faq`, {
          headline: formData.headline,
          description: formData.description,
        });
      }
      toast.success("Successfully");
      setLoading(false);
      setFormData({ id: null, headline: "", description: "" });
      setShowForm(false);
      fetchFaqs();
    } catch (error) {
      setLoading(false);
      console.error("Error saving FAQ:", error.message);
    }
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/faq/${id}`);
      toast.success("Delete Successfully");

      fetchFaqs();
    } catch (error) {
      toast.error("Something went wrong");

      console.error("Error deleting FAQ:", error.message);
    }
  };

  // Handle Edit
  const handleEdit = (faq) => {
    setFormData({
      id: faq._id,
      headline: faq.headline,
      description: faq.description,
    });
    setShowForm(true); // Ensure the form opens when editing
  };

  // Search FAQs
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchFaqs();
  }, []);

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
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14 bg-white dark:bg-white">
          {/* Header Section */}
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-2 border border-black rounded dark:bg-white dark:text-white"
          />
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setFormData({ id: null, headline: "", description: "" });
              }}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
            >
              {showForm ? "Close" : "Add FAQ"}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Question"
                  value={formData.headline}
                  onChange={(e) =>
                    setFormData({ ...formData, headline: e.target.value })
                  }
                  required
                  className="p-2 border border-gray-500 rounded dark:bg-white dark:text-black"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="p-2 border border-gray-500 rounded dark:bg-white dark:text-black"
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
              >
                {formData.id ? "Update" : "Add"}
              </button>
            </form>
          )}

          {/* FAQ Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-300 dark:bg-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left">Question</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaqs.map((faq) => (
                  <tr
                    key={faq._id}
                    className="border-t border-gray-300 dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{faq.headline}</td>
                    <td className="px-4 py-2">{faq.description}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(faq)} // Trigger the edit function
                        className="flex items-center px-2 py-1 text-white rounded mr-2"
                      >
                        <FaEdit className="mr-1" color="blue" size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(faq._id)}
                        className="flex items-center px-2 py-1 text-white rounded"
                      >
                        <FaTrash className="mr-1" color="black" size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredFaqs.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No FAQs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
