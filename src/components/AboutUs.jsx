import React, { useEffect, useState } from "react";
import "./AboutUs.css";

import doctor1 from "../assets/docs/doctor1.jpg";
import doctor2 from "../assets/docs/doctor3.jpg";
import doctor3 from "../assets/docs/doctor2.jpg";
import AOS from "aos";
import physioMain from "../assets/docs/physiotherapy_main.jpg";
import { Card, Col, Row, Container, Button } from "react-bootstrap";
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

  return (
    <div
      className={`about-page ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <Helmet>
        <title>About Us | Physio Pulse & Rehabilitation Studio (PPRS)</title>
      </Helmet>

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
              <h2>About Physio Pulse & Rehabilitation Studio (PPRS)</h2>
              <p>
                At Physio Pulse & Rehabilitation Studio, we are dedicated to
                revitalizing lives through expert physiotherapy and holistic
                wellness solutions. Our mission is to help individuals recover,
                strengthen, and thrive—whether they're overcoming injury,
                managing chronic pain, or enhancing physical performance.
              </p>
              <p>
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

        {/* Doctors Section */}
        <section className="doctors-section my-5 fade-in" data-aos="fade-up">
          <h2 className="text-center mb-4">Meet Our Doctors</h2>
          <Row>
            {doctors.map((doctor, index) => (
              <Col
                xs={12}
                sm={12}
                md={6}
                lg={4}
                className="mb-4"
                key={index}
                data-aos="zoom-in"
                data-aos-delay={`${index + 1}00`}
              >
                <Card
                  className={`h-100 shadow-sm border-0 ${
                    darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                  }`}
                >
                  <Card.Img
                    variant="top"
                    src={doctor.image}
                    alt={doctor.name}
                  />
                  <Card.Body>
                    <Card.Title>{doctor.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {doctor.specialty}
                    </Card.Subtitle>
                    <Card.Text>{doctor.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Services Section */}
        <section className="services-section my-5 fade-in">
          <h2 className="text-center mb-4" data-aos="fade-up">
            Where We Provide Services
          </h2>

          <Row className="g-4 text-center">
            <Col xs={12} md={4} data-aos="fade-up" data-aos-delay="200">
              <Card
                className={`h-100 shadow-sm border-0 ${
                  darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                }`}
              >
                <Card.Body>
                  <Card.Title className="mt-3">Downtown Clinic</Card.Title>
                  <Card.Text>
                    State of the art facility with expert therapists available 7
                    days a week.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} data-aos="fade-up" data-aos-delay="300">
              <Card
                className={`h-100 shadow-sm border-0 ${
                  darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                }`}
              >
                <Card.Body>
                  <Card.Title className="mt-3">Uptown Center</Card.Title>
                  <Card.Text>
                    Specialized care for sports injuries and pediatric
                    physiotherapy treatments.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4} data-aos="fade-up" data-aos-delay="400">
              <Card
                className={`h-100 shadow-sm border-0 ${
                  darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                }`}
              >
                <Card.Body>
                  <Card.Title className="mt-3">
                    Suburban Rehab Center
                  </Card.Title>
                  <Card.Text>
                    Comprehensive rehabilitation and physiotherapy solutions
                    closer to home.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default AboutUs;
