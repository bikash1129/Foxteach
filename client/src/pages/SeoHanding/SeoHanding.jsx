import React, { useEffect, useRef } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/swiper-bundle.css";
import "./seo.css";
import ContactFoot from "../../component/ContactFooter/ContactFoot";
import eventBg from "../images/eventbg.png";

const SeoHandling = () => {
  const solutions = [
    {
      title: "On-Page SEO",
      description: "Optimize website content and structure for search engines.",
    },
    {
      title: "Off-page SEO",
      description: "Build high-quality backlinks and improve domain authority.",
    },
    {
      title: "Technical SEO",
      description:
        "Ensure your site is technically sound and easily crawlable.",
    },
    {
      title: "Local SEO",
      description: " Enhance your visibility in local search results.",
    },
    {
      title: "Keyword Research",
      description: "Identify the best keywords to target for your business.",
    },
    {
      title: "SEO Audits",
      description: "Comprehensive analysis of your current SEO performance. ",
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
    <div>
      <Navbar />

      <div
        className="relative bg-cover bg-center w-full h-72 flex items-center justify-center"
        style={{ backgroundImage: `url(${eventBg})` }}
        data-aos="slide-right"
      >
        <div className="text-center text-black" data-aos="slide-left">
          <h1 className="text-4xl font-bold tracking-wide">SEO Handling</h1>
          <p className="text-sm text-gray-600 mt-2">
            Services &gt; SEO Handling
          </p>
        </div>
      </div>
      <div className="w-full h-20 bg-[#f0fff0] flex items-center justify-center animate-slide-right"></div>

      <div className="max-w-7xl mx-auto mt-4 animate-slide-right">
        <div className="flex flex-col items-center space-y-10">
          {/* Step Component */}
          <div
            className="w-full md:w-2/3 bg-green-50 p-6 rounded-lg shadow-md"
            
          >
            <div className="text-center text-black text-4xl uppercase tracking-wide">
              <p className="text-2xl">
                SEO Handling services drive Organic Traffic & Boost Your Online
                Presence
              </p>
              <p className="text-3xl font-semibold">
                {" "}
                Traffic & Boost Your Online Presence
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-4">
            <p className=" sm:ml-5 md:ml-5 text-center">
              At foxteach, we specialize in SEO strategies that enhance your
              websites visibility, drive organic traffic, and improve search
              engine rankings. Our comprehensive approach ensures your business
              stands out in the competitive digital landscape.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white  mt-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <div className="flex justify-center">
            <div className="text-center bg-[#12fc2d] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl">
              <h2 className="text-2xl font-bold text-black font-montserrat">
                Comprehensive SEO Services
              </h2>
            </div>
          </div>

          {/* Horizontal Scrolling for Small Screens (Below 768px) */}
          <div className="block md:hidden">
            <div className="overflow-x-auto px-4">
              <div className="flex space-x-4">
                {solutions.map((solution, index) => (
                 <div
                 key={index}
                 className="inline-block bg-[#E7FFE7] shadow-lg rounded-lg p-6 sm:p-8 md:p-10 text-center hover:shadow-2xl transition duration-300 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[75%] mx-auto sm:mx-2 flex flex-col justify-between"
                 style={{
                   minHeight: "200px", // Adjust this value for taller boxes
                   minWidth: "250px", // Adjust this value for wider boxes
                 }}
               >
                    <h2 className="text-base sm:text-lg md:text-xl font-medium text-black mb-2 sm:mb-4 md:mb-6 text-left">
                      {solution.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg font-light text-gray-600 text-left mt-2 sm:mt-4 md:mt-6">
                      {solution.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Layout for Medium and Larger Screens (768px and above) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className={`solution-card bg-[#E7FFE7] shadow-lg rounded-lg p-6 sm:p-8 text-center hover:shadow-2xl transition duration-300 h-auto max-w-[350px] mx-auto m-5 ${
                  index === 1
                    ? "middle-card"
                    : index === 0
                    ? "left-card"
                    : "right-card"
                }`}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-black mb-6 md:mb-10 lg:mb-14 mt-4 md:mt-6 lg:mt-8 text-left">
                  {solution.title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl font-light text-gray-600 text-left mt-2 md:mt-4 lg:mt-6">
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
              How We Drive SEO Success
            </h2>
          </div>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col items-center space-y-10">
          {/* Step Components with Zoom-in Effects */}
          <Step
            title="Consultation"
            description="Understand your goals and current SEO status."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />

          <Step
            title="Research"
            description="Conduct thorough keyword and competitor research.."
            dataAos="zoom-in-right" // Animation for right zoom-in
          />

          <Arrow />

          <Step
            title="Strategy "
            description="Develop a customized SEO strategy tailored to your business."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />

          <Step
            title="Implementation"
            description="Implementation"
            dataAos="zoom-in-right" // Animation for right zoom-in
          />
          <Arrow />

          <Step
            title="Monitoring"
            description="Continuously monitor performance and make data-driven adjustments."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />
          <Step
            title="Reporting"
            description="Provide regular reports on SEO progress and results."
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
            title=" Proven Expertise"
            description="Years of experience and successful case studies."
          />

          <Step
            title="Tailored Strategies"
            description=" Customized SEO plans to meet your specific needs."
          />

          <Step
            title="Transparent Reporting"
            description="Clear and detailed reports on your SEO performance."
          />

          <Step
            title=" Ongoing Support"
            description="Continuous monitoring and adjustments to keep your SEO on track."
          />
        </div>
      </div>

      <div className="flex justify-center text-center ">
        <div className="text-center bg-[#12fc2d] mb-5 py-5 px-10 sm:px-14 inline-block rounded-bl-3xl rounded-tr-3xl">
          <h2 className="text-2xl font-bold text-black font-montserrat">
            Ready to Elevate your Social Media
          </h2>
        </div>
      </div>

      <ContactFoot />

      <Footer />
    </div>
  );
};

export default SeoHandling;
