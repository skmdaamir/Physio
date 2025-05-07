import React, { useEffect } from "react";
import "./AboutUs.css";

import doctor1 from "../assets/docs/doctor1.jpg";
import doctor2 from "../assets/docs/doctor3.jpg";
import doctor3 from "../assets/docs/doctor2.jpg";
import AOS from "aos";
// import physio1 from "../assets/images/istockphoto-805089584-612x612.jpg";
// import physio2 from "../assets/images/medical-assistant-helping-patient-with.jpg";
// import physio3 from "../assets/images/medium-shot-man-helping-patient-physio.jpg";
import physioMain from "../assets/docs/physiotherapy_main.jpg";
import { Card, Col, Row } from "react-bootstrap";

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
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

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
    handleScroll(); //Internal check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="about-page">
      <div className="about-us-page">
        {/* About Section */}
        <section className="about-section container fade-in">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2>About Our Clinic</h2>
              <p>
                We aim to restore your mobility, improve your quality of life,
                and promote faster recovery through advanced physiotherapy
                treatments and compassionate care.
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
          className="doctors-section container my-5  fade-in"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-center mb-4">Meet Our Doctors</h2>
          <div className="row">
            {doctors.map((doctor, index) => (
              <div
                className="col-md-4 mb-4"
                key={index}
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-delay={(index+1) + "00"}
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
      </div>
    </div>
  );
};

export default AboutUs;
