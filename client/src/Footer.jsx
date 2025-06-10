import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import './Footer.css';
const Footer = () => {


    return (
        <React.Fragment>
            <div className="footer">
                <Container>
                    <Row>
                        <Col sm={3}>
                        <h5>About Us</h5>
                        <p>Lorem ipsum best text for dummy content.</p>
                        </Col>
                        <Col sm={3}>
                        <h5>Navigation</h5>
                        <p>Lorem ipsum best text for dummy content.</p>
                        </Col>
                        <Col sm={3}>
                            <h5>Services</h5>
                            <p>Lorem ipsum best text for dummy content.</p>
                        </Col>
                    </Row>
                    <div className="footer-bottom">
                     <p className="text-xs-center">
                         &copy;{new Date().getFullYear()} Physiotherapy App - All Rights Reserved
                     </p>
                 </div>
                </Container>
            </div>
        </React.Fragment>
    );
};


export default Footer;
