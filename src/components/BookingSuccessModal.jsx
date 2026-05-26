import React from 'react';

const BookingSuccessModal = ({ isOpen, onClose, onNavigateHome }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl animate-in zoom-in duration-300 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-emerald-600 text-6xl">
            check_circle
          </span>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-3">
          Appointment Booked!
        </h3>
        <p className="text-slate-600 leading-relaxed mb-8">
          Your request has been sent successfully. Our team will contact you
          shortly to confirm the details.
        </p>
        <button
          onClick={onNavigateHome}
          className="w-full px-8 py-3 bg-[#135bec] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessModal;