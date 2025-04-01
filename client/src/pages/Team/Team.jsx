import React, { useEffect, useState } from "react";
import ContactFoot from "../../component/ContactFooter/ContactFoot";
import Navbar from "../../component/Navbar/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import Footer from "../../component/Footer/Footer";
import eventBg from "../images/eventbg.png";
import "./team.css";
import Loader from "../../component/Loader/Loader";
import axios from "axios";

const Team = () => {
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
  const [teamMembers, setTeamMembers] = useState([]);
  const [special, setSpecial] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/team`
      );
      // Separate data into 'special' and 'teamMembers' arrays
      const allMembers = response.data;
      const specialMembers = allMembers.filter(
        (member) => member.spec === true
      );
      const normalMembers = allMembers.filter(
        (member) => member.spec === false
      );

      // Update state with filtered arrays
      setSpecial(specialMembers);
      setTeamMembers(normalMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTeamMembers();
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

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-md">
          <Loader />
        </div>
      ) : null}
      <Navbar />
      <div className="bg-white mb-10">
        <div
          className="relative bg-cover bg-center w-full h-72 flex items-center justify-center animate-slide-down"
          style={{ backgroundImage: `url(${eventBg})` }}
        >
          <div className="text-center text-black">
            <h1 className="text-4xl font-bold tracking-wide">Our Team</h1>
            <p className="text-sm text-gray-600 mt-2">Home &gt; Our Team</p>
          </div>
        </div>
        <div className="w-full h-20 bg-[#f0fff0] flex items-center justify-center animate-slide-down"></div>

        {/* Client Reviews */}
        <div className="flex justify-center flex-col items-center">
          <div
            className="text-center  mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl  mt-10 m-1"
            style={{
              background:
                "linear-gradient(to right, #46FF46,rgb(220, 234, 220))",
            }}
          >
            <h2 className="text-2xl font-bold text-black font-montserrat">
              Meet the Visionary Behind Our Success
            </h2>
          </div>
        </div>
        <section className="py-10 px-5">
          {/* Horizontal Scroll for Small Screens */}
          <div className="sm:hidden overflow-x-auto">
            <div className="flex space-x-6">
              {special.map((item, index) => (
                <div
                  className="flex justify-center items-start animate-slide-up"
                  key={index}
                >
                  <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[380px]">
                    <div
                      key={item.id}
                      className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-80 w-72 rounded-2xl hover:duration-700 flex-shrink-0 border border-black"
                    >
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
                      <div className="absolute bg-gray-50 -bottom-8 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                        <p className="text-green-400 font-bold text-sm sm:text-4xl uppercase">
                          {item.name}
                        </p>
                        <p className="text-neutral-800 text-base sm:text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swiper for Large Screens */}
          <div className="hidden sm:block relative">
            {/* Swiper Component */}
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              onInit={(swiper) => {
                document
                  .querySelector(".custom-prev-special")
                  .addEventListener("click", () => swiper.slidePrev());
                document
                  .querySelector(".custom-next-special")
                  .addEventListener("click", () => swiper.slideNext());
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {special.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-start animate-slide-up">
                    <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[380px]">
                      <div
                        key={item.id}
                        className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-80 w-72 rounded-2xl hover:duration-700 flex-shrink-0 border border-black"
                      >
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
                        <div className="absolute bg-green-200 -bottom-10 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                          <span className="text-black font-bold text-xl">
                            {item.name}
                          </span>
                          <p className="text-neutral-800 text-lg">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 z-20 custom-prev-special">
              <Arrow direction="left" />
            </div>
            <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 z-20 custom-next-special">
              <Arrow direction="right" />
            </div>
          </div>
        </section>
        <div className="flex justify-center flex-col items-center">
          <div
            className="text-center  mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl  mt-10 m-1"
            style={{
              background:
                "linear-gradient(to right, #46FF46,rgb(220, 234, 220))",
            }}
          >
            <h2 className="text-2xl font-bold text-black font-montserrat">
              Our Team Member's
            </h2>
          </div>
        </div>
        <section className="py-10 px-5">
          {/* Horizontal Scroll for Small Screens */}
          <div className="sm:hidden overflow-x-auto">
            <div className="flex space-x-6">
              {teamMembers.map((item, index) => (
                <div
                  className="flex justify-center items-start animate-slide-up"
                  key={index}
                >
                  <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[380px]">
                    <div
                      key={item.id}
                      className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-80 w-72 rounded-2xl hover:duration-700 flex-shrink-0 border border-black"
                    >
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
                      <div className="absolute bg-gray-50 -bottom-8 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                      <p className="text-green-400 font-bold text-sm sm:text-4xl uppercase">
                          {item.name}
                        </p>
                        <p className="text-neutral-800 text-base sm:text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Swiper for Large Screens */}
          <div className="hidden sm:block relative">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              onInit={(swiper) => {
                document
                  .querySelector(".custom-prev-team")
                  .addEventListener("click", () => swiper.slidePrev());
                document
                  .querySelector(".custom-next-team")
                  .addEventListener("click", () => swiper.slideNext());
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {teamMembers.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-start animate-slide-up">
                    <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[380px]">
                      <div
                        key={item.id}
                        className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-80 w-72 rounded-2xl hover:duration-700 flex-shrink-0 border border-black"
                      >
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
                        <div className="absolute bg-green-200 -bottom-10 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                          <span className="text-black font-bold text-xl">
                            {item.name}
                          </span>
                          <p className="text-neutral-800 text-lg">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 z-20 custom-prev-team">
              <Arrow1 direction="left" />
            </div>
            <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 z-20 custom-next-team">
              <Arrow1 direction="right" />
            </div>
          </div>
        </section>
      </div>
      <ContactFoot />
      <Footer />
    </div>
  );
};

export default Team;
