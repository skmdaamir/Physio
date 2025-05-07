import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="my-5">
      {/* Introduction Section */}
      <h2 className="text-center mb-4" data-aos="fade-up">
        Welcome to Physio Clinic
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
      <h3 className="text-center mt-5 mb-4">Why Choose Us</h3>
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Experienced Therapists</Card.Title>
              <Card.Text>
                All our physiotherapists are certified professionals with years
                of clinical experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Advanced Treatment Techniques</Card.Title>
              <Card.Text>
                We use the latest therapy equipment and evidence-based practices
                to ensure optimal recovery.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
