import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import './FloatingButtons.css';
import {Fab} from "@mui/material"

const FloatingButtons  = () => {

    return (
        <><Fab color="primary" sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
zIndex:1000,
        }} href="tel:+918655319821" aria-label="Call Now">
            <FaPhone size={24}/>
        </Fab>
        <Fab color="success" sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
zIndex:1000,
            }}
                href="https://wa.me/918655319821" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Chat">
                <FaWhatsapp size={24} />
            </Fab></>
    );
};

export default FloatingButtons;