import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css";

const Footer = ({ darkMode }) => {
  // Colors based on darkMode
  const linkColor = darkMode ? "#a5d6a7" : "#ffffff"; // Light green or white
  const linkHoverColor = darkMode ? "#4caf50" : "#28a745"; // Darker green or bootstrap green

  return (
    <footer
      className={`glass-footer py-5 ${darkMode ? "text-light" : "text-dark"}`}
      data-aos="fade-up"
      style={{
        backgroundColor: darkMode ? "#1d3141dd" : "#1d3141cc",
      }}
    >
      <Container>
        <Row className="mb-4">
          <Col md={3}>
            <h5 className="mb-3" style={{ color: linkColor }}>
              Menu
            </h5>
            <ul className="list-unstyled">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/blog", label: "Blog" },
                { to: "/gallery", label: "Photo Gallery" },
                { to: "/appointment", label: "Appointment" },
                { to: "/career", label: "Career" },
              ].map(({ to, label }) => (
                <li key={to} style={{ marginBottom: "8px" }}>
                  <Link
                    to={to}
                    style={{
                      color: linkColor,
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "color 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = linkHoverColor)
                    }
                    onMouseLeave={(e) => (e.target.style.color = linkColor)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={3}>
            <h5 className="mb-3" style={{ color: linkColor }}>
              About Us
            </h5>
            <p style={{ color: darkMode ? "#ccc" : "#ffffff" }}>
              We are committed to providing the best physiotherapy care for a
              healthier, stronger you.
            </p>
          </Col>

          <Col md={3}>
            <h5 className="mb-3" style={{ color: linkColor }}>
              Contact
            </h5>
            <p style={{ color: darkMode ? "#ccc" : "#ffffff" }}>
              Email: info@physio.com
            </p>
            <p style={{ color: darkMode ? "#ccc" : "#ffffff" }}>
              Phone: +1 234 567 890
            </p>
          </Col>

          <Col md={3}>
            <h5 className="mb-3" style={{ color: linkColor }}>
              Follow Us
            </h5>
            <div className="footer-social-icons d-flex">
              {[
                {
                  href: "https://facebook.com",
                  icon: <FaFacebookF size={24} />,
                },
                {
                  href: "https://instagram.com",
                  icon: <FaInstagram size={24} />,
                },
                {
                  href: "https://linkedin.com",
                  icon: <FaLinkedinIn size={24} />,
                },
                {
                  href: "https://twitter.com",
                  icon: <FaTwitter size={24} />,
                },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                  style={{
                    color: linkColor,
                    transition: "color 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = linkHoverColor)}
                  onMouseLeave={(e) => (e.target.style.color = linkColor)}
                >
                  {icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <small style={{ color: darkMode ? "#ccc" : "#ffffff" }}>
              &copy; 2025 Physiotherapy App - All Rights Reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
