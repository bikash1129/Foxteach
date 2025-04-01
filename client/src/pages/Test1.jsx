import React from "react";

const Card = ({ name, role, gradientFrom, gradientVia, gradientTo }) => {
  return (
    <div className="group relative bg-slate-50 w-80 h-72 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-bl ${gradientFrom} ${gradientVia} ${gradientTo} group-hover:scale-95 transition-all duration-500 rounded-2xl`}
      ></div>

      {/* Profile Image */}
      <div className="w-28 h-28 bg-blue-700 rounded-full border-4 border-slate-50 z-10 mt-8 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500"></div>

      {/* Content */}
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <span className="text-2xl font-semibold">{name}</span>
        <p>{role}</p>
      </div>

      {/* Follow Button */}
      <a
        href="#"
        className="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
      >
        Follow
      </a>
    </div>
  );
};

const Test1 = () => {
  const cards = [
    {
      name: "George Johnson",
      role: "Support Specialist",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
    },
    {
      name: "Jane Doe",
      role: "Marketing Specialist",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
    },
    {
      name: "Jane Doe",
      role: "Marketing Specialist",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
    },
    {
      name: "Jane Doe",
      role: "Marketing Specialist",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
    },{
      name: "Jane Doe",
      role: "Marketing Specialist",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
    },
    {
      name: "Jane Doe",
      role: "Marketing Specialist",
      gradientFrom: "from-sky-200",
      gradientVia: "via-orange-200",
      gradientTo: "to-orange-700",
    },
    // Add more cards as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            name={card.name}
            role={card.role}
            gradientFrom={card.gradientFrom}
            gradientVia={card.gradientVia}
            gradientTo={card.gradientTo}
          />
        ))}
      </div>
    </div>
  );
};

export default Test1;
