import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { Fab, Tooltip, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./FloatingButtons.css";

const FloatingButtons = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Tooltip title={isMobile ? "" : "Call Now"} placement="left">
        <Fab
          className="floating-fab phone-fab"
          color="primary"
          href="tel:+918655319821"
          aria-label="Call Now"
          size={isMobile ? "medium" : "large"}
        >
          <FaPhone />
        </Fab>
      </Tooltip>

      <Tooltip title={isMobile ? "" : "WhatsApp Chat"} placement="left">
        <Fab
          className="floating-fab whatsapp-fab"
          color="success"
          href="https://wa.me/918655319821"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Chat"
          size={isMobile ? "medium" : "large"}
        >
          <FaWhatsapp />
        </Fab>
      </Tooltip>
    </>
  );
};

export default FloatingButtons;
