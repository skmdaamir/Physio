import React, { useState } from "react";
import { Container, Navbar, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './TopNav.css';
import logo from "../assets/images/logo.bmp";

const TopNav = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => setDarkMode(!darkMode);

  const menuData = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/blog", name: "Blog" },
    { path: "/gallery", name: "Photo Gallery" },
    { path: "/appointment", name: "Appointment" },
    { path: "/career", name: "Career" },
  ];

  return (
    <Navbar
      expand="lg"
      className={`py-2 fixed-top shadow-sm flex-wrap ${
        darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"
      }`}
    >
      <Container fluid className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <img
              src={logo}
              alt="PPRS Logo"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Form.Check
            type="switch"
            id="theme-switch"
            checked={darkMode}
            onChange={handleToggleTheme}
            className="ms-auto me-2"
            label={darkMode ? "Dark" : "Light"}
          />
        </div>

        <Nav className="w-100 justify-content-center mt-2 mt-md-0">
          {menuData.map((item) => (
            <Nav.Link
              as={Link}
              to={item.path}
              key={item.name}
              className={`mx-2 ${darkMode ? "text-light" : "text-dark"}`}
            >
              {item.name}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNav;
