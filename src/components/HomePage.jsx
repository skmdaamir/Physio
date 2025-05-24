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

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const iconColor = darkMode ? "#4caf50" : "#198754";

  const reviews = [
    {
      quote:
        "Amazing service! Helped me recover after my knee surgery much faster than expected.",
      name: "- John Doe",
    },
    {
      quote: "Professional and friendly staff. Great experience overall!",
      name: "- Sarah Williams",
    },
    {
      quote:
        "Highly recommend Physio Clinic for sports injury recovery. Great techniques!",
      name: "- Michael Brown",
    },
  ];

  // New data arrays
  const therapists = [
    "Post-COVID Physiotherapy",
    "Shockwave Therapy",
    "Chest Physiotherapy",
    "Cryotherapy (Cold Therapy)",
    "Pelvic floor Physical Therapy",
    "Traction Therapy",
    "Soft Tissue Mobilization",
    "Myofascial Release (MFR)",
    "Acupuncture",
    "Cupping Therapy",
    "Kinesio Taping / Taping Therapy",
    "Chiropractic Therapy",
    "Spinal Decompression / Traction Therapy",
    "Dry Needling Therapy",
    "Wax Therapy",
    "THERMOTHERAPY (Heat Therapy)",
    "Manual Therapy",
    "LASER Therapy",
    "Transcutaneous Electrical Nerve Stimulation (TENS) Therapy",
    "Interferential Therapy (IFT)",
    "Ultrasound Therapy",
  ];

  const services = [
    "Cardiac Rehabilitation",
    "TELE-PHYSIOTHERAPY",
    "Therapeutic Massage",
    "Workplace Ergonomics : Assessment & Training",
    "Strength Training",
    "Vestibular Rehabilitation (VR)",
    "Musculoskeletal Physiotherapy",
    "Pre and Post Surgery Rehabilitation",
    "Women's Health Physiotherapy",
    "Sports Physiotherapy",
    "Geriatric Physiotherapy",
    "Pediatric Physiotherapy",
    "Chiropractor Treatment",
    "Home Care Physiotherapy",
    "Neuro Physiotherapy - Rehab",
  ];
  const conditions = [
    {
      text: "Varicose Veins",
      url: "https://drsinghphysiocare.com/varicose-veins",
    },
    {
      text: "Popliteal (Baker's) Cyst",
      url: "https://drsinghphysiocare.com/bakers-cyst",
    },
    {
      text: "Posterior Cruciate Ligament(PCL) Injury",
      url: "https://drsinghphysiocare.com/posterior-cruciate-ligament-pcl-injury/",
    },
    {
      text: "Lateral Collateral Ligament(LCL) Injury",
      url: "https://drsinghphysiocare.com/lateral-collateral-ligament-lcl-injury",
    },
    {
      text: "Medial Collateral Ligament (MCL) Injury",
      url: "https://drsinghphysiocare.com/medial-collateral-ligamentmclinjury/",
    },
    {
      text: "Patella Dislocation",
      url: "https://drsinghphysiocare.com/patella-discolation/",
    },
    {
      text: "Patellar Fracture",
      url: "https://drsinghphysiocare.com/patella-fracture/",
    },
    {
      text: "Meralgia Paresthetica",
      url: "https://drsinghphysiocare.com/meralgia-paresthetica/",
    },
    {
      text: "Hip Osteoarthritis",
      url: "https://drsinghphysiocare.com/hip-osteoarthritis/",
    },
    // ... add the rest of the items here
    { text: "Frozen Shoulder", url: "#" },
    { text: "Cervical Spondylosis", url: "#" },
    { text: "Lumbar Spondylosis", url: "#" },
  ];

  const symptoms = [
    { text: "Muscle Spasm", url: "#" },
    { text: "Tremors", url: "#" },
    { text: "Joint Cracking", url: "#" },
    { text: "Foot Pain", url: "#" },
    { text: "SPRAINS AND STRAINS", url: "#" },
    {
      text: "Shortness of Breath",
      url: "https://drsinghphysiocare.com/what-is-shortness-of-breath/",
    },
    { text: "Headache", url: "#" },
    { text: "Numbness and Tingling", url: "#" },
    { text: "Inflammation", url: "#" },
    { text: "Loss of Balance", url: "#" },
    { text: "Muscle Stiffness", url: "#" },
    { text: "Shoulder Pain", url: "#" },
    { text: "Joint Pain", url: "#" },
    { text: "Neck Pain", url: "#" },
    { text: "Back Pain", url: "#" },
    { text: "Knee pain", url: "#" },
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
                                    <Card.Text className="fs-5 fst-italic">
                                      "{review.quote}"
                                    </Card.Text>
                                    <Card.Title
                                      className={`mt-4 ${
                                        darkMode ? "text-info" : "text-primary"
                                      }`}
                                    >
                                      {review.name}
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
            At Physio Puls & Rehabilitation (PPRS) we use physio care approach
            providing a combination of therapies for comprehensive healing
            appoved modalities are used only
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
