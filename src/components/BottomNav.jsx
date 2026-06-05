import React, { useState, useEffect } from 'react';

const BottomNav = ({ activeSection, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down and not at the very top
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
  };

  const aboutPageSections = ['about', 'team'];
  const isAboutPage = aboutPageSections.includes(activeSection);

  const homeNav = (
    <>
      <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`flex flex-col items-center gap-1 ${activeSection === 'home' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${activeSection === 'home' ? 'fill-1' : ''}`}>home</span>
        <span className={`text-[10px] ${activeSection === 'home' ? 'font-bold' : 'font-medium'}`}>Home</span>
      </a>
      <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className={`flex flex-col items-center gap-1 ${activeSection === 'services' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${activeSection === 'services' ? 'fill-1' : ''}`}>medical_services</span>
        <span className={`text-[10px] ${activeSection === 'services' ? 'font-bold' : 'font-medium'}`}>Services</span>
      </a>
      <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className={`flex flex-col items-center gap-1 ${activeSection === 'testimonials' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${activeSection === 'testimonials' ? 'fill-1' : ''}`}>reviews</span>
        <span className={`text-[10px] ${activeSection === 'testimonials' ? 'font-bold' : 'font-medium'}`}>Reviews</span>
      </a>
      <a href="#aboutus" onClick={(e) => handleNavClick(e, 'aboutus')} className={`flex flex-col items-center gap-1 ${activeSection === 'about' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${activeSection === 'about' ? 'fill-1' : ''}`}>info</span>
        <span className={`text-[10px] ${activeSection === 'about' ? 'font-bold' : 'font-medium'}`}>About Us</span>
      </a>
    </>
  );

  const aboutNav = (
    <>
      <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex flex-col items-center gap-1 text-slate-400">
        <span className="material-symbols-outlined">home</span>
        <span className="text-[10px] font-medium">Home</span>
      </a>
      <a href="#aboutus" onClick={(e) => handleNavClick(e, 'aboutus')} className={`flex flex-col items-center gap-1 ${activeSection === 'about' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${activeSection === 'about' ? 'fill-1' : ''}`}>info</span>
        <span className={`text-[10px] ${activeSection === 'about' ? 'font-bold' : 'font-medium'}`}>About</span>
      </a>
      <a href="#team" onClick={(e) => handleNavClick(e, 'team')} className={`flex flex-col items-center gap-1 ${activeSection === 'team' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${activeSection === 'team' ? 'fill-1' : ''}`}>groups</span>
        <span className={`text-[10px] ${activeSection === 'team' ? 'font-bold' : 'font-medium'}`}>Team</span>
      </a>
    </>
  );

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center px-4 py-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      {isAboutPage ? aboutNav : homeNav}
    </nav>
  );
};

export default BottomNav;