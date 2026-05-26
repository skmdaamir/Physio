import React, { useEffect } from "react";

const DoctorDetailModal = ({ isOpen, onClose, member }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !member) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col md:flex-row max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full md:hidden"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Image Section */}
        <div className="md:w-2/5 h-72 md:h-auto shrink-0 relative">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: member.objectPosition || "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent md:hidden"></div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10 flex flex-col flex-1 overflow-y-auto">
          {/* Close Button Desktop */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors hidden md:flex"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="mb-6 pr-8">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              {member.name}
            </h3>
            <p className="text-[#135bec] font-bold uppercase tracking-wider text-sm">
              {member.role}
            </p>
          </div>

          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p className="font-bold text-slate-800">
              {member.mobileRole}
            </p>
            {member.desc ? (
              <p>{member.desc}</p>
            ) : (
              <p className="italic opacity-60">Full professional profile and specialization details are being updated.</p>
            )}
          </div>

          <div className="mt-8 md:mt-auto pt-6 border-t border-slate-100">
            <button 
              onClick={onClose}
              className="w-full md:w-auto px-8 py-3 bg-[#135bec] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailModal;