import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { Fab } from "@mui/material";
import "./FloatingButtons.css"; // make sure this is imported

const FloatingButtons = () => (
  <>
    <Fab
  className="floating-fab phone-fab"
  color="primary"
  href="tel:+918655319821"
  aria-label="Call Now"
>
  <FaPhone />
</Fab>

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
