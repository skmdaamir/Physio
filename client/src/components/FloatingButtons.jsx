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
      href="tel:+917718891672"
      aria-label="Call Now"
    >
      <FaPhone />
    </Fab>

    {/* WhatsApp FAB */}
    <Fab
  className="floating-fab whatsapp-fab"
  color="success"
  href="https://wa.me/917718891672?text=Hi%2C%20I%20came%20across%20Physio%20Pulse%20%26%20Rehabilitation%20Studio%20and%20I%27m%20interested%20in%20learning%20more%20about%20your%20physiotherapy%20services.%20Could%20you%20please%20provide%20details%20about%20appointment%20availability%3F"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp Chat"
>
  <FaWhatsapp />
</Fab>

  </>
);

export default FloatingButtons;
