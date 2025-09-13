import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";

// Dynamic import of all images in the images folder
const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../assets/images", false, /\.(png|jpe?g|jpg|svg|avif)$/)
);

const CarouselSlide = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full pt-5 overflow-hidden h-[70vh] sm:h-[85vh] lg:h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center bg-black/40 px-4 py-2 rounded-lg text-white backdrop-blur-sm">
            {/* <h3 className="text-lg font-semibold">Slide {index + 1}</h3> */}
            {/* <p className="text-sm">Description for slide {index + 1}.</p> */}
          </div>
        </div>
      ))}

      {/* Prev/Next buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-full"
        onClick={handlePrev}
      >
        ‹
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-full"
        onClick={handleNext}
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselSlide;
