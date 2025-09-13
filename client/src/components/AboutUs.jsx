import React, { useState } from "react";
import doctor1 from "../assets/docs/Dr Mohd Shoeb.jpg";
import doctor2 from "../assets/docs/Dr Kamran.jpg";
import doctor3 from "../assets/docs/Dr Mohseneen Akhtar.jpg";
import doctor4 from "../assets/docs/Dr Pratibha Singh.jpg";
import doctor5 from "../assets/docs/Dr Yasmeen Manihar.jpg"
import physioMain from "../assets/images/aboutus.jpg";
import physioVision from "../assets/images/aboutusvision.jpg"
import { Helmet } from "react-helmet";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const doctors = [
  {
name:"Dr. Mohd Shoeb [PT]",
qualification:"(BPT MPT MIAP,CCT,CMOT,CSMT,CVRT,CIASTM)",
specialty:"Specialized in MSK & Sports Injuries",
description:"Over 10+ years of experience in MSK & Sports Injuries",
image:doctor1,
  },
  {
    name: "Dr. Kamran Hameed [PT]",
    qualification:"(BPT MIAP,CSMT,CCT,CDNT,CKTT)",
    specialty: "Orthopedic Physiotherapist Specialized in Rehab",
    description:
      "Over 3+ years of experience in orthopedic physiotherapy.",
    image: doctor2,
  },
  {
    name: "Dr. Mohseneen Akhtar [PT]",
    qualification:"(BPT MPT MIAP)",
    specialty: "Specialised in Musculoskeletal & Orthopaedic Fortis Hospital Mulund",
    description: "Over 3+ years of experience in Musculoskeletal & Orthopaedic INJURIES.",
    image: doctor3,
  },
  {
    name: "Dr. Pratibha Singh [PT]",
    qualification:"(BPT MIAP)",
    specialty: "Neuro and Orthopedic Specialist and Ex.Physio Fortis Hospital Mulund",
    description: "Specialize in Neuro and Orthopedic.",
    image: doctor4,
  },
  {
    name: "Dr. Yasmeen Manihar [PT]",
    qualification:"(BPT)",
    specialty: "Physiotherapist",
    description: "Con Physiotherapist.",
    image: doctor5,
  },
];

const AboutUs = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="pt-24 px-4 sm:px-8 md:px-16 pb-8 bg-gray-50 text-gray-800">
      <Helmet>
        <title>About Us - Physio Pulse</title>
      </Helmet>

      {/* About + Image Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12">
        <div className="w-full md:w-1/2">
          <img
            src={physioMain}
            alt="Physiotherapy"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">About Physio Pulse</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            At Physio Pulse, we are dedicated to revitalizing lives through expert physiotherapy and holistic wellness solutions.
            Our mission is to help individuals recover, strengthen, and thrive—whether they're overcoming injury, managing chronic pain, or enhancing physical performance.
            <br /><br />
            Founded with a passion for movement and healing, Physio Pulse blends evidence-based treatments with personalized care.
            Our team of licensed physiotherapists and health professionals are committed to delivering top-notch care in a supportive and welcoming environment.
            <br /><br />
            We specialize in a range of services including manual therapy, rehabilitation, posture correction, sports physiotherapy, and injury prevention programs.
            Using the latest techniques and technologies, we tailor each treatment plan to your unique needs and goals.
            <br /><br />
            At Physio Pulse, your recovery is our priority—and your wellness is our pulse.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Vision & Mission</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Our mission at <strong>Physio Pulse & Rehab Studio</strong> is to:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              "Provide personalized and evidence-based physiotherapy treatments.",
              "Focus on long-term recovery and sustainable wellness.",
              "Leverage modern techniques and technology for better outcomes.",
              "Create a healing environment with compassion and trust.",
              "Empower patients through education and preventive care.",
              "Collaborate with other healthcare experts for holistic treatment.",
            ].map((point, index) => (
              <li key={index} className="flex items-start gap-2 group hover:text-blue-600 transition-all">
                <span className="text-green-600 mt-1">✨</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src={physioVision}
            alt="Physiotherapy"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Doctor Cards Section */}
<div className="text-center mb-8">
  <p className="text-lg sm:text-xl max-w-2xl mx-auto">
    Meet our expert physiotherapy team committed to your recovery.
  </p>
</div>

<Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={20}
  slidesPerView={1}
  autoplay={{ delay: 2500, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  breakpoints={{
    640: { slidesPerView: 2 }, // 2 slides on tablets
    1024: { slidesPerView: 3 }, // 3 slides on desktops
  }}
  className="pb-10"
>
  {doctors.map((doc, index) => (
    <SwiperSlide key={index}>
      <div
        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
        onClick={() => setSelectedDoctor(doc)}
      >
        <img
          src={doc.image}
          alt={doc.name}
          className="w-full h-48 object-contain"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-1">{doc.name}</h2>
          <p className="text-sm text-gray-500 mb-1">{doc.qualification}</p>
          <p className="text-blue-600 font-medium mb-2">{doc.specialty}</p>
          <p className="text-sm text-gray-600">{doc.description}</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Read More
          </button>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>


      {/* Modal */}
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