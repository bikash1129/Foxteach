import React from "react";
import { Calendar, MapPin } from "lucide-react";
import case1 from "./image/image1.png";

const EventCard = () => {
  const events = [
    {
      id: 1,
      title: "Indiar Indiar Indian Sneakers festival 2024",
      date: "Thursday, 30 May 2024 at 9:00 pm",
      location: "A DOT by GNH, Gurgaon, Haryana",
      image: "/api/placeholder/600/400",
    },
    {
      id: 2,
      title: "Summer Music Festival 2024",
      date: "Friday, 31 May 2024 at 8:00 pm",
      location: "Club House, Delhi",
      image: "/api/placeholder/600/400",
    },
    {
      id: 3,
      title: "Tech Meetup 2024",
      date: "Saturday, 1 June 2024 at 10:00 am",
      location: "Convention Center, Mumbai",
      image: "/api/placeholder/600/400",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-full mx-auto">
        {/* Use flex to display cards horizontally and wrap them for responsiveness */}
        <div className="flex flex-wrap justify-center gap-8 overflow-x-auto py-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-none w-full sm:w-[300px] md:w-[350px] bg-black rounded-3xl overflow-hidden shadow-xl border border-gray-800"
            >
              {/* Image at the top */}
              <div className="relative aspect-[4/3]">
                <img
                  src={case1}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              </div>

              {/* Event details at the bottom */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">{event.title}</h3>

                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">{event.date}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
