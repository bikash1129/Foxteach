import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import "swiper/css";
import "swiper/css/navigation";
import case1 from "./img 1.webp";
import case2 from "./img2.jpg";
import first from "../images/1st.png";
import sec from "../images/2nd.png";
import third from "../images/3rd.png";
import four from "../images/4th.png";
import fiv from "../images/5th.png";
import six from "../images/6th.png";
import eventBg from "../images/eventbg.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "./service.css";
import CardSwiper from "../../component/cardSwiper/CardSwiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import ContactFoot from "../../component/ContactFooter/ContactFoot";
import "swiper/css";
import "swiper/css/navigation";
gsap.registerPlugin(ScrollTrigger);
const Services = () => {
  const cardRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const card = cardRef.current;

    gsap.fromTo(
      card,
      {
        x: "-100%", // Start the card off-screen to the left
        opacity: 0,
      },
      {
        x: "0%", // Animate it to its original position
        opacity: 1,
        duration: 1.5, // Duration of the animation
        ease: "power3.out", // Smooth easing for the animation
        scrollTrigger: {
          trigger: card,
          start: "top 80%", // Start the animation when the top of the card reaches 80% of the viewport
          end: "bottom 20%", // End the animation when the bottom of the card reaches 20% of the viewport
          toggleActions: "play none none none", // Only play the animation once
        },
      }
    );
  }, []);

  const cardReference = useRef(null); // Changed reference name here
  const cards = [
    {
      name: "Content Creation",
      role: "Exceptional Content Creation Captivate, Engage, and Convert Elevate your brand’s voice with our innovative content creation services.",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
      nameNavi: "content",
      image: first,
    },
    {
      name: "Social Media Marketing",
      role: "Harness the power of social media to connect with your audience and drive real results.",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
      nameNavi: "social",
      image: sec,
    },
    {
      name: "Web Development Service",
      role: "At Foxteach, we specialize in creating stunning, functional, and user-friendly websites that drive engagement and conversions. ",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
      nameNavi: "web",
      image: third,
    },
    {
      name: "Application development Services",
      role: "At Foxteach, we specialize in developing custom applications that deliver exceptional user experiences and drive business success.",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
      nameNavi: "application",
      image: four,
    },
    {
      name: "SEO Handling services",
      role: "At foxteach, we specialize in SEO strategies that enhance your websites visibility, drive organic traffic, and improve search engine rankings.",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
      nameNavi: "seo",
      image: fiv,
    },
    {
      name: "Personal Branding Service",
      role: "At Foxteach, we help individuals create powerful personal brands that stand out in a crowded market.",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
      nameNavi: "personal",
      image: six,
    },
    // Add more cards as needed
  ];

  const Card = ({ name, role, nameNavi, image }) => {
    return (
      <div className="group relative  w-80 min-h-[20rem] rounded-2xl overflow-hidden flex flex-col items-center text-center">
        {/* Background Overlay */}
        <div
          className={`absolute inset-0  group-hover:scale-95 transition-all duration-500 rounded-2xl`}
          style={{
            background: "linear-gradient(to right, #46FF46,rgb(220, 234, 220))",
          }}
        ></div>

        {/* Profile Image */}
        <div className="w-28 h-28 bg-white rounded-full border-4 border-gray-200 z-10 mt-6 group-hover:scale-200 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover p-4 slide-animation"
          />
        </div>

        {/* Content */}
        <div className="z-10 mt-4 px-4">
          <span className="text-2xl font-semibold block mb-2">{name}</span>
          <p className="text-sm sm:text-base text-gray-800">{role}</p>
        </div>

        {/* Follow Button */}
        <div className="mt-auto mb-4 z-10">
          <button
            onClick={() => navigate(`/${nameNavi}`)}
            className="bg-green-100 px-4 py-2 text-black rounded-md hover:scale-105 transition-all duration-500 hover:bg-green-700"
          >
            view more
          </button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const card = cardReference.current;

    gsap.fromTo(
      card,
      {
        x: "100%", // Start the card off-screen to the right
        opacity: 0, // Start with the card hidden
      },
      {
        x: "0%", // Animate it to its original position
        opacity: 1, // Fade it in
        duration: 1.5, // Duration of the animation
        ease: "power3.out", // Smooth easing for the animation
        scrollTrigger: {
          trigger: card,
          start: "top 80%", // Start the animation when the top of the card reaches 80% of the viewport
          end: "bottom 20%", // End the animation when the bottom of the card reaches 20% of the viewport
          toggleActions: "play none none none", // Only play the animation once
        },
      }
    );
  }, []);

  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animation for the header (fade in from the left)
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%", // Start animation when the header reaches 80% of the viewport
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for the content (fade in and slide up)
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out",
      once: true,
    });
  }, []);

  const cardData = [
    {
      id: 1,
      title: "ANALYTICS",
      description:
        "Unlock insights into your data and make smarter decisions with intuitive dashboards and metrics.",
      image: case1,
    },
    {
      id: 2,
      title: "REPORTING",
      description:
        "Track performance in real-time and optimize growth with actionable reporting and analytics.",
      image: case2,
    },
  ];
  
  
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
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="w-full bg-white">
        <div
          className="relative bg-cover bg-center w-full h-72 flex items-center justify-center animate-slide-down"
          style={{ backgroundImage: `url(${eventBg})` }}
        >
          <div className="text-center text-black">
            <h1 className="text-4xl font-bold tracking-wide">Services</h1>
            <p className="text-sm text-gray-600 mt-2">Home &gt; Services</p>
          </div>
        </div>
        <div className="w-full h-20 bg-[#f0fff0] flex items-center justify-center animate-slide-down"></div>

        {/* Highlight Section */}
        <div className="flex justify-center items-center mt-10">
          <div
            className="p-6 bg-[#E7FFE7] rounded mx-4 md:mx-6 lg:mx-8 flex flex-col items-center justify-center text-center slide-left-animation"
            style={{
              boxShadow: "0px 8px 6px 2px rgba(169, 169, 169, 0.3)", // Gray color bottom shadow
              maxWidth: "900px", // Set a maximum width
            }}
          >
            <h3 className="text-2xl md:text-2xl lg:text-3xl  leading-tight text-center">
              <span className="text-black lg:text-5xl text-center">
                "Elevate Your Brand with Expert Social Media Solutions"
              </span>
            </h3>
            <p className="text-black mt-2 text-md md:text-lg lg:text-2xl">
              Innovative Strategies Tailored to Your Business Needs
            </p>
          </div>
        </div>
      </div>

      <div id="services" className="py-20 bg-white">
        {/* Section Title */}
        <div className="flex justify-center">
          <div className="inline-block bg-[#46FF46] text-white px-6 py-2 rounded-tr-3xl rounded-bl-3xl shadow-md mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide text-black">
              Our Services
            </h2>
          </div>
        </div>

        {/* Cards Container */}
        <div
          className="container mx-auto px-8 py-8 flex justify-center items-center"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {cards.map((card, index) => (
              <Card
                key={index}
                name={card.name}
                role={card.role}
                gradientFrom={card.gradientFrom}
                gradientVia={card.gradientVia}
                gradientTo={card.gradientTo}
                nameNavi={card.nameNavi}
                image={card.image}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        {/* Header Section */}
        <div className="inline-block bg-[#46FF46] text-white px-6 py-2 rounded-tr-3xl rounded-bl-3xl shadow-md mx-auto">
          <p className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide text-black">
            Analytics And Reporting
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        {/* Cards container for medium and large screens */}
        <div className="hidden sm:grid w-full grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:mx-20 mx-auto justify-center items-center">
          {cardData.map((item, index) => (
            <div
              className="flex justify-center items-start animate-slide-up"
              key={index}
            >
              <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[600px]">
                <div
                  key={item._id}
                  className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-[500px] w-[420px] rounded-2xl hover:duration-700 flex-shrink-0 border border-black"
                >
                  <div className="w-full h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute bg-green-200 -bottom-20
                    w-full p-6 flex flex-col gap-3 group-hover:-bottom-0 group-hover:duration-600 duration-500"
                  >
                    <span className="text-black font-bold text-2xl">
                      {item.title}
                    </span>
                    <p className="text-neutral-800 text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cards for small screens */}
        <div className="flex block sm:hidden overflow-x-auto w-full px-4">
          <div className="flex space-x-6">
            {cardData.map((item, index) => (
              <div
                className="flex justify-center items-start animate-slide-up"
                key={index}
              >
                <div className="group relative flex flex-col items-center cursor-pointer w-full max-w-[300px]">
                  <div
                    key={item.id}
                    className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-[300px] w-[260px] rounded-xl hover:duration-700 flex-shrink-0 border border-black"
                  >
                    <div className="w-full h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute bg-gray-50  -bottom-20
                      w-full p-4 flex flex-col gap-2 group-hover:-bottom-0 group-hover:duration-600 duration-500"
                    >
                      <p className="text-green-400 font-bold text-lg uppercase">
                        {item.title}
                      </p>
                      <p className="text-neutral-800 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white w-full mb-4">
        {/* Analytics and Reporting Section */}

        {/* Case Studies Section */}
        <div className="text-center mt-8">
          <p className="text-sm md:text-lg lg:text-2xl font-bold text-black bg-[#46FF46] inline-block px-6 py-2 rounded-tr-3xl rounded-bl-3xl shadow-md ">
            CASE STUDIES
          </p>
        </div>

        <CardSwiper />

        <div className="my-16">
          {/* How We Provide Services Header */}
          <div className="text-center mt-8">
            <h2
              ref={headerRef}
              className="text-sm md:text-lg lg:text-2xl font-bold bg-[#46FF46] px-6 py-2 rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-none inline-block text-black"
            >
              HOW WE PROVIDE SERVICES
            </h2>
          </div>
        </div>
        {/* Content Section */}
        <div
          ref={contentRef}
          className="p-6 bg-[#E7FFE7] rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-none mx-4 md:mx-8 lg:mx-16 mt-5"
        >
          <p className="text-black text-lg md:text-md leading-relaxed">
            At our social marketing company, we provide comprehensive services
            designed to elevate your brand's online presence and drive
            measurable results. Our process begins with an initial consultation
            to understand your business goals and key performance indicators
            (KPIs). We then craft a tailored social media strategy, leveraging
            market research, audience analysis, and competitor insights. Our
            team of experts creates high-quality content, manages your social
            media accounts, and runs targeted paid advertising campaigns.
            Throughout this process, we collect and analyze performance data,
            providing regular, custom reports that highlight key metrics and
            actionable insights. Our commitment to continuous monitoring and
            strategic adjustments ensures that your social media efforts are
            optimized for maximum engagement, growth, and return on investment.
          </p>
        </div>
      </div>

      <ContactFoot />
      <Footer />
    </div>
  );
};

export default Services;
