import { useEffect, useState } from "react";
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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import doctor1 from "../assets/docs/Dr Mohd Shoeb.jpg";
import doctor2 from "../assets/docs/Dr Kamran.jpg";
import doctor3 from "../assets/docs/Dr Mohseneen Akhtar.jpg";
import doctor4 from "../assets/docs/Dr Pratibha Singh.jpg";
import doctor5 from "../assets/docs/Dr Yasmeen Manihar.jpg"
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from "react-router-dom";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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

  const therapists = ["Post-COVID Physiotherapy", "Chest Physiotherapy", "Cryotherapy (Cold Therapy)", "Pelvic floor Physical Therapy", "Traction Therapy", "Soft Tissue Mobilization", "Myofascial Release (MFR)", "Cupping Therapy", "Kinesio Taping / Taping Therapy", "Chiropractic Therapy", "Dry Needling Therapy", "THERMOTHERAPY (Heat Therapy)", "Manual Therapy", "LASER Therapy", "Transcutaneous Electrical Nerve Stimulation (TENS) Therapy", "Interferential Therapy (IFT)", "Ultrasound Therapy"];

  const services = ["Home Care Physiotherapy", "Tele-physiotherapy (online)", "Therapeutic Massage", "Cardiac Rehabilitation", "Vestibular Rehabilitation (VR)", "Musculoskeletal Physiotherapy", "Pre and Post Surgery Rehabilitation", "Women's Health Physiotherapy", "Sports Physiotherapy", "Geriatric Physiotherapy", "Pediatric Physiotherapy", "Neuro Physiotherapy - Rehab", "Chiropractor Treatment"];

  useEffect(() => {
    fetchApprovedReviews();
    fetchConditions();
    fetchSymptoms();
  }, []);

  const fetchApprovedReviews = async () => {
    try {
      const res = await axios.get(`/api/approved-reviews`);
      if (res.data && Array.isArray(res.data)) {
        setReviews(res.data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      setReviews([]);
    }
  };

  const fetchSymptoms = async () => {
    try {
      const res = await axios.get("/api/symptoms");
      setSymptoms(res.data);
    } catch (err) {
      console.error("Error fetching symptoms", err);
    }
  };
  const fetchConditions = async () => {
    try {
      const res = await axios.get("/api/conditions");
      setConditions(res.data);
    } catch (err) {
      console.error("Error fetching conditions", err);
    }
  };
  const iconColor =  "#198754";

  return (
    <>
      
      <div className={`min-h-screen w-full  "bg-white text-gray-900"`}>
        {/* ✨ Centered Paragraph */}
        <p className="text-center text-2xl sm:text-3xl font-bold px-4 mt-4">
  Welcome to <span className="text-indigo-600">Physio Pulse & Rehabilitation</span> – where every step brings you closer to healing, strength, and a healthier tomorrow.
</p>
        {/* ✅ REVIEWS SECTION */}
        <div className="mt-16 px-4 max-w-6xl mx-auto" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600 dark:text-green-400">
            What Our Patients Say
          </h2>

          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">No reviews available.</p>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{ delay: 4000 }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              className="py-6"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <div className={`rounded-lg shadow-md p-4 h-full flex flex-col justify-between "bg-white text-gray-800"`}>
                    <p className="mb-3 text-sm italic">"{review.description}"</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="font-semibold text-sm">{review.name} ({review.place})</p>
                        <Rating
                          initialRating={review.rating}
                          readonly
                          emptySymbol={<FaRegStar className="text-yellow-400 text-sm" />}
                          fullSymbol={<FaStar className="text-yellow-400 text-sm" />}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

<div className="flex flex-col md:flex-row flex-wrap justify-between gap-8 px-4 max-w-7xl mx-auto mt-10">
  {[
    { title: "Conditions", list: Array.isArray(conditions) ? conditions : [], basePath: "/conditions/details" },
    { title: "Symptoms", list: Array.isArray(symptoms) ? symptoms : [], basePath: "" }
  ].map((section, i) => (
    <div key={i} className="flex-1 min-w-[300px]">
      
      {/* Section Title */}
      <div className="text-center font-semibold py-3 rounded-md shadow bg-gray-800 text-white">
        {section.title}
      </div>

      {/* List */}
      <ul className="mt-3 max-h-72 overflow-y-auto px-4 py-3 rounded-md shadow bg-gray-100">
        {section.list.length > 0 ? (
          section.list.map((item) => (
            <Link
              to={section.basePath ? `${section.basePath}/${item.id}` : `/`}
              key={item.id}
            >
              <li
                className="py-3 px-4 mb-3 rounded-lg border border-gray-200 bg-white shadow-sm
                           transition duration-300 cursor-pointer 
                           hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 
                           hover:shadow-md hover:scale-[1.02]"
              >
                {item.name}
              </li>
            </Link>
          ))
        ) : (
          <li className="text-sm italic text-center py-2 text-gray-400">No data available</li>
        )}
      </ul>
    </div>
  ))}
</div>



        {/* OUR OFFERING */}
        <div className="w-full text-center px-4 py-8">
          <h2 className="text-3xl font-bold text-black">OUR OFFERINGS</h2>
          <p className="mt-2 text-base text-gray-700">
            At Physio Pulse and Rehab Studio (PPRS) we use physio care approach providing a combination of therapies for comprehensive healing. Approved modalities are used only.
          </p>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-8 px-4 max-w-7xl mx-auto mt-16">

          {[{ title: "Therapists Offered", list: therapists }, { title: "Services Offered", list: services }].map((section, i) => (
            <div key={i} className="flex-1 min-w-[300px]">
              <div className={`text-center font-semibold py-3 rounded-md shadow bg-gray-800 text-white`}>
                {section.title}
              </div>
              <ul className={`mt-3 max-h-72 overflow-y-auto px-4 py-3 rounded-md shadow bg-gray-100`}>
                {section.list.map((item, idx) => (
                  <li
                    key={idx}
                    className={`py-2 px-3 mb-2 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200 bg-white`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* WHY CHOOSE PPRS */}
        <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 sm:mt-16 pb-10">
          {[{
            title: "Highly Qualified and Experienced Team",
            text: "Our physiotherapists are certified professionals with hands-on experience. From sports injuries to posture correction, we combine clinical knowledge with care.",
            icon: <BsPeopleFill size={40} color={iconColor} />
          }, {
            title: "Customized Treatment Plans",
            text: "Every body and injury is different. We tailor your treatment based on your condition, lifestyle, and goals for optimal recovery.",
            icon: <BsCardChecklist size={40} color={iconColor} />
          }, {
            title: "Advanced Equipment & Techniques",
            text: "We use state-of-the-art equipment and evidence-based practices to ensure faster, safer, and more effective treatments.",
            icon: <BsGearFill size={40} color={iconColor} />
          }, {
            title: "Holistic and Preventive Approach",
            text: "We treat the root cause, not just symptoms. Our whole-body approach focuses on prevention, education, and sustainable health.",
            icon: <BsHeartFill size={40} color={iconColor} />
          }, {
            title: "Warm, Welcoming Environment",
            text: "Feel respected, heard, and cared for. We maintain a healing-friendly atmosphere from your first visit onward.",
            icon: <BsEmojiSmileFill size={40} color={iconColor} />
          }, {
            title: "Proven Results and Happy Clients",
            text: "We're trusted by hundreds. Our results speak through returning clients and referrals from satisfied patients.",
            icon: <BsTrophyFill size={40} color={iconColor} />
          }].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col p-5 rounded-xl shadow-md border-0 transition-all max-w-sm w-full bg-gray-50 text-gray-900`}
              data-aos="fade-up"
              data-aos-delay={index * 1000}
            >
              <div className="mb-3">{item.icon}</div>
              <h4 className="text-green-500 font-semibold mb-2">{item.title}</h4>
              <p className={`text-sm text-gray-600`}>{item.text}</p>
            </div>
          ))}
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
    </>
  );
};

export default HomePage;
