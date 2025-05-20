import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css"; // Custom CSS file for glass effect

const Footer = () => {
  return (
    <footer className="glass-footer text-light py-5" data-aos="fade-up">
      <Container>
        <Row className="mb-4">
          <Col md={3}>
            <h5 className="mb-3">Menu</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#aboutus">About Us</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#gallery">Photo Gallery</a>
              </li>
              <li>
                <a href="#appointment">Appointment</a>
              </li>
              <li>
                <a href="#career">Career</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">About Us</h5>
            <p>
              We are committed to providing the best physiotherapy care for a
              healthier, stronger you.
            </p>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Contact</h5>
            <p>Email: info@physio.com</p>
            <p>Phone: +1 234 567 890</p>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Follow Us</h5>
            <div className="footer-social-icons d-flex">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <small>&copy; 2025 Physiotherapy App - All Rights Reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
