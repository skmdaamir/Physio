import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-slate-100/80 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        <span className="text-4xl font-bold text-primary">P+</span>
      </div>
    </div>
  );
};

export default Loader;