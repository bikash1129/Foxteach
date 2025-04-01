import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper function to create image URL from file data
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

const Arrow = ({ direction }) => (
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

const Testimonial = () => {
  const [testimonials, setTesimonial] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of the slide

  // Fetch testimonial data from the API
  const fetchData = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/test/get-event`
      );
      setTesimonial(data.data);
    } catch (error) {
      console.log("Error fetching testimonials: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Autoplay functionality (Change slide every 3 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide(); // Change slide every 3 seconds
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <section className="py-8">
      <div className="flex justify-center flex-col items-center">
        {/* Header Section */}
        <div className="text-center bg-[#46FF46] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl mt-10">
          <h2 className="text-2xl font-bold text-black font-montserrat">
            Our Client Says
          </h2>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 relative">
        <div className="max-w-screen-md mx-auto bg-[#E7FFE7] p-6 rounded-lg shadow-md">
          {/* Testimonial Content */}
          <figure>
            <svg
              className="h-12 mx-auto mb-3 text-black dark:text-black"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-black dark:text-black">
                "{testimonials[currentIndex]?.review}"
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <img
                className="w-12 h-12 rounded-full"
                src={createImageUrl(
                  testimonials[currentIndex]?.image.data.data,
                  testimonials[currentIndex]?.image.contentType
                )}
                alt={testimonials[currentIndex]?.name}
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-black dark:text-black">
                  {testimonials[currentIndex]?.name}
                </div>
              </div>
            </figcaption>
          </figure>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 z-20">
            <div className="custom-prev" onClick={prevSlide}>
              <Arrow direction="left" />
            </div>
          </div>
          <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 z-20">
            <div className="custom-next" onClick={nextSlide}>
              <Arrow direction="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
