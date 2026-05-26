import React, { useState } from 'react';

/**
 * Reusable image component with a blur-up effect.
 * @param {string} src - The high-resolution image URL.
 * @param {string} alt - Alt text for accessibility.
 * @param {string} className - Additional Tailwind classes for the wrapper.
 */
const LazyImage = ({ src, alt, className = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`blur-up-container ${!isLoaded ? 'shimmer' : ''} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`blur-up-img ${isLoaded ? 'loaded' : 'loading'}`}
        {...props}
      />
    </div>
  );
};

export default LazyImage;