import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventBanner = () => {
  const divRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.6 } // Adjust to control when the animation triggers
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) observer.unobserve(divRef.current);
    };
  }, []);

  const navigate = useNavigate();

  const handleScrollToContact = () => {
    // Navigate to the Contact page with a hash for the contact section
    navigate("/contact#contact");
  };

  return (
    <div className="flex justify-center items-center px-4 w-full mb-5">
      <div
        ref={divRef}
        className={`bg-[#E7FFE7] flex flex-col items-center py-6 px-6 sm:px-12 rounded-3xl shadow-lg transition-all duration-[1s] ease-in-out w-full max-w-[1200px] 
          ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Event Title */}
        <p className="text-2xl sm:text-4xl font-bold text-black text-center mb-4">
          Don't Miss Out on Our Next <br /> EVENT!
        </p>

        {/* Registration Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <p className="text-base sm:text-lg text-black font-medium text-center">
            Register for Upcoming Events
          </p>
          <button
            className="px-6 py-2 bg-[#46FF46] text-black rounded-full shadow-md hover:bg-green-600 transition duration-300"
            onClick={handleScrollToContact}
            >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
