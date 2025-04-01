import React, { useEffect, useRef } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/swiper-bundle.css";
import "./Web.css";
import ContactFoot from "../../component/ContactFooter/ContactFoot";
import eventBg from "../images/eventbg.png";

const Webdev = () => {
  const solutions = [
    {
      title: "Custom Website Design",
      description:
        "Tailored designs that reflect your brand identity and engage your audience.",
    },
    {
      title: "Responsive Web Development",
      description:
        "Websites that look and perform great on all devices, from desktops to smartphones.",
    },
    {
      title: "E-Commerce",
      description:
        "Robust e-commerce solutions to help you sell products and services online with ease.",
    },
    {
      title: " Content Management System(CMS)",
      description: " Targeted ad campaigns to maximize reach and ROI.",
    },
    {
      title: " SEO Optimization",
      description:
        "SEO-friendly websites to improve your search engine rankings and drive organic traffic. ",
    },
    {
      title: "   Website Maintenance & Support",
      description:
        " Ongoing maintenance and support to keep your website running smoothly. ",
    },
  ];

  const projects = [
    {
      title: "Project A",
      description:
        "Developed a responsive e-commerce platform for a leading retail brand.",
    },
    {
      title: "Project B",
      description:
        "Created a custom website for a tech startup, focusing on sleek design and user experience.",
    },
    {
      title: "Project C",
      description:
        "Built an SEO-optimized blog platform for a content creator.",
    },
  ];

  const Step = ({ title, description, customStyle }) => (
    <div
      className={`w-full md:w-2/3 bg-green-50 p-6 rounded-lg shadow-md ${customStyle}`}
    >
      <h3 className="text-lg md:text-2xl font-semibold text-black-700 font-bankGothic">
        {title}
      </h3>
      <p className="text-gray-700 mt-2 text-md md:text-md leading-relaxed font-bankGothic">
        {description}
      </p>
    </div>
  );

  // Arrow Component
  const Arrow = () => (
    <div className="flex justify-center items-center w-12 h-12 bg-green-50 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="black"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 5v14m7-7l-7 7-7-7"
        />
      </svg>
    </div>
  );

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
      offset: 300,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => AOS.refresh();
  }, []);

  const containerRef = useRef(null);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      <div
        className="relative bg-cover bg-center w-full h-72 flex items-center justify-center"
        style={{ backgroundImage: `url(${eventBg})` }}
        data-aos="slide-right"
      >
        <div className="text-center text-black" data-aos="slide-left">
          <h1 className="text-4xl font-bold tracking-wide">
            Web Development Service
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Services &gt; Web Development Service
          </p>
        </div>
      </div>
      <div className="w-full h-20 bg-[#f0fff0] flex items-center justify-center animate-slide-right"></div>

      <div className="max-w-7xl mx-auto mt-4 animate-slide-right">
        <div className="flex flex-col items-center space-y-10">
          {/* Step Component */}
          <div
            className="w-full sm:w-5/6 md:w-2/3 bg-green-50 p-6 rounded-lg shadow-md"
           
          >
            <div className="text-center text-black uppercase tracking-wide text-xs sm:text-sm md:text-lg lg:text-3xl leading-tight sm:leading-normal md:leading-relaxed">
              <p>Web Development Service</p>
              <p>Build your Digital Presence</p>
            </div>
          </div>

          <div
            className="max-w-5xl mx-auto mt-4 px-4 sm:px-6 md:px-8"
          >
            <p className=" text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-normal md:leading-relaxed break-words overflow-wrap-normal text-justify">
              At Foxteach, we specialize in creating stunning, functional, and
              user-friendly websites that drive engagement and conversions.
              Whether you need a simple landing page or a complex e-commerce
              platform, our team of experienced developers and designers will
              bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <div className="flex justify-center">
            <div className="text-center bg-[#12fc2d] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl">
              <h2 className="text-2xl font-bold text-black font-montserrat">
                Comprehensive Web Development
              </h2>
            </div>
          </div>

          {/* Scrollable Row-wise Layout for Small and Medium Screens */}
          <div className="block md:hidden overflow-x-auto">
            <div className="flex space-x-4 px-4">
              {solutions.map((solution, index) => (
                <div
                key={index}
                className="inline-block bg-[#E7FFE7] shadow-lg rounded-lg p-6 sm:p-8 md:p-10 text-center hover:shadow-2xl transition duration-300 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[75%] mx-auto sm:mx-2 flex flex-col justify-between"
                style={{
                  minHeight: "200px", // Adjust this value for taller boxes
                  minWidth: "250px", // Adjust this value for wider boxes
                }}
              >
                  <h2 className="text-3xl font-medium text-black mb-14 mt-8 text-left">
                    {solution.title}
                  </h2>
                  <p className="text-[20px] font-light text-gray-600 text-left mt-5">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout for Large Screens */}
          <div
            ref={containerRef}
            className="relative hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
          >
            {solutions.map((solution, index) => (
              <div
                key={index}
                className={`solution-card bg-[#E7FFE7] shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition duration-300 h-[400px] max-w-[350px] mx-auto m-5 ${
                  index === 1
                    ? "middle-card"
                    : index === 0
                    ? "left-card"
                    : "right-card"
                }`}
              >
                <h2 className="text-3xl font-medium text-black mb-14 mt-8 text-left">
                  {solution.title}
                </h2>
                <p className="text-[20px] font-light text-gray-600 text-left mt-5">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white-50 p-4 md:p-10 font-sans">
        {/* Header */}
        <div className="flex justify-center">
          <div
            className="text-center bg-[#12fc2d] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl"
            data-aos="zoom-in"
          >
            <h2 className="text-2xl font-bold text-black font-montserrat">
              How We Drive Web Development Success
            </h2>
          </div>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col items-center space-y-10">
          {/* Step Components with Zoom-in Effects */}
          <Step
            title="Consultation"
            description="We start with a detailed consultation to understand your goals, target audience, and design preferences."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />

          <Step
            title="Planning"
            description="We develop a comprehensive plan that includes site architecture, functionality requirements, and project timelines."
            dataAos="zoom-in-right" // Animation for right zoom-in
          />

          <Arrow />

          <Step
            title="Design"
            description="Our designers create visually appealing mockups and prototypes that align with your brand."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />

          <Step
            title="Development"
            description="Our developers bring the designs to life, coding the website to ensure optimal performance and functionality."
            dataAos="zoom-in-right" // Animation for right zoom-in
          />
          <Arrow />

          <Step
            title="Testing"
            description="We conduct thorough testing to identify and fix any issues, ensuring a smooth user experience."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />

          <Step
            title="Launch"
            description="Once approved, we launch your website and provide training on how to manage it."
            dataAos="zoom-in-right" // Animation for right zoom-in
          />
          <Arrow />

          <Step
            title="Maintenance"
            description="We offer ongoing support and maintenance to keep your site up-to-date and secure."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
        </div>
      </div>

      <div className="bg-white-50 p-4 md:p-10 font-sans">
        {/* Header */}
        <div className="flex justify-center">
          <div className="text-center bg-[#12fc2d] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl">
            <h2 className="text-2xl font-bold text-black font-montserrat">
              WHY FOXTEACH
            </h2>
          </div>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col items-center space-y-10">
          {/* Step Component */}
          <Step
            title=" Experienced Team"
            description=" Our team of skilled designers and developers brings years of experience to your project."
          />

          <Step
            title=" Customized Solution"
            description=" We provide tailored web development services to meet your specific needs and objectives."
          />

          <Step
            title=" Quality Assurance"
            description="We prioritize quality and attention to detail in every project, ensuring a polished final product."
          />

          <Step
            title=" Timely Delivery"
            description=" We respect your deadlines and work efficiently to deliver your project on time."
          />

          <Step
            title="   Client-Centric Approach"
            description="We collaborate closely with you throughout the process, ensuring your vision is realized."
          />
        </div>
      </div>

      <div className="flex justify-center text-center">
        <div className="text-center bg-[#12fc2d] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl">
          <h2 className="text-2xl font-bold text-black font-montserrat">
            Ready to Elevate your Social Media
          </h2>
        </div>
      </div>

      {/* Apply animation only to the ContactFoot component 
    <ContactFoot data-aos="fade-up" data-aos-duration="2000" />*/}

      <ContactFoot />

      <Footer />
    </div>
  );
};

export default Webdev;
