import React from "react";
import { Container, Navbar, Nav, NavLink } from "react-bootstrap";
import {BrowserRouter as Router} from 'react-router-dom';

const TopNav = () => { 

  const menuData = [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/',
      name: 'About Us'
    },
    {
      path: '/',
      name: 'Blog'
    },
    {
      path: '/',
      name: 'Photo Gallery'
    },
    {
      path: '/appointment',
      name: 'Appointment'
    },
    {
      path: '/',
      name: 'Career'
    }
  ]


  return (
    <Router>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className= "brand">Physio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex d-lg-flex justify-content-lg-center">
            {
              menuData.map((item) => (
                <NavLink to={item.path} key={item.name}>
                  <div className="list_item mx-3">{item.name}</div>
                </NavLink>
              ))
            }
          </Nav>
          {/* <Routes>
        <Route path='' element={<AppointmentForm />} />
    </Routes> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Router>
  );
};

export default TopNav;
