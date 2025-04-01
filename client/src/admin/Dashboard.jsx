import React, { useEffect, useState } from "react";
import AdminNav from "../component/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axiosInstance from "../api";
import Loader from "../component/Loader/Loader";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [admin, isAdmin] = useState(false);
  const [latestEvents, setLatestEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [userList, setUserList] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Get the "admin" value from localStorage and convert it to a boolean
    const adminStatus = localStorage.getItem("admin");
    isAdmin(adminStatus === "true");
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
      if (!response.data.isValid) {
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

  useEffect(() => {
    // API calls to get data
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await axiosInstance.get("/api/auth/get-user");
        const allUsers = userResponse.data;

        // Get the last 5 users
        const lastFiveUsers = allUsers.slice(-3);

        // Update state with the last 5 users and the total count
        setUserList(lastFiveUsers);
        setTotalUsers(allUsers.length);
        // Fetch latest events
        const eventResponse = await axiosInstance.get("/api/event/get-event");
        const allEvents = eventResponse.data;

        // Get the last 5 events
        const lastFiveEvents = allEvents.slice(-3);

        // Update state with the last 5 events and the total count
        setLatestEvents(lastFiveEvents);
        setTotalEvents(allEvents.length);

        // Fetch latest testimonials
        const testimonialResponse = await axiosInstance.get(
          "/api/test/get-event"
        );
        const allTestimonials = testimonialResponse.data;

        // Get the last 5 testimonials
        const lastFiveTestimonials = allTestimonials.slice(-3);

        // Update state with the last 5 testimonials and the total count
        setTestimonials(lastFiveTestimonials);
        setTotalTestimonials(allTestimonials.length);

        const faqResponse = await axiosInstance.get("/api/faq");
        const allFaqs = faqResponse.data;

        // Get the last 5 FAQs
        const lastFiveFaqs = allFaqs.slice(-3);

        // Update state with the last 5 FAQs and the total count
        setFaqs(lastFiveFaqs);
        setTotalFaqs(allFaqs.length);

        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dep

  // Pie Chart Data
  const [pieData, setPieData] = useState({
    labels: ["Get In Touch", "Contact Form"],
    datasets: [
      {
        data: [0, 0], // Initial values (to be updated after fetching data)
        backgroundColor: [], // Empty array for random colors
      },
    ],
  });
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  useEffect(() => {
    // Generate random colors for each section of the chart
    const randomColors = pieData.labels.map(() => getRandomColor());

    // Update the pieData with new random colors
    setPieData((prevState) => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          backgroundColor: randomColors,
        },
      ],
    }));
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance("/api/contact/all");
      // Separate based on the getTouch boolean field
      const getTouchCount = data.data.filter(
        (item) => item.getTouch === true
      ).length;
      const contactFormCount = data.data.filter(
        (item) => item.getTouch === false
      ).length;

      // Generate random colors for each section
      const randomColors = [getRandomColor(), getRandomColor()];

      // Update the pieData state with counts and random colors
      setPieData({
        labels: ["Get In Touch", "Contact Form"],
        datasets: [
          {
            data: [getTouchCount, contactFormCount],
            backgroundColor: randomColors,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("name");
    setUserName(name);
  }, []);
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
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      ) : (
        <div className=" bg-white text-white min-h-screen">
          <AdminNav />

          <div className="p-4 sm:ml-64">
            <div className="p-4 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
              <main className="bg-white grid-area-main overflow-auto mt-0">
                <div className="px-8 py-5">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start sm:px-8">
                    {/* Left Section */}
                    {/* Left Section */}
                    <div className="flex items-center mb-5 sm:mb-0">
                      {/* Circle Icon with the first letter of the user's name */}
                      <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full mr-4">
                        <span className="text-lg font-semibold">
                          {userName ? userName.charAt(0).toUpperCase() : "U"}
                        </span>
                      </div>

                      {/* User Section */}

                      <div className="text-[#2e4a66] sm:pl-4">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-black">
                          Hello, {userName}
                        </h1>
                        <p className="text-sm font-semibold text-black">
                          Welcome to FoxTeach
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Data */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  {/* First Row: Graph on the left and User details on the right */}
                  {admin === false && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 col-span-2">
                      <div className="p-6 rounded-lg col-span-1 bg-gray-200 text-black">
                        <h3 className="text-lg font-semibold mb-4">
                          Dashboard Overview
                        </h3>
                        <div className="flex justify-center">
                          {/* Increased Pie Chart Size and Added Padding */}
                          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[75%] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] p-4">
                            <Pie
                              data={pieData}
                              options={{
                                responsive: true,
                                plugins: {
                                  legend: {
                                    position: "left", // Position the legend on the left side
                                  },
                                  tooltip: {
                                    callbacks: {
                                      // Customize tooltips if needed
                                    },
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {admin === true && (
                    <>
                      {/* Pie Chart Section */}
                      <div className="p-6 rounded-lg bg-gray-200 text-black lg:col-span-1">
                        <h3 className="text-lg font-semibold mb-4">
                          Dashboard Overview
                        </h3>
                        <div className="flex justify-center">
                          {/* Increased Pie Chart Size and Added Padding */}
                          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[75%] h-[350px] p-4">
                            <Pie
                              data={pieData}
                              options={{
                                responsive: true,
                                plugins: {
                                  legend: {
                                    position: "left", // Position the legend on the left side
                                  },
                                  tooltip: {
                                    callbacks: {
                                      // Customize tooltips if needed
                                    },
                                  },
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Latest Users Section */}
                      <div className="bg-black p-4 rounded-lg transition-all duration-500 hover:bg-gray-700 lg:col-span-1">
                        <h3 className="text-xl font-semibold mb-3 text-white text-center sm:text-left">
                          Latest Users
                        </h3>
                        <h3 className="text-xl font-semibold mb-3 text-white text-center sm:text-left">
                          Total - {totalUsers}
                        </h3>

                        <div className="grid grid-cols-1 gap-3">
                          {userList.map((user, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-800 text-white rounded-lg shadow-md border border-gray-600"
                            >
                              <strong className="block truncate">
                                {user.name}
                              </strong>
                              <p className="text-sm break-words">
                                {user.email}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-center">
                          <button
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                            onClick={() => navigate("/user-list")}
                          >
                            See All Users
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* Second Row: Other details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-2">
                  {/* Latest Testimonials */}
                  <div className="bg-gray-200 p-4 rounded-lg transition-all duration-500 hover:bg-[#B1D4E0]">
                    <h3 className="text-xl font-semibold mb-3 text-black">
                      Latest Testimonials
                    </h3>
                    <h3 className="text-xl font-semibold mb-3 text-black">
                      Testimonials - {totalTestimonials}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white shadow-md border border-gray-300 rounded-lg flex items-center space-x-4"
                        >
                          <img
                            src={createImageUrl(
                              testimonial.image.data.data,
                              testimonial.image.contentType
                            )}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover" // Set small size and round shape
                          />
                          <div>
                            <strong className="text-black text-base">
                              {testimonial.name}
                            </strong>
                            <p className="text-sm text-gray-700">
                              {testimonial.review}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                        onClick={() => navigate("/test")}
                      >
                        See All Testimonials
                      </button>
                    </div>
                  </div>

                  <div className="bg-black p-4 rounded-lg transition-all duration-500 hover:bg-gray-700">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Latest Events
                    </h3>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Events - {totalEvents}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {latestEvents.map((event, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-800 text-white shadow-md border border-gray-600 rounded-lg flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4"
                        >
                          <img
                            src={createImageUrl(
                              event.image.data.data,
                              event.image.contentType
                            )}
                            alt={event.name}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover" // Smaller responsive photo size
                          />
                          <div className="text-center md:text-left">
                            <strong className="block text-lg font-semibold">
                              {event.name}
                            </strong>
                            <p className="text-sm">
                              {event.location} -{" "}
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                        onClick={() => navigate("/add-event")}
                      >
                        See All Events
                      </button>
                    </div>
                  </div>

                  {/* Latest Testimonials */}

                  {/* Latest FAQs */}
                  <div
                    className="bg-gray-200 p-4 rounded-lg transition-all duration-500 hover:bg-[#B1D4E0]"
                    onClick={() => navigate("/faq")}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-black">
                      Latest FAQs
                    </h3>
                    <h3 className="text-xl font-semibold mb-3 text-black">
                      FAQs - {totalFaqs}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white shadow-md border border-gray-300 rounded-lg"
                        >
                          <strong className="block text-lg text-black">
                            {faq.headline}
                          </strong>
                          <p className="text-sm text-gray-700">
                            {faq.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                        See All FAQs
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
