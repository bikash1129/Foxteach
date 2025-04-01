import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api";
import AdminNav from "../component/Sidebar/Sidebar";
import Loader from "../component/Loader/Loader";

const UserTableHead = ({ onSort, sortOrder }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-300 dark:text-black-400">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer flex items-center"
          onClick={onSort}
        >
          Name
          {sortOrder === "asc" ? (
            <FaArrowUp className="ml-2" />
          ) : (
            <FaArrowDown className="ml-2" />
          )}
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Actions
        </th>
      </tr>
    </thead>
  );
};

const UserList = () => {
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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/api/auth/get-user`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/api/auth/delete-user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User Deleted Successfully");
    } catch (error) {
      toast.error("Internal Server Error");
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedUsers = [...users].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setUsers(sortedUsers);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = users.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hashStringToNumber = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 8) - hash);
    }
    return Math.abs(hash);
  };

  // Function to generate a consistent HSL color based on the hash
  const generateFixedColor = (str) => {
    const hash = hashStringToNumber(str);
    const hue = hash % 360;
    const saturation = 70;
    const lightness = 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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
        <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              style={{ border: "2px solid black" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-black-500 dark:text-black-400">
              <UserTableHead onSort={handleSort} sortOrder={sortOrder} />
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-3">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filteredData
                    .slice(indexOfFirstUser, indexOfLastUser)
                    .map((user) => (
                      <tr
                        key={user._id}
                        className="bg-white border-b dark:bg-white-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-3 flex items-center">
                          <div
                            style={{
                              backgroundColor: generateFixedColor(user.name),
                            }}
                            className="w-10 h-10 text-white font-semibold rounded-full flex items-center justify-center"
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="ml-2">{user.name}</span>
                        </td>
                        <td className="px-6 py-3">{user.email}</td>
                        <td className="px-6 py-3">
                          <FaTrash
                            className="h-6 w-6 text-red-500 cursor-pointer"
                            onClick={() => deleteUser(user._id)}
                          />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
