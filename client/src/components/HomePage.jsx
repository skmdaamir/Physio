import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AppointmentModal from "./AppointmentModal"; // Adjust the path if needed

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Open modal automatically when the homepage loads
    setShowModal(true);
  }, []);

  return (
    <>
      {/* Appointment Modal */}
      <AppointmentModal show={showModal} onClose={() => setShowModal(false)} />

      <Container className="my-5">
        {/* Introduction Section */}
        <h2 className="text-center mb-4" data-aos="fade-up">
          Welcome to Physio Pulse
        </h2>
        <p className="text-center mb-5" data-aos="fade-up" data-aos-delay="100">
          We specialize in providing advanced physiotherapy services to help you
          recover quickly and live a healthier, pain-free life.
        </p>

        {/* Reviews Section */}
        <h3 className="text-center mb-4">What Our Clients Say</h3>
        <Row className="g-4">
          <Col md={4} data-aos="fade-up" data-aos-delay="200">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>
                  "Amazing service! Helped me recover after my knee surgery much
                  faster than expected."
                </Card.Text>
                <Card.Title className="mt-3">- John Doe</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>
                  "Professional and friendly staff. Great experience overall!"
                </Card.Text>
                <Card.Title className="mt-3">- Sarah Williams</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>
                  "Highly recommend Physio Clinic for sports injury recovery.
                  Great techniques!"
                </Card.Text>
                <Card.Title className="mt-3">- Michael Brown</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Why Choose Us Section */}
        <h3 className="text-center mt-5 mb-4">Why Choose Physio Pulse?</h3>
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Highly Qualified and Experienced Team</Card.Title>
                <Card.Text>
                  Our physiotherapists are not just certified
                  professionals—they're passionate caregivers with years of
                  hands-on experience in treating a wide range of conditions.
                  From sports injuries and post-surgical rehab to chronic pain
                  and posture correction, our team combines deep clinical
                  knowledge with personalized attention.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Customized Treatment Plans</Card.Title>
                <Card.Text>
                  No two bodies—or injuries—are the same. That’s why we take the
                  time to fully assess your condition, understand your goals,
                  and develop a treatment plan tailored just for you. Whether
                  you're an athlete returning to the field or someone seeking
                  pain relief from everyday discomfort, your plan is designed
                  with you in mind.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Advanced Equipment & Techniques</Card.Title>
                <Card.Text>
                  At Physio Pulse, we integrate modern physiotherapy technology
                  with the latest evidence-based techniques. Our facility is
                  equipped with advanced tools that support faster, more
                  accurate diagnosis and more effective treatment—helping you
                  recover safely and efficiently.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Holistic and Preventive Approach</Card.Title>
                <Card.Text>
                  We don’t just treat symptoms—we focus on the root cause. Our
                  holistic approach emphasizes full-body wellness, helping you
                  build strength, restore balance, and prevent future injuries.
                  This includes education, lifestyle guidance, and corrective
                  exercises tailored to your daily activities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Warm, Welcoming Environment</Card.Title>
                <Card.Text>
                  Your comfort matters to us. From your first visit, you’ll feel
                  the supportive and friendly atmosphere we’ve cultivated. We
                  believe healing happens best when you feel respected, heard,
                  and cared for every step of the way.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Proven Results and Happy Clients</Card.Title>
                <Card.Text>
                  Our success is measured by the progress and satisfaction of
                  our clients. We’re proud of our track record in helping
                  individuals regain mobility, improve function, and live
                  pain-free lives. Our patients often refer family and
                  friends—because they trust us to deliver real results.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
