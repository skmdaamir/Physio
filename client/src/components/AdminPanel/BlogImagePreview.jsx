import React, { useState } from 'react';

const BlogImagePreview = ({ imageUrl }) => {
  const [previewSrc, setPreviewSrc] = useState(null);

  return (
    <>
      <img
        src={imageUrl}
        alt="Blog"
        className="h-12 w-12 object-cover rounded cursor-pointer"
        onClick={() => setPreviewSrc(imageUrl)}
      />

      {previewSrc && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setPreviewSrc(null)}
        >
          <img
            src={previewSrc}
            alt="Preview"
            className="max-h-full max-w-full rounded shadow-lg"
            onClick={e => e.stopPropagation()} // Prevent closing on clicking image itself
          />
        </div>
      )}
    </>
  );
};

export default BlogImagePreview;
