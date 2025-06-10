import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import doctor1 from "../assets/docs/doctor1.jpg";
import doctor2 from "../assets/docs/doctor3.jpg";
import doctor3 from "../assets/docs/doctor2.jpg";
import AOS from "aos";
import physioMain from "../assets/docs/physiotherapy_main.jpg";
import { Card, Col, Row, Container, Button, Modal } from "react-bootstrap";
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
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className={`about-page ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
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

      <Container fluid className="py-4 px-3">
        {/* About Section */}
        <section className="about-section fade-in mb-5">
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <h2>About Physio Pulse & Rehabilitation Studio (PPRS)</h2>
              <p>
                At Physio Pulse & Rehabilitation Studio, we are dedicated to
                revitalizing lives through expert physiotherapy and holistic
                wellness solutions. Our mission is to help individuals recover,
                strengthen, and thrive—whether they're overcoming injury,
                managing chronic pain, or enhancing physical performance.
              </p>
              <p>
                We specialize in a range of services including manual therapy,
                rehabilitation, posture correction, sports physiotherapy, and
                injury prevention programs. Using the latest techniques and
                technologies, we tailor each treatment plan to your unique
                needs.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <img
                src={physioMain}
                alt="Physiotherapy"
                className="img-fluid rounded shadow w-100"
              />
            </Col>
          </Row>
        </section>

        {/* Doctors Section with Modal */}
        <section className="doctors-section fade-in mb-5" data-aos="fade-up">
          <h2 className="text-center mb-4">Meet Our Doctors</h2>
          <p className="text-center mb-4">
            Is it the people who make PPRS what it is and we are extremely proud
            of the achievements of our Professionals. We all work together to
            help our patients through recovery, providing the best possible
            care.
          </p>
          <Row className="g-4">
            {doctors.map((doctor, index) => (
              <Col key={index} xs={12} md={4}>
                <Card
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`h-100 shadow doctor-card border-0 cursor-pointer ${
                    darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={doctor.image}
                    alt={doctor.name}
                    className="img-fluid rounded-top"
                    style={{
                      height: "300px",
                      objectFit: "contain",
                      objectPosition: "top",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="mb-1 fs-5">{doctor.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted fs-6">
                      {doctor.specialty}
                    </Card.Subtitle>
                    <Card.Text>{doctor.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Modal */}
          <Modal
            show={!!selectedDoctor}
            onHide={() => setSelectedDoctor(null)}
            centered
          >
            {selectedDoctor && (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedDoctor.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                  <h6 className="text-muted">{selectedDoctor.specialty}</h6>
                  <p>{selectedDoctor.description}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedDoctor(null)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal>
        </section>

        {/* Services Section */}
        <section className="services-section fade-in mb-5">
          <h2>Where We Provide Services</h2>
          <Row className="g-4 text-center">
            <Col xs={12} md={4}>
              <Card
                className={`h-100 shadow border-0 ${
                  darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                }`}
              >
                <Card.Body>
                  <Card.Title>Downtown Clinic</Card.Title>
                  <Card.Text>
                    State of the art facility with expert therapists available 7
                    days a week.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card
                className={`h-100 shadow border-0 ${
                  darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                }`}
              >
                <Card.Body>
                  <Card.Title>Uptown Center</Card.Title>
                  <Card.Text>
                    Specialized care for sports injuries and pediatric
                    physiotherapy treatments.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card
                className={`h-100 shadow border-0 ${
                  darkMode ? "bg-secondary text-light" : "bg-body-tertiary"
                }`}
              >
                <Card.Body>
                  <Card.Title>Suburban Rehab Center</Card.Title>
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
