import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import AppointmentModal from "./AppointmentModal";
import {
  BsPeopleFill,
  BsCardChecklist,
  BsGearFill,
  BsHeartFill,
  BsEmojiSmileFill,
  BsTrophyFill,
} from "react-icons/bs";
import "./HomePage.css";
import Rating from "react-rating";
import axios from '../axiosInstance';
import { FaStar, FaRegStar } from "react-icons/fa";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [reviews, setReviews] = useState([]);
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

  // const reviews = [
  //   { description: "Best physiotherapist", rating: 5, name: "XYZ ABC" },
  //   { description: "Excellent Service", rating: 3.5, name: "Shaikh XYZ" },
  //   { description: "Very Talented Doctors", rating: 4.5, name: "Amir Shaikh" },
  // ];

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

  return (
    <>
      <AppointmentModal show={showModal} onClose={() => setShowModal(false)} />

      <div
        className={`min-vh-100 w-100 ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        {/* Dark Mode Toggle */}
        <div className="d-flex justify-content-end py-3 pe-4">
          <Button
            variant={darkMode ? "light" : "dark"}
            onClick={toggleDarkMode}
            size="sm"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>

        <Container className="pb-5">
          {/* Header */}
          <h2
            className="text-center mb-4 fs-1"
            data-aos="fade-up"
            style={{ color: darkMode ? "#90caf9" : undefined }}
          >
            Welcome to{" "}
            <span className={darkMode ? "text-info" : "text-primary"}>
              Physio Pulse & Rehabilitation Studio (PPRS)
            </span>
          </h2>
          <p
            className={`text-center mb-5 fs-5 ${
              darkMode ? "text-light" : "text-muted"
            }`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            We specialize in advanced physiotherapy services to help you recover
            quickly and live a healthier, pain-free life.
          </p>

          {/* Reviews Carousel */}
          <h3
            className="text-center mb-4 fs-2"
            style={{ color: darkMode ? "#ffd54f" : undefined }}
          >
            What Our Clients Say
          </h3>
          <Row className="justify-content-center">
            <Col xs={12} md={10}>
              <Carousel
                indicators={false}
                controls={true}
                fade={false}
                interval={3000}
                pause="hover"
                variant={darkMode ? "dark" : "light"}
              >
                {Array.from({ length: Math.ceil(reviews.length / 2) }).map(
                  (_, idx) => (
                    <Carousel.Item key={idx}>
                      <Row className="g-4">
                        {[0, 1].map((offset) => {
                          const review = reviews[idx * 2 + offset];
                          return (
                            review && (
                              <Col xs={12} sm={12} md={6} key={offset}>
                                <Card
                                  className={`h-100 p-3 ${
                                    darkMode
                                      ? "bg-secondary text-light"
                                      : "bg-light-subtle"
                                  }`}
                                >
                                  <Card.Body>
                                    <Card.Text className="fs-5 fst-italic mt-2">
                                      "{review.description}"
                                    </Card.Text>
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
                                          color={
                                            darkMode ? "#ffd700" : "#f5b301"
                                          }
                                          size={20}
                                        />
                                      }
                                    />

                                    <Card.Title
                                      className={`mt-3 ${
                                        darkMode ? "text-info" : "text-primary"
                                      }`}
                                    >
                                      ~{review.name}
                                    </Card.Title>
                                  </Card.Body>
                                </Card>
                              </Col>
                            )
                          );
                        })}
                      </Row>
                    </Carousel.Item>
                  )
                )}
              </Carousel>
            </Col>
          </Row>

          {/* WHAT WE TREATE */}
          <h3
            className="text-center mb-3 fs-2"
            style={{
              color: darkMode ? "#4caf50" : "#000000",
              paddingTop: "20px",
            }}
          >
            WHAT WE TREAT
          </h3>
          <p className="text-center mb-3">
            We offer treatments across neuro /ortho / pediatrics /sports related
            issues using approved procedures in Physiotherapy, Chiropractor, Dry
            Needling, Kinesiology etc.
          </p>
          <Row className="gx-4 gy-4 mt-4">
            {[
              // Wrap in a map to simplify and avoid code duplication
              { title: "Conditions", list: conditions },
              { title: "Symptoms", list: symptoms },
            ].map((section, i) => (
              <Col xs={12} sm={12} md={12} lg={6} xl={6} key={i}>
                <Card
                  className={`text-center mb-4 shadow ${
                    darkMode ? "bg-light" : "bg-dark text-light"
                  }`}
                  style={{
                    borderLeft: "5px solid #4caf50",
                    borderRadius: "0.75rem",
                  }}
                >
                  <Card.Body>
                    <Card.Title className="fs-4 text-uppercase">
                      {section.title}
                    </Card.Title>
                  </Card.Body>
                </Card>

                <div
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    padding: "0 1rem",
                    borderRadius: "0.5rem",
                  }}
                  className={`scroll-box mb-4 ${
                    darkMode ? "bg-dark text-light" : "bg-light"
                  }`}
                >
                  <ul className="list-group list-group-flush">
                    {section.list.map((item, idx) => (
                      <li
                        key={idx}
                        className={`list-group-item ${
                          darkMode ? "text-light" : ""
                        }`}
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          marginBottom: "10px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          backgroundColor: darkMode ? "#6c757d" : "transparent", // default background
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode
                            ? "#4caf50"
                            : "#f0f0f0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode
                            ? "#6c757d"
                            : "transparent";
                        }}
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>

          {/* Therapists Offered */}
          <h3
            className="text-center mb-3 fs-2"
            style={{
              color: darkMode ? "#4caf50" : "#000000",
              paddingTop: "20px",
            }}
          >
            OUR OFFERING
          </h3>
          <p className="text-center mb-3">
            At Physio Pulse & Rehabilitation (PPRS) We follow a holistic physio
            care approach, combining approved therapeutic modalities for
            comprehensive healing.
          </p>
          <Row className="gx-4 gy-4 mt-4">
            {[
              // Wrap in a map to simplify and avoid code duplication
              { title: "Therapists Offered", list: therapists },
              { title: "Services Offered", list: services },
            ].map((section, i) => (
              <Col xs={12} sm={12} md={12} lg={6} xl={6} key={i}>
                <Card
                  className={`text-center mb-4 shadow ${
                    darkMode ? "bg-light" : "bg-dark text-light"
                  }`}
                  style={{
                    borderLeft: "5px solid #4caf50",
                    borderRadius: "0.75rem",
                  }}
                >
                  <Card.Body>
                    <Card.Title className="fs-4 text-uppercase">
                      {section.title}
                    </Card.Title>
                  </Card.Body>
                </Card>

                <div
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    padding: "0 1rem",
                    borderRadius: "0.5rem",
                  }}
                  className={`scroll-box mb-4 ${
                    darkMode ? "bg-dark text-light" : "bg-light"
                  }`}
                >
                  <ul className="list-group list-group-flush">
                    {section.list.map((item, idx) => (
                      <li
                        key={idx}
                        className={`list-group-item ${
                          darkMode ? "text-light" : ""
                        }`}
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          marginBottom: "10px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          backgroundColor: darkMode ? "#6c757d" : "transparent", // default background
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode
                            ? "#4caf50"
                            : "#f0f0f0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = darkMode
                            ? "#6c757d"
                            : "transparent";
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>

          {/* Why Choose Us */}
          <h3
            className="text-center mt-5 mb-4 fs-2"
            style={{ color: darkMode ? "#4caf50" : undefined }}
          >
            Why Choose PPRS?
          </h3>
          <Row className="g-4">
            {[
              {
                title: "Highly Qualified and Experienced Team",
                text: "Our physiotherapists are certified professionals with hands-on experience. From sports injuries to posture correction, we combine clinical knowledge with care.",
                icon: <BsPeopleFill size={50} color={iconColor} />,
              },
              {
                title: "Customized Treatment Plans",
                text: "Every body and injury is different. We tailor your treatment based on your condition, lifestyle, and goals for optimal recovery.",
                icon: <BsCardChecklist size={50} color={iconColor} />,
              },
              {
                title: "Advanced Equipment & Techniques",
                text: "We use state-of-the-art equipment and evidence-based practices to ensure faster, safer, and more effective treatments.",
                icon: <BsGearFill size={50} color={iconColor} />,
              },
              {
                title: "Holistic and Preventive Approach",
                text: "We treat the root cause, not just symptoms. Our whole-body approach focuses on prevention, education, and sustainable health.",
                icon: <BsHeartFill size={50} color={iconColor} />,
              },
              {
                title: "Warm, Welcoming Environment",
                text: "Feel respected, heard, and cared for. We maintain a healing-friendly atmosphere from your first visit onward.",
                icon: <BsEmojiSmileFill size={50} color={iconColor} />,
              },
              {
                title: "Proven Results and Happy Clients",
                text: "We're trusted by hundreds. Our results speak through returning clients and referrals from satisfied patients.",
                icon: <BsTrophyFill size={50} color={iconColor} />,
              },
            ].map((item, index) => (
              <Col xs={6} sm={6} md={6} lg={4} xl={4} key={index}>
                <Card
                  className={`h-100 shadow border-0 ${
                    darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                  }`}
                >
                  <Card.Body>
                    <div className="mb-3">{item.icon}</div>
                    <Card.Title className="text-success">
                      {item.title}
                    </Card.Title>
                    <Card.Text
                      className={darkMode ? "text-light" : "text-muted"}
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {item.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
