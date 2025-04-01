import React, { useEffect } from "react";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import { motion, useAnimation } from "framer-motion";

import "swiper/css/effect-cards";
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";
import StickyStackedCards from "../Test";
import first from "../images/1st.png";
import sec from "../images/2nd.png";
import third from "../images/3rd.png";
import four from "../images/4th.png";
import fiv from "../images/5th.png";
import six from "../images/6th.png";
import right from "../images/3.png";
import right1 from "../images/31.png";
import bg from "../images/bg.png";
import a from "./image/a.png";
import b from "./image/b.png";
import c from "./image/c.png";
import d from "./image/d.png";
import e from "./image/e.png";
import { useNavigate } from "react-router-dom";
import Testimonial from "../../component/testimonial/Testimonial";
const Home = () => {
  const location = useLocation();
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const navbar = document.querySelector(".navbar");
            const background = document.querySelector(".background-overlay");
            const rightImage = document.querySelector(".right-image");
            const leftContent = document.querySelector(".left-content");

            setTimeout(() => {
              navbar.classList.add("animate-navbar");
            }, 0);

            setTimeout(() => {
              background.classList.add("animate-background");
            }, 500);

            setTimeout(() => {
              rightImage.classList.add("animate-right-image");
            }, 0);
            setTimeout(() => {
              leftContent.classList.add("animate-left-content");
            }, 0);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } 
    );
    const section = document.querySelector(".animated-section");
    if (section) observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,
      mirror: true,
    });

    const timeout = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [location]);

  const navigate = useNavigate();
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
  ];

  const Card = ({
    name,
    role,
    gradientFrom,
    gradientVia,
    gradientTo,
    nameNavi,
    image,
  }) => {
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

  return (
    <>
      <div className="relative w-full bg-white overflow-x-hidden ">
        {/* Top Navbar */}

        <Navbar />

        {/* Hero Section */}
        <div className="relative flex flex-col lg:flex-row items-center lg:h-screen h-[75vh] bg-white">
          {/* Background Overlay */}
          <div
            className="absolute top-0 left-0 w-full  bg-cover bg-center lg:h-screen h-[70vh]" // Adjust height for small screens
            style={{
              backgroundImage: `url(${bg})`,
              animationName: "background-grow-up",
              animationDuration: "0.8s",
              animationTimingFunction: "ease-out",
              animationFillMode: "forwards",
            }}
          ></div>

          {/* Left Side Content */}
          <div className="left-content relative flex flex-col px-8 sm:px-24 max-w-3xl bg-opacity-40 opacity-0 mx-auto lg:mx-0">
  
  {/* Optional Image Section */}
  <div className="lg:hidden mb-10 flex justify-center">
    {/* Image if needed */}
  </div>

  {/* Heading Section */}
  <div className="relative z-10 opacity-100 mb-10 flex flex-col items-center lg:items-start space-y-6">
    <h1 className="text-5xl xl:text-7xl font-serif text-black leading-tight text-center lg:text-left">INNOVATE</h1>
    
    <div className="flex items-center gap-2 justify-center lg:justify-start">
      <h1 className="text-5xl xl:text-7xl font-serif text-black leading-tight">GR</h1>
      <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-16 xl:h-16 rounded-full border-4 border-green-500 overflow-hidden">
        <img src={right1} alt="O Image" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-5xl xl:text-7xl font-serif text-black leading-tight">W</h1>
    </div>
    
    <h1 className="text-5xl xl:text-7xl font-serif text-black leading-tight text-center lg:text-left">TRANSFORM</h1>
  </div>

  {/* Paragraph Section */}
  <div className="relative z-10 mb-10 flex justify-center lg:justify-start">
    <p className="text-xl text-black font-bankGothic text-center lg:text-left max-w-md">
      WE PRIORITIZE TRUST, TRANSPARENCY, AND INNOVATION, ENSURING RELIABLE SOLUTIONS, CLEAR COMMUNICATION, AND DEDICATED SUPPORT TO HELP YOUR BUSINESS THRIVE SUCCESSFULLY.
    </p>
  </div>

  {/* Button Section */}
  <div className="relative z-10 mb-5 flex justify-center lg:justify-start">
    <button
      className="px-6 py-3 bg-black text-[#12fc2d] font-bankGothic rounded-bl-2xl rounded-tr-2xl hover:bg-green-600 font-poppins"
      onClick={() => navigate(`/contact?name=home`)}
    >
      Get Started
    </button>
  </div>

</div>


           {/* Right Side Image for Larger Screens */}
           <div className="absolute right-0 top-0 w-[40%] lg:w-[45%] h-full items-center justify-end overflow-hidden hidden lg:flex">
  <div className="w-full h-full relative">
    <img
      src={right1}
      alt="Experts Illustration"
      className="w-full h-full object-cover mt-10"
    />
  </div>
</div>
        </div>

        {/* Services Section */}
        <div id="services" className="py-20 bg-white mt-5">
          {/* Section Title */}
          <div className="flex justify-center">
            <div className="text-center bg-[#46FF46] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl">
              <h2 className="text-lg sm:text-xl font-semibold text-black">
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

        {/* Events Section */}
        <div className="flex justify-center flex-col items-center overflow-x-hidden">
          {/* Header Section */}
          <div className="text-center bg-[#46FF46] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl">
            <h2 className="text-3xl font-medium text-black font-montserrat">
              Events
            </h2>
          </div>

          <StickyStackedCards />

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

          {/* About us */}
          <div className="flex justify-center flex-col items-center">
            {/* Header Section */}
            <div className="text-center bg-[#46FF46] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl mt-10">
              <h2 className="text-2xl font-bold text-black font-montserrat">
                ABOUT US
              </h2>
            </div>
          </div>

          <div className="flex justify-center flex-col px-5 sm:px-[10%] items-center">
            <div className="text-center bg-[#E7FFE7] mb-5 py-5 px-5 sm:px-10 inline-block rounded-bl-3xl rounded-tr-3xl mx-auto mt-5 h-auto">
              <p className="text-lg sm:text-2xl text-black font-montserrat text-justify tracking-normal leading-normal">
                At Foxteach, we are passionate about helping brands navigate the
                ever-evolving landscape of social media marketing. Our mission
                is to empower businesses to connect with their audience in
                meaningful ways, driving engagement, growth, and success. With a
                team of experienced social media strategists, content creators,
                and data analysts, we offer a comprehensive suite of services
                tailored to meet your unique needs and objectives.
              </p>

              {/* Know More Button */}
              <div className="mt-5">
                <Link
                  to="/about"
                  className="bg-[#46FF46] hover:bg-[#34CC34] text-black font-semibold px-6 py-2 rounded-full transition duration-300 shadow-md"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>

          {/* WHY FOXTECH */}
          <div className="flex justify-center flex-col items-center">
            {/* Header Section */}
            <div className="text-center bg-[#46FF46] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl  mt-10">
              <h2 className="text-2xl font-bold text-black font-montserrat">
                WHY FOXTEACH
              </h2>
            </div>
          </div>
          <div className="flex justify-center flex-col px-5 sm:px-[10%] items-center">
            <div className="text-center bg-[#E7FFE7] mb-5 py-5 px-5 sm:px-10 inline-block rounded-bl-3xl rounded-tr-3xl mx-auto mt-5 h-auto">
              <p className="text-lg sm:text-2xl text-black font-montserrat text-justify tracking-normal leading-normal">
                Choosing our social marketing company means partnering with a
                team of experienced professionals dedicated to your brand's
                success. Our expertise in social media strategy, content
                creation, and data-driven analytics ensures that every campaign
                is optimized for maximum impact. We use cutting-edge tools and
                technology to provide accurate and comprehensive insights,
                enabling you to make informed decisions. Our commitment to
                customization means that our services are tailored to meet your
                specific business goals and needs, ensuring personalized and
                effective solutions.
              </p>
            </div>
          </div>
        </div>
        <Testimonial />
        <Footer />
      </div>
    </>
  );
};

export default Home;
