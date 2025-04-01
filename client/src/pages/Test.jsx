import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./test.css";

const StickyStackedCards = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Index tracking
  const navigate = useNavigate();

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

  const createImageUrl = (fileData, contentType) => {
    try {
      const blob = new Blob([new Uint8Array(fileData)], { type: contentType });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error decoding image:", error);
      return "";
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatic slide change for small screens
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === cards.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [cards]);

  const Arrow1 = ({ direction, onClick }) => (
    <div
      className="flex justify-center items-center w-12 h-12 bg-[#E7FFE7] rounded-lg cursor-pointer"
      onClick={onClick}
    >
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
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [cards.length]);
  const getDisplayedEvents = () => {
    if (cards.length === 0) return []; // Handle empty data scenario
    return [
      cards[activeIndex % cards.length],
      cards[(activeIndex + 1) % cards.length],
      cards[(activeIndex + 2) % cards.length],
    ];
  };
  const displayedEvents = getDisplayedEvents();

  return (
    <div>
      {/* Desktop Layout for Large Screens */}
      <div className="hidden lg:flex justify-center items-start mt-12 gap-[30%] animate-slide-up lg:mb-14 md:mb-14">
        {cards.length > 0 &&
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

      {/* For Medium and Small Screens (Index-Based Scrolling) */}
      <div className="sm:hidden lg:hidden mt-12 mb-40 flex flex-col items-center relative">
        {cards.length > 0 && (
          <div className="w-[250px] h-[300px] bg-cover bg-center rounded-lg shadow-lg relative">
            <div
              className="relative flex flex-col items-center cursor-pointer w-full h-full"
              style={{
                backgroundImage: `url(${createImageUrl(
                  cards[currentIndex]?.image?.data?.data,
                  cards[currentIndex]?.image?.contentType
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute top-4 left-4 text-white z-10">
                <p className="font-semibold text-xl">
                  {cards[currentIndex]?.name}
                </p>
                <p className="text-sm">{cards[currentIndex]?.formattedDate}</p>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end text-center shadow-lg rounded-lg mt-4 p-4 h-full w-full opacity-100 transition-opacity duration-500">
              <button
                className="absolute bottom-2 left-2 px-3 py-2 bg-[#00FF00] text-black rounded-full hover:bg-green-600 transition duration-300"
                onClick={() =>
                  navigate(
                    `/contact?name=${cards[currentIndex]?.name}&location=${cards[currentIndex]?.location}&normal=yes`
                  )
                }
              >
                Register Now
              </button>
            </div>
          </div>
        )}

        {/* Previous and Next Buttons */}
        <div className="absolute top-1/2 left-[-50px] transform -translate-y-1/2 z-20">
          <Arrow1 direction="left" onClick={handlePrev} />
        </div>
        <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 z-20">
          <Arrow1 direction="right" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default StickyStackedCards;
