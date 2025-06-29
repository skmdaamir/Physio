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
      className={`py-2 fixed-top shadow-sm ${
        darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"
      }`}
    >
      <Container fluid className="d-flex justify-content-between align-items-center flex-wrap">
        {/* Logo and Theme Toggle */}
        <div className="d-flex align-items-center">
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 me-3">
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
            label={darkMode ? "Dark" : "Light"}
          />
        </div>

        {/* Horizontal Nav */}
        <Nav className="d-flex flex-row justify-content-center align-items-center mt-2 mt-lg-0 flex-wrap">
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
