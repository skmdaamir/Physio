import React from "react";
import { Modal } from "react-bootstrap";
import AppointmentForm from "./AppointmentForm";
import "./AppointmentModal.css";

const AppointmentModal = ({ show, onClose }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      size="lg"
      centered
      fullscreen="sm-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center mb-4 glowing-text">
          Welcome to <span className="text-primary">Physio Pulse</span>
        </h4>
        <AppointmentForm isModal={true} />
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentModal;
