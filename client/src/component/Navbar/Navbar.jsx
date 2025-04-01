import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import "swiper/css";
import "swiper/css/effect-cards";
import logo from "../../pages/images/4.png";
import logoSmallScreen from "../../pages/images/3.png";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation(); // Get current route

  // Track window width for responsive logo
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const background = document.querySelector(".background-overlay");
    const rightImage = document.querySelector(".right-image");
    const leftContent = document.querySelector(".left-content");
    const navbar = document.querySelector(".navbar");

    try {
      if (navbar) {
        setTimeout(() => {
          navbar.classList.add("animate-navbar");
        }, 0);
      }

      if (background) {
        setTimeout(() => {
          background.classList.add("animate-background");
        }, 500);
      }

      if (rightImage) {
        setTimeout(() => {
          rightImage.classList.add("animate-right-image");
        }, 2000);
      }

      if (leftContent) {
        setTimeout(() => {
          leftContent.classList.add("animate-left-content");
        }, 3500);
      }
    } catch (error) {
      console.error("Error applying animations:", error);
    }
  }, []);

  const getLinkClass = (path) =>
    location.pathname === path
      ? "px-3 py-1 rounded bg-[#e2f7df] transition"
      : "px-3 py-1 rounded transition hover:bg-[#e2f7df]";

  return (
    <div className="relative w-full bg-white">
      {/* <nav className="navbar flex items-center justify-between px-4 py-4 shadow-md bg-white sticky top-0 z-50"> */}
      <nav className="fixed navbar top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-4 py-4">
        {/* Logo Section */}
        <div>
          <img
            src={windowWidth < 768 ? logoSmallScreen : logo}
            alt="FoxTech Logo"
            className={
              windowWidth < 768 ? "small-screen-logo" : "large-screen-logo"
            }
          />
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        {/* Navbar Links for Larger Screens */}
        <div className="hidden md:flex gap-8 text-lg">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={getLinkClass("/about")}>
            About Us
          </Link>
          <Link to="/service" className={getLinkClass("/service")}>
            Services
          </Link>
          <Link to="/event" className={getLinkClass("/event")}>
            Events
          </Link>
          <Link to="/team" className={getLinkClass("/team")}>
            Our Team
          </Link>

          <Link to="/contact" className={getLinkClass("/contact")}>
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Sidebar for Small Screens */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-48`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex flex-col p-4 space-y-4 text-lg">
          <Link
            to="/"
            className={getLinkClass("/")}
            onClick={() => setIsSidebarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={getLinkClass("/about")}
            onClick={() => setIsSidebarOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/service"
            className={getLinkClass("/service")}
            onClick={() => setIsSidebarOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/event"
            className={getLinkClass("/event")}
            onClick={() => setIsSidebarOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/team"
            className={getLinkClass("/team")}
            onClick={() => setIsSidebarOpen(false)}
          >
            Our Team
          </Link>

          <Link
            to="/contact"
            className={getLinkClass("/contact")}
            onClick={() => setIsSidebarOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
