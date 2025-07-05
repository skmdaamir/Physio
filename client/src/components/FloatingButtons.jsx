import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { Fab } from "@mui/material";
import "./FloatingButtons.css"; // Ensure this includes zoom CSS as updated

const FloatingButtons = () => (
  <>
    {/* Phone FAB */}
    <Fab
      className="floating-fab phone-fab"
      color="primary"
      href="tel:+918655319821"
      aria-label="Call Now"
    >
      <FaPhone />
    </Fab>

    {/* WhatsApp FAB */}
    <Fab
      className="floating-fab whatsapp-fab"
      color="success"
      href="https://wa.me/918655319821"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat"
    >
      <FaWhatsapp />
    </Fab>
  </>
);

export default FloatingButtons;
