import React from "react";
import logo from "../assets/logos/physio_logojpg.jpg"; // adjust path if needed

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
      <img
        src={logo}
        alt="Loading..."
        className="w-20 h-20 animate-spin"
      />
    </div>
  );
};

export default Loader;
