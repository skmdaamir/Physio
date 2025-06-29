import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "../axiosInstance";
import { Helmet } from "react-helmet";
const qs = require("qs");

const AppointmentForm = ({ isModal = false }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    treatmentType: "",
    state: "",
    city: "",
    conditions: "",
  });
  const [treatments, setTreatments] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchTreatments();
    fetchStates();
  }, []);

  useEffect(() => {
    if (form.state) {
      fetchCities(form.state);
    }
  }, [form.state]);

  const fetchTreatments = async () => {
    const res = await axios.get("/api/treatment");
    setTreatments(res.data);
  };

  const fetchStates = async () => {
    const res = await axios.get("/api/states");
    setStates(res.data);
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(`/api/cities/${stateId}`);
      setCities(res.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/appointments", form);
      alert("Appointment submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        treatmentType: "",
        state: "",
        city: "",
        conditions: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit appointment.");
    }
  };

  const formContent = (
    <div data-aos="fade-up">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Treatment Type</Form.Label>
              <Form.Select
                name="treatmentType"
                value={form.treatmentType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {treatments.map((t) => (
                  <option key={t.treatment_id} value={t.treatment_id}>
                    {t.treatment_description}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Select
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {states.map((s) => (
                  <option key={s.state_id} value={s.state_id}>
                    {s.state_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Select
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {cities.map((c) => (
                  <option key={c.city_id} value={c.city_id}>
                    {c.city_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Brief About Your Condition</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="conditions"
            value={form.conditions}
            onChange={handleChange}
            maxLength={4000}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button type="submit">Submit Appointment</Button>
        </div>
      </Form>
    </div>
  );

  return isModal ? (
    formContent
  ) : (
    <Container className="pt-5 mt-5">
      <Helmet>
        <title>Appointment Form | Physio Pulse</title>
        <style>{`
          @media (max-width: 768px) {
            form label,
            form input,
            form select,
            form textarea,
            button {
              font-size: 16px !important;
            }

            form .form-control,
            form .form-select,
            form textarea {
              padding: 12px !important;
            }

            button[type="submit"] {
              width: 100%;
              padding: 12px;
            }

            h2 {
              font-size: 22px !important;
              text-align: center;
            }

            .container {
              padding-left: 15px;
              padding-right: 15px;
            }
          }
        `}</style>
      </Helmet>
      <h2 className="mb-4">Book an Appointment</h2>
      {formContent}
    </Container>
  );
};

export default AppointmentForm;
