import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNav = () => {
  const menuData = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About Us",
    },
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/",
      name: "Photo Gallery",
    },
    {
      path: "/appointment",
      name: "Appointment",
    },
    {
      path: "/",
      name: "Career",
    },
  ];

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          Physio Pulse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex d-lg-flex justify-content-lg-center">
            {menuData.map((item) => (
              <Nav.Link
                as={Link}
                to={item.path}
                key={item.name}
                className="mx-3 list_item"
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
