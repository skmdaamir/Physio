// FloatingButtons.jsx
import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { Fab } from "@mui/material";

const FloatingButtons = () => (
  <>
    <Fab
      size="large"
      sx={{
        width: { xs: 60, sm: 64 },
        height: { xs: 60, sm: 64 },
        position: "fixed",
        bottom: { xs: 16, sm: 20 },
        left: { xs: 16, sm: 20 },
        zIndex: 1000,
      }}
      color="primary"
      href="tel:+918655319821"
      aria-label="Call Now"
    >
      <FaPhone size={28} />
    </Fab>

    <Fab
      size="large"
      sx={{
        width: { xs: 60, sm: 64 },
        height: { xs: 60, sm: 64 },
        position: "fixed",
        bottom: { xs: 16, sm: 20 },
        right: { xs: 16, sm: 20 },
        zIndex: 1000,
      }}
      color="success"
      href="https://wa.me/918655319821"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat"
    >
      <FaWhatsapp size={28} />
    </Fab>
  </>
);

export default FloatingButtons;
