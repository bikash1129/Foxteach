import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import axios from "axios";

const CardSwiper = () => {
  const [slidesData, setSlidesData] = useState([]);

  // Fetch suggestions on component mount
  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/case/get-case`
      );
      setSlidesData(response.data);
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
      const url = URL.createObjectURL(blob);
      return url;
    } catch (error) {
      console.error("Error decoding image:", error);
      return "";
    }
  };

  return (
    <>
      {/* Case Study Section */}
      <div
        className="p-6"
        style={{
          transform: "translateX(-100%)",
          animation: "slideIn 1s forwards",
        }}
      >
        {/* Horizontal scrolling for all screen sizes */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {slidesData.length > 0 &&
            slidesData.map((slide, index) => (
              <div
                key={index}
                className="min-w-[80%] md:min-w-[30%] lg:min-w-[20%] flex-shrink-0 rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src={createImageUrl(
                    slide.image.data.data,
                    slide.image.contentType
                  )}
                  alt={slide.name}
                  className="w-[400px] h-[300px] md:h-[300px] lg:h-[300px] object-cover rounded-t-2xl" // Consistent height for all images across large and medium screens
                />
                <div className="p-4 bg-[#E7FFE7] rounded-b-2xl">
                  <h3 className="font-bold text-md">{slide.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{slide.review}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add keyframes for the slide-in animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </>
  );
};

export default CardSwiper;
