import React, { useState, useEffect, useRef } from "react";

const DoctorCard = ({ member, onClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we stop observing to keep the card visible
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the card is visible

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div 
      ref={domRef}
      onClick={() => onClick(member)}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
      className={`w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 cursor-pointer group transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="h-80 md:h-64 overflow-hidden bg-slate-200">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          style={{ objectPosition: member.objectPosition || "center" }}
        />
      </div>
      <div className="p-3 md:p-6">
        <h3 className="text-slate-900 font-bold md:text-xl">
          {member.name}
        </h3>
        <p className="text-[#135bec] font-medium text-xs md:text-sm mb-1 md:mb-3 uppercase md:tracking-wide">
          <span className="md:hidden">{member.mobileRole}</span>
          <span className="hidden md:block">{member.role}</span>
        </p>
        <p className="hidden md:block text-slate-600 text-sm leading-relaxed mb-4">
          {member.desc}
        </p>
        <div className="hidden md:flex gap-3">
          <button className="text-slate-400 hover:text-[#135bec] transition-colors">
            <span className="material-symbols-outlined text-lg">
              share
            </span>
          </button>
          <button className="text-slate-400 hover:text-[#135bec] transition-colors">
            <span className="material-symbols-outlined text-lg">
              mail
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;