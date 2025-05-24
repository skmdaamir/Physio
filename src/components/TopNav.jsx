import React, { useState } from "react";
import { Container, Navbar, Nav, Offcanvas, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './TopNav.css'
import logo from "../assets/images/logo.bmp";

const TopNav = () => {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => setDarkMode(!darkMode);

  const menuData = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/blog", name: "Blog" },
    { path: "/", name: "Photo Gallery" },
    { path: "/appointment", name: "Appointment" },
    { path: "/", name: "Career" },
  ];

  return (
    <>
      <Navbar
        expand="lg"
        className={`py-2 fixed-top shadow-sm ${
          darkMode ? "bg-dark navbar-dark" : "bg-light navbar-light"
        }`}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <img
              src={logo}
              alt="PPRS Logo"
              height="40" // tweak as needed
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id="theme-switch"
              checked={darkMode}
              onChange={handleToggleTheme}
              className="me-2"
              label={darkMode ? "Dark" : "Light"}
            />
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={() => setShow(true)}
            />
          </div>
          <Navbar.Collapse className="d-none d-lg-flex justify-content-center">
            <Nav className="mx-auto">
              {menuData.map((item) => (
                <Nav.Link
                  as={Link}
                  to={item.path}
                  key={item.name}
                  className={`mx-3 ${darkMode ? "text-light" : "text-dark"}`}
                >
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas for Mobile View */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="start" // ✅ Opens from right
        className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      >
        <Offcanvas.Header
          closeButton
          closeVariant={darkMode ? "white" : "black"}
        >
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column text-center">
            {menuData.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.name}
                onClick={() => setShow(false)}
                className="my-2"
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default TopNav;
