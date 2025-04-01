import React, { useEffect, useRef } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/swiper-bundle.css";
import "./application.css";
import ContactFoot from "../../component/ContactFooter/ContactFoot";
import eventBg from "../images/eventbg.png";

const Application = () => {
  const solutions = [
    {
      title: "Mobile app Development",
      description:
        " We create high-performance mobile apps for iOS and Android platforms, ensuring a seamless user experience across all devices.",
    },
    {
      title: "Web Application Development",
      description:
        " We develop custom software solutions that streamline your business processes and improve operational efficiency. ",
    },
    {
      title: "UI/UX Design",
      description:
        "Our designers craft intuitive and visually appealing interfaces that enhance user satisfaction and engagement. ",
    },
    {
      title: "API Development and Integration",
      description:
        " We design and implement APIs that enable seamless integration with third-party services and systems.",
    },
    {
      title: "Maintenance & Support",
      description:
        "We offer ongoing maintenance and support to ensure your application remains up-to-date and performs optimally. ",
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
          <h1 className="text-4xl font-bold tracking-wide">
            {" "}
            Application Development
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Services &gt; Application Development
          </p>
        </div>
      </div>
      <div className="w-full h-20 bg-[#f0fff0] flex items-center justify-center animate-slide-right"></div>

      <div className="max-w-7xl mx-auto mt-4 animate-slide-right">
        <div className="flex flex-col items-center space-y-10">
          {/* Step Component */}
          <div className="w-full md:w-2/3 bg-green-50 p-6 rounded-lg shadow-md">
            <div className="text-center text-black text-4xl uppercase tracking-wide">
              <p className="text-3xl">Application development Services</p>
              <p className="text-4xl font-semibold">
                {" "}
                Transforming ideas into Powerful Apps
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-4">
            <p className=" sm:ml-5 md:ml-5 text-center">
              At Foxteach, we specialize in developing custom applications that
              deliver exceptional user experiences and drive business success.
              Whether you need a mobile app, a web application, or an enterprise
              software solution, our team of skilled developers and designers is
              here to bring your vision to life.
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
                Comprehensive App Development Solutions
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
              How We Drive App Development Success
            </h2>
          </div>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col items-center space-y-10">
          {/* Step Components with Zoom-in Effects */}
          <Step
            title="Consultation"
            description="We begin with a detailed consultation to understand your goals, target audience, and technical requirements."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />

          <Step
            title="Planning"
            description="We create a comprehensive project plan, including wireframes, technical specifications, and timelines."
            dataAos="zoom-in-right" // Animation for right zoom-in
          />

          <Arrow />

          <Step
            title="Design "
            description="Our UI/UX designers develop prototypes and mockups to visualize the application's interface and user experience."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />

          <Step
            title="Optimization"
            description="Adjusting strategies based on data and feedback."
            dataAos="zoom-in-right" // Animation for right zoom-in
          />
          <Arrow />

          <Step
            title="Development"
            description="Our developers build the application using the latest technologies and best practices to ensure performance and scalability."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />
          <Step
            title="Testing"
            description="We conduct rigorous testing to identify and resolve any issues, ensuring a smooth and reliable application."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />
          <Step
            title="Launch"
            description="We deploy the application to the appropriate platforms and provide training on how to use and manage it."
            dataAos="zoom-in-left" // Animation for left zoom-in
          />
          <Arrow />
          <Step
            title="Maintenance"
            description="We offer ongoing support and maintenance to keep your application running smoothly and efficiently."
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
            description=" We tailor our strategies to meet your specific needs."
          />

          <Step
            title="Engagement"
            description="Proven track record of increasing engagement and followers."
          />

          <Step
            title=" Analytics"
            description=" Data-driven approach to measure and optimize performance."
          />

          <Step
            title="Results"
            description=" Our campaigns drive real, measurable results for your business."
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

export default Application;
