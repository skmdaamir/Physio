import { useEffect, useState } from "react";
import AppointmentModal from "./AppointmentModal";
import {
  BsPeopleFill,
  BsCardChecklist,
  BsGearFill,
  BsHeartFill,
  BsEmojiSmileFill,
  BsTrophyFill,
} from "react-icons/bs";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "../axiosInstance";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [reviews, setReviews] = useState([]);

  // New data arrays
  const therapists = [
    "Post-COVID Physiotherapy",
    "Chest Physiotherapy",
    "Cryotherapy (Cold Therapy)",
    "Pelvic floor Physical Therapy",
    "Traction Therapy",
    "Soft Tissue Mobilization",
    "Myofascial Release (MFR)",
    "Cupping Therapy",
    "Kinesio Taping / Taping Therapy",
    "Chiropractic Therapy",
    "Dry Needling Therapy",
    "THERMOTHERAPY (Heat Therapy)",
    "Manual Therapy",
    "LASER Therapy",
    "Transcutaneous Electrical Nerve Stimulation (TENS) Therapy",
    "Interferential Therapy (IFT)",
    "Ultrasound Therapy",
  ];

  const services = [
    "Home Care Physiotherapy",
    "Tele-physiotherapy (online)",
    "Therapeutic Massage",
    "Cardiac Rehabilitation",
    "Vestibular Rehabilitation (VR)",
    "Musculoskeletal Physiotherapy",
    "Pre and Post Surgery Rehabilitation",
    "Women's Health Physiotherapy",
    "Sports Physiotherapy",
    "Geriatric Physiotherapy",
    "Pediatric Physiotherapy",
    "Neuro Physiotherapy - Rehab",
    "Chiropractor Treatment",
  ];
  const conditions = [
    { text: "Hip Osteoarthritis", url: "#" },
    { text: "Frozen Shoulder", url: "#" },
    { text: "Cervical Spondylosis", url: "#" },
    { text: "Lumbar Spondylosis", url: "#" },
    { text: "Lateral Collateral Ligament(LCL) Injury", url: "#" },
    { text: "Medial Collateral Ligament (MCL) Injury", url: "#" },
    { text: "Patella Dislocation", url: "#" },
    { text: "Patellar Fracture", url: "#" },
    { text: "Meralgia Paresthetica", url: "#" },
  ];

  const symptoms = [
    { text: "Joint Pain", url: "#" },
    { text: "Neck Pain", url: "#" },
    { text: "Shoulder Pain", url: "#" },
    { text: "Back Pain", url: "#" },
    { text: "Knee pain", url: "#" },
    { text: "Muscle Spasm", url: "#" },
    { text: "Tremors", url: "#" },
    { text: "Joint Cracking", url: "#" },
    { text: "Foot Pain", url: "#" },
    { text: "SPRAINS AND STRAINS", url: "#" },
    { text: "Shortness of Breath", url: "#" },
    { text: "Headache", url: "#" },
    { text: "Numbness and Tingling", url: "#" },
    { text: "Inflammation", url: "#" },
    { text: "Loss of Balance", url: "#" },
    { text: "Muscle Stiffness", url: "#" },
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    setShowModal(true);
    fetchApprovedReviews();
  }, []);

  const fetchApprovedReviews = async () => {
    try {
      const res = await axios.get(`/api/approved-reviews`);
      if (res.data && Array.isArray(res.data)) {
        setReviews(res.data);
      } else {
        console.warn("Unexpected reviews data format:", res.data);
        setReviews([]);
      }
    } catch (error) {
      console.error("Failed to fetch approved reviews:", error);
      setReviews([]);
    }
  };

  const iconColor = darkMode ? "#4caf50" : "#198754";

  return (
    <>
      <AppointmentModal show={showModal} onClose={() => setShowModal(false)} />

      <div className={`min-h-screen w-full ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        {/* Dark Mode Toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleDarkMode}
            className={`text-sm px-4 py-2 rounded-md transition ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Welcome Heading */}
        <div className="px-4 pb-6 max-w-7xl mx-auto">
          <h2
            className={`text-center text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-blue-200" : "text-gray-900"}`}
            data-aos="fade-up"
          >
            Welcome to{" "}
            <span className={darkMode ? "text-cyan-300" : "text-blue-600"}>
              Physio Pulse & Rehabilitation Studio (PPRS)
            </span>
          </h2>
          <p
            className={`text-center text-lg md:text-xl mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            We specialize in advanced physiotherapy services to help you recover
            quickly and live a healthier, pain-free life.
          </p>
        </div>
        {/* Reviews Section */}
        <div className="px-4 max-w-7xl mx-auto">
          <h3
            className={`text-center text-2xl md:text-3xl font-semibold mb-6 ${
              darkMode ? "text-yellow-300" : "text-gray-900"
            }`}
          >
            What Our Clients Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl shadow transition ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                <p className="text-lg italic">"{review.description}"</p>
                <div className="mt-3">
                  <Rating
                    initialRating={review.rating}
                    readonly
                    emptySymbol={
                      <FaRegStar
                        color={darkMode ? "#bbb" : "#ccc"}
                        size={20}
                      />
                    }
                    fullSymbol={
                      <FaStar
                        color={darkMode ? "#ffd700" : "#f5b301"}
                        size={20}
                      />
                    }
                  />
                </div>
                <h4
                  className={`mt-3 font-semibold ${
                    darkMode ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  ~ {review.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
        {/* WHAT WE TREAT */}
        <div className="px-4 max-w-7xl mx-auto mt-10">
          <h3
            className={`text-center text-2xl md:text-3xl font-semibold mb-3 ${
              darkMode ? "text-green-400" : "text-gray-900"
            }`}
          >
            WHAT WE TREAT
          </h3>
          <p className="text-center mb-6 text-base md:text-lg text-gray-500">
            We offer treatments across neuro / ortho / pediatrics / sports related issues using approved procedures in Physiotherapy, Chiropractor, Dry Needling, Kinesiology etc.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ title: "Conditions", list: conditions }, { title: "Symptoms", list: symptoms }].map((section, i) => (
              <div key={i}>
                <div
                  className={`text-center font-semibold py-3 rounded-md shadow ${
                    darkMode ? "bg-white text-gray-900" : "bg-gray-800 text-white"
                  }`}
                >
                  {section.title}
                </div>

                <ul className={`mt-3 max-h-72 overflow-y-auto px-4 py-3 rounded-md shadow ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
                  {section.list.map((item, idx) => (
                    <li
                      key={idx}
                      className={`py-2 px-3 mb-2 rounded-md transition duration-300 cursor-pointer ${
                        darkMode
                          ? "hover:bg-green-600 bg-gray-700"
                          : "hover:bg-gray-200 bg-white"
                      }`}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* OUR OFFERING */}
        <div className="px-4 max-w-7xl mx-auto mt-16">
          <h3
            className={`text-center text-2xl md:text-3xl font-semibold mb-3 ${
              darkMode ? "text-green-400" : "text-gray-900"
            }`}
          >
            OUR OFFERING
          </h3>
          <p className="text-center mb-6 text-base md:text-lg text-gray-500">
            At Physio Pulse & Rehabilitation (PPRS) we follow a holistic physio care approach, combining approved therapeutic modalities for comprehensive healing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{ title: "Therapists Offered", list: therapists }, { title: "Services Offered", list: services }].map((section, i) => (
              <div key={i}>
                <div
                  className={`text-center font-semibold py-3 rounded-md shadow ${
                    darkMode ? "bg-white text-gray-900" : "bg-gray-800 text-white"
                  }`}
                >
                  {section.title}
                </div>

                <ul className={`mt-3 max-h-72 overflow-y-auto px-4 py-3 rounded-md shadow ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
                  {section.list.map((item, idx) => (
                    <li
                      key={idx}
                      className={`py-2 px-3 mb-2 rounded-md transition duration-300 cursor-pointer ${
                        darkMode
                          ? "hover:bg-green-600 bg-gray-700"
                          : "hover:bg-gray-200 bg-white"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* WHY CHOOSE PPRS */}
        <div className="px-4 max-w-7xl mx-auto mt-16 pb-10">
          <h3
            className={`text-center text-2xl md:text-3xl font-semibold mb-6 ${
              darkMode ? "text-green-400" : "text-gray-900"
            }`}
          >
            Why Choose PPRS?
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Highly Qualified and Experienced Team",
                text: "Our physiotherapists are certified professionals with hands-on experience. From sports injuries to posture correction, we combine clinical knowledge with care.",
                icon: <BsPeopleFill size={40} color={iconColor} />,
              },
              {
                title: "Customized Treatment Plans",
                text: "Every body and injury is different. We tailor your treatment based on your condition, lifestyle, and goals for optimal recovery.",
                icon: <BsCardChecklist size={40} color={iconColor} />,
              },
              {
                title: "Advanced Equipment & Techniques",
                text: "We use state-of-the-art equipment and evidence-based practices to ensure faster, safer, and more effective treatments.",
                icon: <BsGearFill size={40} color={iconColor} />,
              },
              {
                title: "Holistic and Preventive Approach",
                text: "We treat the root cause, not just symptoms. Our whole-body approach focuses on prevention, education, and sustainable health.",
                icon: <BsHeartFill size={40} color={iconColor} />,
              },
              {
                title: "Warm, Welcoming Environment",
                text: "Feel respected, heard, and cared for. We maintain a healing-friendly atmosphere from your first visit onward.",
                icon: <BsEmojiSmileFill size={40} color={iconColor} />,
              },
              {
                title: "Proven Results and Happy Clients",
                text: "We're trusted by hundreds. Our results speak through returning clients and referrals from satisfied patients.",
                icon: <BsTrophyFill size={40} color={iconColor} />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl shadow-md border-0 transition-all ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-50 text-gray-900"
                }`}
              >
                <div className="mb-3">{item.icon}</div>
                <h4 className="text-green-500 font-semibold mb-2">
                  {item.title}
                </h4>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
