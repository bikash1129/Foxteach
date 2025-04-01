import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import dashboard from "../../assetss/icons/Dashboard.png";
import contact from "../../assetss/icons/contact-list.png";
import AddUser from "../../assetss/icons/add-user.png";
import user from "../../assetss/icons/user.png";
import logo from "../../pages/images/3.png"; // Path for the logo image
import smallLogo from "../../pages/images/3.png";
import logoout from "../../assetss/icons/logout.png"; // Path for the logo image
import event from "../../assetss/icons/calendar.png"; // Path for the logo image
import test from "../../assetss/icons/faqs.png"; // Path for the logo image
import faq from "../../assetss/icons/review.png"; // Path for the logo image


const AdminNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admin, isAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("name");
    navigate("/login");
  };

  useEffect(() => {
    const adminStatus = localStorage.getItem("admin");
    const name = localStorage.getItem("name");
    setUserName(name);
    isAdmin(adminStatus === "true");
    setLoading(false);
  }, []);
  const firstName = userName ? userName.split(" ")[0] : "User"; // Split the name by space and get the first part


  /// for logo change in small screen:

  const [currentLogo, setCurrentLogo] = useState(logo);

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 768) {
        setCurrentLogo(smallLogo);
      } else {
        setCurrentLogo(logo);
      }
    };
  
    updateLogo();
    window.addEventListener("resize", updateLogo);
  
    return () => {
      window.removeEventListener("resize", updateLogo);
    };
  }, []);
  



  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white  dark:bg-black dark:border-gray-900">
        <div className="px-3 py-3 lg:px-5 lg:pl-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link to="/admin" className="flex items-center ms-2 md:me-24 ">
                <img
                  src={currentLogo}
                  alt="FoxTech Logo"
                  className="w-[80%] h-14 mr-2 "
                />
              </Link>
            </div>
            <div className="flex items-center lg:mr-20 md:mr-40 sm:mr-8">
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                {/* Show the first name */}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="z-50 absolute right-4 top-12 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 lg:mr-20 md:mr-40 sm:mr-8"
                  id="dropdown-user"
                >
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => navigate("/profile")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-black dark:border-gray-700 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={dashboard} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Dashboard </span>
              </NavLink>
            </li>

            {admin && (
              <li>
                <NavLink
                  to="/add-user"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg ${
                      isActive
                        ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src={AddUser} // Replace with the actual image path
                      alt="Profile"
                      className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                    />
                  </div>
                  <span className="ms-3">Add User </span>
                </NavLink>
              </li>
            )}
            {admin && (
              <li>
                <NavLink
                  to="/user-list"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg ${
                      isActive
                        ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src={user} // Replace with the actual image path
                      alt="Profile"
                      className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                    />
                  </div>
                  <span className="ms-3">User List</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/add-event"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={event} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Add Event</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-test"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={faq} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Add Testimonial</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={test} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Add FAQ</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-list"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={contact} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Contact List</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-team"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={user} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Add Team</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-case"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={user} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Add Case Study</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleLogout}
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive
                      ? "bg-[#B1D4E0]-100 dark:bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img
                    src={logoout} // Replace with the actual image path
                    alt="Profile"
                    className="w-6 h-6 rounded-full" // Ensures the image itself is circular
                  />
                </div>
                <span className="ms-3">Log Out</span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AdminNav;
