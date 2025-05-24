import React from "react";
import "./CarouselSlide.css";
import { Carousel } from "react-bootstrap";

//Dyanmic Import
const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../assets/images", false, /\.(png|jpe?g|jpg|svg|avif)$/)
);

function CarouselSlide() {
  return (
    <>
      <Carousel
        interval={2000}
        fade
        nextIcon={
          <span aria-hidden="true" className="custom-next-icon">
            &#8250;
          </span>
        }
        prevIcon={
          <span aria-hidden="true" className="custom-prev-icon">
            &#8249;
          </span>
        }
        indicators={true}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={image} alt={`Slide ${index}`} />
            <Carousel.Caption className="carousel-caption">
              <h3>Slide {index + 1}</h3>
              <p>Description for slide {index + 1}.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* About Section
      <Container className="my-5">
        <Row>
          <Col md={12} className="text-center">
            <h2>About Our Physiotherapy Clinic</h2>
            <p>
              We are committed to providing the best physiotherapy treatments to
              help you regain mobility, relieve pain, and improve your quality
              of life. Our experienced team ensures personalized care tailored
              to your needs.
            </p>
          </Col>
        </Row>
      </Container>
      {/* Reviews Section */}
      {/* <Container className="my-5">
        <h2 className="text-center mb-4">What Our Clients Say</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>
                  "The best physiotherapy center! Helped me recover quickly
                  after my surgery."
                </Card.Text>
                <Card.Title>- John Doe</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>
                  "Friendly staff and excellent treatment plans. Highly
                  recommend!"
                </Card.Text>
                <Card.Title>- Jane Smith</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>
                  "I felt stronger and healthier after each session. Thank you
                  team!"
                </Card.Text>
                <Card.Title>- Michael Lee</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
      {/* (Optional) Why Choose Us */}
      {/* <Container className="my-5">
        <h2 className="text-center mb-4">Why Choose Us</h2>
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Experienced Therapists</Card.Title>
                <Card.Text>
                  All our physiotherapists are certified with years of
                  experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Advanced Techniques</Card.Title>
                <Card.Text>
                  We use the latest therapies and equipment to ensure effective
                  treatment.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default CarouselSlide;
