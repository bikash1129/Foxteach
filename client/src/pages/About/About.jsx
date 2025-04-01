import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Navbar from "../../component/Navbar/Navbar";
import ContactFoot from "../../component/ContactFooter/ContactFoot";
import Footer from "../../component/Footer/Footer";
import eventBg from "../images/eventbg.png";
import "./about.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import a from "./image/a.png";
import b from "./image/b.png";
import c from "./image/c.png";
import d from "./image/d.png";
import e from "./image/e.png";
const About = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const controls = useAnimation();
  const [teamMembers, setTeamMembers] = useState([]);
  const [special, setSpecial] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
  useEffect(() => {
    const handleScroll = () => {
      const missionElement = document.getElementById("mission");
      const valuesElement = document.getElementById("values");

      if (missionElement && valuesElement) {
        const missionRect = missionElement.getBoundingClientRect();
        const valuesRect = valuesElement.getBoundingClientRect();

        if (missionRect.top < window.innerHeight) {
          controls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeOut", delay: 0.2 },
          });
        }

        if (valuesRect.top < window.innerHeight) {
          controls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeOut", delay: 0.4 },
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);
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
  return (
    <>
      <Navbar />
      <div
        className="relative bg-cover bg-center w-full h-72 flex items-center justify-center"
        style={{ backgroundImage: `url(${eventBg})` }}
        data-aos="slide-right"
      >
        <div className="text-center text-black" data-aos="slide-left">
          <h1 className="text-4xl font-bold tracking-wide">About Us</h1>
          <p className="text-sm text-gray-600 mt-2">Home &gt; About Us</p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white min-h-screen p-4">
        {/* Simulate Box Effect */}
        <motion.div
          className="overflow-hidden w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
        >
          {/* Header Section */}
          <div className="bg-[#E7FFE7] text-center rounded-lg px-6 py-4 shadow-md w-full md:w-3/4 lg:w-1/2 slide-right-animation">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
              We are your Partner in Social Marketing Success
            </h1>
          </div>

          <div className="mt-8 bg-white text-center  px-6 py-4  w-full md:w-3/4 lg:w-1/2 slide-left-animation">
            <p className="text-lg md:text-lg text-gray-700 leading-relaxed">
              At Foxteach, we are dedicated to delivering top-notch
              (industry-specific) solutions that help our clients achieve their
              goals. Our team of passionate professionals works tirelessly to
              innovate, inspire, and deliver exceptional results. Learn more
              about our journey, values, and the people behind our success.
            </p>
          </div>

          <div
            className="text-center rounded-lg px-4 py-2 shadow-md w-full md:w-1/2 lg:w-1/6 mt-8"
            style={{
              background:
                "linear-gradient(to right, #46FF46, rgb(220, 234, 220))",
            }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
              Our Mission
            </p>
          </div>

          <div
            id="mission"
            className="mt-8 bg-[#E7FFE7] text-center  px-6 py-4  w-full md:w-3/4 lg:w-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={controls}
            data-aos="fade-up"
          >
            <p className="text-md md:text-lg text-gray-700 leading-relaxed">
              To empower businesses and individuals with innovative, customized
              solutions that drive growth, enhance visibility, and foster
              success in the digital landscape.
            </p>
          </div>

          {/* Vision and Values Section */}
          <div
            className="text-center rounded-lg px-4 py-2 shadow-md w-full md:w-1/2 lg:w-2/6 mt-8"
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
        <div
          className="text-center rounded-lg px-4 py-2 shadow-md w-full md:w-1/2 lg:w-2/6 mt-8"
          style={{
            background:
              "linear-gradient(to right, #46FF46, rgb(220, 234, 220))",
          }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
            Meet Our Team
          </p>
        </div>
      </div>

      {/** ###########################################################################################*/}

      <section className="py-10 px-5">
        {/* Horizontal Scroll for Small Screens */}
        <div className="sm:hidden overflow-x-auto">
          <div className="flex space-x-6">
            {special.map((item, index) => (
              <>
                <div
                  className="flex justify-center items-start animate-slide-up"
                  key={index}
                >
                  <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[380px]">
                    <div
                      key={item.id}
                      className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-80 w-72 rounded-2xl hover:duration-700 flex-shrink-0  border border-black"
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
                      <div className="absolute bg-gray-50 -bottom-7 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
                        <span className="text-black font-bold text-lg uppercase">
                          {item.name}
                        </span>

                        <p className="text-neutral-800 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
              // Attach event listeners for custom buttons
              document
                .querySelector(".custom-prev")
                .addEventListener("click", () => swiper.slidePrev());
              document
                .querySelector(".custom-next")
                .addEventListener("click", () => swiper.slideNext());
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {special.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-start animate-slide-up ">
                  <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[380px] ">
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
                          alt={item.title}
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
          <div className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 z-20">
            <div className="custom-prev">
              <Arrow direction="left" />
            </div>
          </div>
          <div className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 z-20">
            <div className="custom-next">
              <Arrow direction="right" />
            </div>
          </div>
        </div>
      </section>

      <ContactFoot />
      <Footer />
    </>
  );
};

export default About;
