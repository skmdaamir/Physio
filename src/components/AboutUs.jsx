import React, { useEffect, useState } from "react";
import "./AboutUs.css";

import doctor1 from "../assets/docs/doctor1.jpg";
import doctor2 from "../assets/docs/doctor3.jpg";
import doctor3 from "../assets/docs/doctor2.jpg";
import AOS from "aos";
import physioMain from "../assets/docs/physiotherapy_main.jpg";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Carousel from "react-bootstrap/Carousel";

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
  {
    name: "Dr. David Lee",
    specialty: "Sports Injury Specialist",
    description: "Specialized in athletic injuries and performance therapy.",
    image: doctor3,
  },
  {
    name: "Dr. David Lee",
    specialty: "Sports Injury Specialist",
    description: "Specialized in athletic injuries and performance therapy.",
    image: doctor3,
  },
  {
    name: "Dr. David Lee",
    specialty: "Sports Injury Specialist",
    description: "Specialized in athletic injuries and performance therapy.",
    image: doctor3,
  },
  // Add more doctors if needed
];

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Group doctors into sets of 3 for each carousel slide
  const groupedDoctors = [];
  for (let i = 0; i < doctors.length; i += 3) {
    groupedDoctors.push(doctors.slice(i, i + 3));
  }

  return (
    <div
      className={`about-page ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-end my-3 me-4">
        <Button
          variant={darkMode ? "light" : "dark"}
          onClick={toggleDarkMode}
          size="sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      <Container fluid className="py-5 px-3">
        {/* About Section */}
        <section className="about-section fade-in">
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-4 mb-md-0">
              <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                About Physio Pulse & Rehabilitation Studio (PPRS)
              </h2>
              <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>
                At Physio Pulse & Rehabilitation Studio, we are dedicated to
                revitalizing lives through expert physiotherapy and holistic
                wellness solutions. Our mission is to help individuals recover,
                strengthen, and thrive—whether they're overcoming injury,
                managing chronic pain, or enhancing physical performance.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>
                Founded with a passion for movement and healing, Physio Pulse &
                Rehabilitation Studio blends evidence-based treatments with
                personalized care. Our team of licensed physiotherapists and
                health professionals are committed to delivering top-notch care
                in a supportive and welcoming environment. We specialize in a
                range of services including manual therapy, rehabilitation,
                posture correction, sports physiotherapy, and injury prevention
                programs. Using the latest techniques and technologies, we
                tailor each treatment plan to your unique needs and goals. At
                Physio Pulse & Rehabilitation Studio, your recovery is our
                priority—and your wellness is our pulse.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <img
                src={physioMain}
                alt="Physiotherapy"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </section>

        {/* Doctors Carousel Section */}
        <section className="doctors-section my-5 fade-in" data-aos="fade-up">
          <h2
            className="text-center mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            Meet Our Doctors
          </h2>
          <Carousel interval={1000} controls indicators touch pause="hover">
            {groupedDoctors.map((group, index) => (
              <Carousel.Item key={index}>
                <Row className="justify-content-center g-4">
                  {group.map((doctor, idx) => (
                    <Col xs={12} sm={6} md={4} key={idx}>
                      <Card
                        className={`h-100 shadow-sm border-0 ${
                          darkMode
                            ? "bg-secondary text-light"
                            : "bg-body-tertiary"
                        }`}
                      >
                        <Card.Img
                          variant="top"
                          src={doctor.image}
                          alt={doctor.name}
                          className="img-fluid object-fit-cover w-50 h-50"
                          style={{ objectFit: "cover" }}
                        />
                        <Card.Body>
                          <Card.Title
                            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
                          >
                            {doctor.name}
                          </Card.Title>
                          <Card.Subtitle
                            className="mb-2 text-muted"
                            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)" }}
                          >
                            {doctor.specialty}
                          </Card.Subtitle>
                          <Card.Text
                            style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)" }}
                          >
                            {doctor.description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
