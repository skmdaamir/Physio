import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-emerald-600' : 'bg-rose-600';
  const icon = type === 'success' ? 'check_circle' : 'error';

  return createPortal(
    <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-3 px-6 py-4 rounded-2xl text-white shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 ${bgColor}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <p className="font-bold text-sm whitespace-nowrap">{message}</p>
      <button onClick={onClose} className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center">
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>,
    document.body
  );
};

export default Toast;