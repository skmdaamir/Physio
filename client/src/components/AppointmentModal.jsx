import React from "react";
import AppointmentForm from "./AppointmentForm";

const AppointmentModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6 relative mx-4 sm:mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-center text-xl font-semibold mb-4">
          Book an Appointment
        </h2>

        {/* Welcome Text */}
        <h4 className="text-center mb-6 text-lg font-medium text-gray-700 dark:text-gray-200">
          Welcome to{" "}
          <span className="text-primary dark:text-green-400 font-semibold">
            Physio Pulse
          </span>
        </h4>

        <AppointmentForm isModal={true} />
      </div>
    </div>
  );
};

export default AppointmentModal;
