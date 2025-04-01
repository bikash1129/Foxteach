import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../component/Navbar/Navbar";
import eventBg from "../images/eventbg.png";
import Footer from "../../component/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventBanner from "./Eventbanner";
import "swiper/css";
import "swiper/css/navigation";
import a from "./image/a.png";
import b from "./image/b.png";
import c from "./image/c.png";
import d from "./image/d.png";
import e from "./image/e.png";
import { motion, useAnimation } from "framer-motion";

const Events = () => {
  const controls = useAnimation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [cards, setCards] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/event/get-event`
      );
      const lastThreeCards = response.data.slice(-3).map((card) => ({
        ...card,
        formattedDate: new Date(card.date).toLocaleString(), // Format the date field
      }));
      setCards(lastThreeCards);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,
      mirror: true,
    });
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

  const upcomingEventsRef = useRef(null);

  const [cards1, setCards1] = useState([]);

  const fetchSuggestions1 = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/event/get-event`
      );
      const lastThreeCards = response.data.map((card) => ({
        ...card,
        formattedDate: new Date(card.date).toLocaleString(),
      }));


      setCards1(lastThreeCards);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions1();
  }, []);
  // Scroll to the Upcoming Events section
  const scrollToUpcomingEvents = () => {
    upcomingEventsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards1.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [cards1.length]);

  // Get the next three events to display
  const getDisplayedEvents = () => {
    if (cards1.length === 0) return []; // Handle empty data scenario
    return [
      cards1[activeIndex % cards1.length],
      cards1[(activeIndex + 1) % cards1.length],
      cards1[(activeIndex + 2) % cards1.length],
    ];
  };

  const Arrow1 = ({ direction }) => (
    <div className="flex justify-center items-center w-12 h-12 bg-[#E7FFE7] rounded-lg cursor-pointer">
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="black"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="black"
          className="w-10 h-10"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );

  const displayedEvents = getDisplayedEvents();

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <div
        className="relative bg-cover bg-center w-full h-72 flex items-center justify-center animate-slide-right"
        style={{ backgroundImage: `url(${eventBg})` }}
      >
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold tracking-wide">Events</h1>
          <p className="text-sm text-gray-600 mt-2">Home &gt; Events</p>
        </div>
      </div>

      <div className="w-full h-20 bg-[#f0fff0] flex items-center justify-center animate-slide-right"></div>

      {/* Event Cards Section */}
      <div className="hidden lg:flex justify-center items-start mt-12 gap-[30%] animate-slide-up lg:mb-14 md:mb-14">
        {cards1.length > 0 &&
          displayedEvents.map((event, index) => (
            <div
              className={`group relative flex flex-col items-center cursor-pointer ${
                index === 1 ? "scale-110" : ""
              }`}
              key={index}
            >
              {/* Image container (Front card) */}
              <div
                className={`h-[300px] w-[250px] bg-cover bg-center rounded-lg shadow-lg relative transition-transform duration-700 ease-in-out z-10 ${
                  index === 1
                    ? "group-hover:translate-y-[-150px] group-hover:rotate-[20deg] group-hover:-translate-y-16"
                    : "group-hover:translate-y-[-150px] group-hover:rotate-[20deg] group-hover:-translate-y-16"
                }`}
                style={{
                  backgroundImage: `url(${createImageUrl(
                    event.image.data.data,
                    event.image.contentType
                  )})`,
                }}
              >
                {/* Event Name and Time on the Front */}
                <div className="absolute top-4 left-4 text-white">
                  <p className="font-semibold text-xl">{event.name}</p>
                  <p className="text-sm">{event.formattedDate}</p>
                </div>
              </div>

              {/* Card content (Back card) */}
              <div
                className={`absolute inset-0 flex flex-col justify-end text-center shadow-lg rounded-lg mt-4 p-4 h-[345px] w-[250px] opacity-0 transition-opacity duration-500 ${
                  index === 1 ? "opacity-100" : "group-hover:opacity-100"
                }`}
                style={{
                  backgroundColor: "#c4c0c0",
                  visibility: "visible", // Ensure visibility for all cards
                }}
              >
                <p className="text-black font-semibold text-[10px] mb-[25%]">
                  {event.name}
                </p>
                <button
                  className="absolute bottom-2 left-2 px-3 py-2 bg-[#00FF00] text-black rounded-full hover:bg-green-600 transition duration-300"
                  onClick={() =>
                    navigate(
                      `/contact?name=${event.name}&location=${event.location}&normal=yes`
                    )
                  }
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
      </div>

      <motion.div
        className="overflow-hidden w-full flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        {/* Vision and Values Section */}
        <div
          className="text-center rounded-lg px-4 py-2 shadow-md w-full md:w-1/2 lg:w-2/6 mt-14"
          style={{
            background:
              "linear-gradient(to right, #46FF46, rgb(220, 234, 220))",
          }}
          data-aos="fade-up"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
            Our Vision and Values
          </p>
        </div>

        <motion.div
          id="values"
          className="mt-8 text-center w-full md:w-3/4 lg:w-1/2"
        >
          <div className="mt-4 grid gap-6">
            {[
              {
                img: a,
                title: "Innovation",
                text: "We embrace creativity and strive to bring fresh ideas to the table.",
              },
              {
                img: b,
                title: "Integrity",
                text: "We believe in honesty, transparency, and ethical practices in all our endeavors.",
              },
              {
                img: c,
                title: "Excellence",
                text: "We are committed to delivering the highest quality in everything we do.",
              },
              {
                img: d,
                title: "Collaboration",
                text: "We work together with our clients and partners to achieve common goals.",
              },
              {
                img: e,
                title: "Customer",
                text: "Our clients are at the heart of everything we do, and their success is our priority.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center justify-between bg-green-50 p-6 rounded-lg shadow-md ${
                  index % 2 === 0
                    ? "slide-left-animation"
                    : "slide-right-animation"
                }`}
              >
                {/* Left Side: Image and Title */}
                <div className="flex flex-row items-center gap-4 w-full sm:w-1/2">
                  <img
                    src={item.img}
                    alt={`${item.title} Icon`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="font-bold text-lg text-left">
                    {item.title}
                  </div>
                </div>

                {/* Right Side: Paragraph */}
                <div className="mt-4 sm:mt-0 sm:w-1/2 text-left">
                  <p className="text-sm md:text-md text-gray-700">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="w-full flex items-center justify-center my-6 mt-[10%]">
        <hr className="hidden lg:block w-full ml-8 mr-8 mx-auto border-t border-gray-400" />
      </div>

      <div className="hidden lg:flex flex-row gap-4 mb-8 items-center justify-center text-center lg:text-left">
        <button
          className="px-4 py-2 bg-white text-black font-semibold rounded-full border border-black hover:bg-gray-200 transition duration-300 w-full lg:w-auto"
          onClick={scrollToUpcomingEvents}
        >
          Upcoming Events
        </button>

        <p className="inline mx-4 lg:mx-6">OR</p>

        <button
          className="px-4 py-2 bg-white text-black font-semibold rounded-full border border-black hover:bg-gray-200 transition duration-300 w-full lg:w-auto"
          onClick={() => navigate(`/contact?name=eventPageManual`)}
        >
          Join Us
        </button>

        <p className="text-center lg:text-left">AND DISCOVER MORE</p>
      </div>

      <div className="flex justify-center flex-col px-5 sm:px-[10%] items-center">
        <div className="text-center bg-[#E7FFE7] mb-5 py-5 px-5 sm:px-10 inline-block rounded-bl-3xl rounded-tr-3xl mx-auto mt-5 h-auto">
          <p className="text-lg sm:text-2xl text-black font-montserrat text-justify tracking-tight leading-tight whitespace-normal m-0 p-0">
            Explore our upcoming events designed to inspire, educate, and
            connect. From workshops and webinars to industry conferences,
            Foxteach offers a variety of events tailored to help you stay ahead
            in the social media marketing landscape. Join us to gain valuable
            insights, network with industry professionals, and enhance your
            skills.
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center">
        <div
          className="text-center  mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl  mt-10"
          style={{
            background: "linear-gradient(to right, #46FF46,rgb(220, 234, 220))",
          }}
        >
          <h2 className="text-2xl font-bold text-black font-montserrat">
            FEATURED EVENTS
          </h2>
        </div>
      </div>

      <section className="py-10 px-5" id="featured" ref={upcomingEventsRef}>
        {/* Horizontal Scrolling Layout */}
        <div
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cards.map((item, index) => (
            <div
              key={item._id || index}
              className="flex-shrink-0 w-[90%] sm:w-72"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="group relative flex flex-col items-center cursor-pointer">
                {/* Card */}
                <div className="relative overflow-hidden text-gray-50 h-80 w-full rounded-2xl border border-black">
                  <div className="w-full h-full">
                    <img
                      src={createImageUrl(
                        item.image.data.data,
                        item.image.contentType
                      )}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Hover Content */}
                  <div className="absolute bg-[#E7FFE7] -bottom-24 w-full p-3 flex flex-col gap-2 transition-all duration-500 group-hover:bottom-0">
                    <span className="text-black font-bold text-xl">
                      {item.name}
                    </span>
                    <p className="text-neutral-800 text-lg">
                      {item.formattedDate}
                    </p>
                    <p className="text-neutral-800 text-lg">{item.location}</p>
                    <button
                      className="mt-2 px-4 py-2 bg-green-100 text-black font-bold rounded-md hover:bg-green-600"
                      onClick={() =>
                        navigate(
                          `/contact?name=${item.name}&location=${item.location}&normal=yes`
                        )
                      }
                      style={{
                        background:
                          "linear-gradient(to right, #46FF46, rgb(220, 234, 220))",
                      }}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center flex-col items-center">
        <div
          className="text-center mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl mt-10 w-full sm:w-auto"
          style={{
            background: "linear-gradient(to right, #46FF46,rgb(220, 234, 220))",
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black font-montserrat">
            What Do Attendees Say?
          </h2>
        </div>
      </div>

      <div className="flex justify-center flex-col px-4 sm:px-[10%] items-center">
        <div className="text-center bg-[#E7FFE7] mb-5 py-4 sm:py-5 px-4 sm:px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl mx-auto mt-5">
          <p className="text-lg sm:text-2xl text-black font-montserrat text-justify tracking-tight leading-tight whitespace-normal m-0 p-0">
            "The social media mastery workshop was incredibly insightful. I
            learned so much and can't wait to apply these strategies to my
            business!" - Arjun
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-col px-4 sm:px-[10%] items-center">
        <div className="text-center bg-[#E7FFE7] mb-5 py-4 sm:py-5 px-4 sm:px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl mx-auto mt-5">
          <p className="text-lg sm:text-2xl text-black font-montserrat text-justify">
            "Great event with lots of practical tips. The networking
            opportunities were fantastic!" - Sweta
          </p>
        </div>
      </div>

      <EventBanner />

      <Footer />
    </div>
  );
};

export default Events;
