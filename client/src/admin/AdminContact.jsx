import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/index";
import AdminNav from "../component/Sidebar/Sidebar";
import Loader from "../component/Loader/Loader";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
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

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/contact/all");
      setContacts(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch contacts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axiosInstance.delete(`/api/contact/delete/${id}`);
      toast.success("Contact deleted successfully");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
      console.error(error);
    }
  };

  const deleteAllContacts = async () => {
    try {
      await axiosInstance.delete(`/api/contact/delete-all`);
      toast.success("All contacts deleted successfully");
      setContacts([]);
    } catch (error) {
      toast.error("Failed to delete all contacts");
      console.error(error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(contacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Separate contacts into two groups: one for getTouch and one for contactForm
  const getInTouchContacts = contacts.filter((contact) => contact.getTouch);
  const contactFormContacts = contacts.filter((contact) => !contact.getTouch);

  // Pagination logic
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = getInTouchContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const pageCount = Math.ceil(getInTouchContacts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [currentContactPage, setCurrentContactPage] = useState(1);
  const contactsPerPage = 4; // Number of contacts per page

  // Calculate total pages
  const totalContactPages = Math.ceil(
    contactFormContacts.length / contactsPerPage
  );

  // Get contacts for the current page
  const startContactIndex = (currentContactPage - 1) * contactsPerPage;
  const paginatedContacts = contactFormContacts.slice(
    startContactIndex,
    startContactIndex + contactsPerPage
  );
  const handleContactPageChange = (pageNumber) => {
    setCurrentContactPage(pageNumber);
  };

  return (
    <div>
      <AdminNav />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      ) : null}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-400 mt-14">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by email..."
                className="border border-gray-700 rounded-lg p-2 w-full sm:w-3/3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 w-full sm:w-auto">
              <button
                className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-md"
                onClick={deleteAllContacts}
              >
                Delete All
              </button>
              <button
                className="w-full sm:w-auto px-4 py-2 text-black rounded-md bg-[#B1D4E0]-100 dark:bg-[#B1D4E0]"
                onClick={exportToExcel}
              >
                Download Excel
              </button>
            </div>
          </div>

          {/* Table for Get In Touch Contacts */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Get in Touch Contacts
            </h3>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : getInTouchContacts.length === 0 ? (
              <p className="text-center">No "Get in Touch" contacts found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-100 dark:bg-gray-300 dark:text-black-400">
                    <tr>
                      <th className="px-4 py-2 sm:px-6 sm:py-3">Name</th>

                      <th className="px-4 py-2 sm:px-6 sm:py-3">Email</th>
                      <th className="px-4 py-2 sm:px-6 sm:py-3">Phone</th>
                      <th className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContacts.map((contact) => (
                      <tr
                        key={contact._id}
                        className="bg-white border-b dark:bg-white-800 dark:border-gray-700"
                      >
                        <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                          {contact.name}
                        </td>
                        <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                          {contact.email}
                        </td>
                        <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                          {contact.phone}
                        </td>
                   

                        <td className="px-4 py-2 sm:px-6 sm:py-4 text-center">
                          <button onClick={() => deleteContact(contact._id)}>
                            <FaTrash className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span className="px-4 py-2">{`${currentPage} / ${pageCount}`}</span>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                disabled={currentPage === pageCount}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>

          {/* Table for Contact Form Contacts */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Contact Form Contacts
            </h3>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : contactFormContacts.length === 0 ? (
              <p className="text-center">No "Contact Form" contacts found.</p>
            ) : (
              <div>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-gray-100 dark:bg-gray-300 dark:text-black-400">
                      <tr>
                        <th className="px-4 py-2 sm:px-6 sm:py-3">Name</th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3">Email</th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3">Phone</th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3">Message</th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3">Subject</th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3">Company</th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3">Related</th>
                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedContacts.map((contact) => (
                        <tr
                          key={contact._id}
                          className="bg-white border-b dark:bg-white-800 dark:border-gray-700"
                        >
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                            {contact.name}
                          </td>
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                            {contact.email}
                          </td>
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                            {contact.phone}
                          </td>
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                            {contact.message}
                          </td>
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                            {contact.subject}
                          </td>
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                            {contact.company}
                          </td>
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-black">
                            {contact.related}
                          </td>
                          <td className="px-4 py-2 sm:px-6 sm:py-4 text-center">
                            <button onClick={() => deleteContact(contact._id)}>
                              <FaTrash className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                  {Array.from({ length: totalContactPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handleContactPageChange(index + 1)}
                      className={`px-3 py-1 mx-1 ${
                        currentContactPage === index + 1
                          ? "bg-black text-white"
                          : "bg-gray-200 text-black"
                      } rounded-md`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
