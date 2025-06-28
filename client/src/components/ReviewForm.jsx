import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Rating from "react-rating";
import "./ReviewForm.css";
import axios from '../axiosInstance';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    rating: 0,
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/appointments", formData);
        alert("Thank you for your feedback!");
        setFormData({
          name: "",
        email: "",
        mobile: "",
        rating: 0,
        description: "",
        });


  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="text-center mb-4">Leave a Review</h3>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div className="mb-3">
                <Rating
                  emptySymbol={
                    <span style={{ fontSize: "30px", color: "#ccc" }}>☆</span>
                  }
                  fullSymbol={
                    <span style={{ fontSize: "30px", color: "#ffd700" }}>
                      ★
                    </span>
                  }
                  fractions={2}
                  initialRating={formData.rating}
                  onChange={handleRating}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your feedback..."
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit">
                Submit Review
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewForm;
