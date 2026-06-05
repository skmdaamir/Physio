import React, { useEffect } from 'react';

const MedicalDisclaimerModal = ({ isOpen, onAccept }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 md:p-10 shadow-2xl animate-in zoom-in duration-300 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[#135bec] text-5xl">
            clinical_notes
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 text-center">
          Medical Disclaimer
        </h3>
        
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base text-center mb-8">
          <p>
            The content on this website is for <span className="font-bold text-slate-900">informational and educational purposes only</span>. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </p>
        </div>

        <button
          onClick={onAccept}
          className="w-full py-4 bg-[#135bec] text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          I Understand & Accept
        </button>
      </div>
    </div>
  );
};

export default MedicalDisclaimerModal;