import React from "react";
import AppointmentForm from "./AppointmentForm";

const AppointmentModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative mx-4 sm:mx-6 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modalIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-center text-2xl font-bold mb-2 text-gray-800">
          Book an Appointment
        </h2>

        {/* Welcome Text */}
        <p className="text-center mb-6 text-gray-600">
          Welcome to{" "}
          <span className="text-blue-600 font-semibold">
            Physio Pulse
          </span>{" "}
          — we’re here to help you heal better!
        </p>

        {/* Divider line for style */}
        <div className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>

        {/* Appointment Form */}
        <div className="overflow-x-hidden">
          <AppointmentForm isModal={true} onClose={onClose} />
        </div>
        {/* Bullet Points */}
        <ul className="mt-1 ml-3 space-y-2 text-gray-700 text-sm list-disc list-inside">
          <li>
            Your requirement is sent to the selected professional/Physiotherapist.
          </li>
          <li>
            You can find the best suitable Physiotherapist nearby your location.
          </li>
          <li>
            Physio Pulse and Rehab Team will contact you within 5–10 minutes.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppointmentModal;
