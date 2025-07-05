import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="dot-loader-container">
      <div className="dot-spinner">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`dot dot-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
