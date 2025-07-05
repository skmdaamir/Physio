import React, { useState } from "react";
import doctor1 from "../assets/docs/doctor1.jpg";
import doctor2 from "../assets/docs/doctor3.jpg";
import doctor3 from "../assets/docs/doctor2.jpg";
import physioMain from "../assets/docs/physiotherapy_main.jpg";
import { Helmet } from "react-helmet";

const doctors = [
  {
    name: "Dr. John Smith",
    specialty: "Senior Physiotherapist",
    description:
      "Over 15 years of experience in orthopedic and sports physiotherapy.",
    image: doctor1,
  },
  {
    name: "Dr. Emily Johnson",
    specialty: "Rehabilitation Specialist",
    description: "Expert in post-surgical rehab and pain management therapies.",
    image: doctor2,
  },
  {
    name: "Dr. David Lee",
    specialty: "Sports Injury Specialist",
    description: "Specialized in athletic injuries and performance therapy.",
    image: doctor3,
  },
];

const AboutUs = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="px-4 sm:px-8 md:px-16 py-8 bg-gray-50 text-gray-800">
      <Helmet>
        <title>About Us - Physio Pulse</title>
      </Helmet>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Meet our expert physiotherapy team committed to your recovery.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <img
          src={physioMain}
          alt="Physiotherapy"
          className="rounded-2xl shadow-lg w-full max-w-4xl object-cover"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            onClick={() => setSelectedDoctor(doc)}
          >
            <img src={doc.image} alt={doc.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{doc.name}</h2>
              <p className="text-blue-600 font-medium mb-2">{doc.specialty}</p>
              <p className="text-sm text-gray-600">{doc.description}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setSelectedDoctor(null)}
            >
              &times;
            </button>
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedDoctor.name}</h2>
            <p className="text-blue-600 font-medium mb-2">
              {selectedDoctor.specialty}
            </p>
            <p className="text-gray-700">{selectedDoctor.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
