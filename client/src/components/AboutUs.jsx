import React, { useEffect, useState } from "react";
import "./AboutUs.css";

import doctor1 from "../assets/docs/doctor1.jpg";
import doctor2 from "../assets/docs/doctor3.jpg";
import doctor3 from "../assets/docs/doctor2.jpg";
import AOS from "aos";
import physioMain from "../assets/docs/physiotherapy_main.jpg";
import { Card, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import AppointmentModal from "./AppointmentModal";

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
  // const [showModal, setShowModal] = useState(false); // ✅ Moved outside useEffect

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Automatically open modal when About Us page loads
    // setShowModal(true);

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
    <div className="about-page">
      <Helmet>
        <title>About Us | Physio Pulse</title>
      </Helmet>

      {/* <AppointmentModal show={showModal} onClose={() => setShowModal(false)} /> */}

      {/* About Section */}
      <section className="about-section container fade-in">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2>About Physio Pulse</h2>
            <p>
              At Physio Pulse, we are dedicated to revitalizing lives through
              expert physiotherapy and holistic wellness solutions. Our mission
              is to help individuals recover, strengthen, and thrive—whether
              they're overcoming injury, managing chronic pain, or enhancing
              physical performance.
            </p>
            <p>
              Founded with a passion for movement and healing, Physio Pulse
              blends evidence-based treatments with personalized care. Our team
              of licensed physiotherapists and health professionals are
              committed to delivering top-notch care in a supportive and
              welcoming environment. We specialize in a range of services
              including manual therapy, rehabilitation, posture correction,
              sports physiotherapy, and injury prevention programs. Using the
              latest techniques and technologies, we tailor each treatment plan
              to your unique needs and goals. At Physio Pulse, your recovery is
              our priority—and your wellness is our pulse.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={physioMain}
              alt="Physiotherapy"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section
        className="doctors-section container my-5 fade-in"
        data-aos="fade-up"
      >
        <h2 className="text-center mb-4">Meet Our Doctors</h2>
        <div className="row">
          {doctors.map((doctor, index) => (
            <div
              className="col-md-4 mb-4"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={`${index + 1}00`}
            >
              <div className="card doctor-card h-100 shadow-sm">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {doctor.specialty}
                  </h6>
                  <p className="card-text">{doctor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section container my-5 fade-in">
        <h2 className="text-center mb-4" data-aos="fade-up">
          Where We Provide Services
        </h2>

        <Row className="g-4 text-center">
          <Col md={4} data-aos="fade-up" data-aos-delay="200">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="mt-3">Downtown Clinic</Card.Title>
                <Card.Text>
                  State of the art facility with expert therapists available 7
                  days a week.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="mt-3">Uptown Center</Card.Title>
                <Card.Text>
                  Specialized care for sports injuries and pediatric
                  physiotherapy treatments.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="mt-3">Suburban Rehab Center</Card.Title>
                <Card.Text>
                  Comprehensive rehabilitation and physiotherapy solutions
                  closer to home.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default AboutUs;
