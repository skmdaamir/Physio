import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FloatingContact = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsCollapsed(true);
        setIsMenuOpen(false); // Auto-close menu on scroll down
      } else {
        setIsCollapsed(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Mobile number: +91 9167252926
  const phoneNumber = "919167252926";
  const message = encodeURIComponent("Hi Physio Pulse team, I'd like to know more about your physiotherapy services and schedule an assessment.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className={`fixed ${isHome && !isCollapsed ? 'bottom-24' : 'bottom-6'} md:bottom-8 right-6 flex flex-col gap-4 z-[900] transition-all duration-500`}>
      {!isCollapsed || isMenuOpen ? (
        <>
          {/* WhatsApp FAB */}
          <div className="relative group flex items-center justify-end animate-in fade-in slide-in-from-bottom-4 duration-300">
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-2xl hidden md:block">
              Chat on WhatsApp
            </span>
            <div className="absolute -inset-1 rounded-full bg-[#25D366] blur opacity-30 animate-pulse"></div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#20ba56] hover:scale-110 transition-all duration-300 group"
              aria-label="WhatsApp Us"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.13.57-.072 1.758-.47 2.009-1.25.25-.778.25-1.441.173-1.57-.077-.13-.272-.204-.57-.353zm-5.46 6.446h-.01c-1.127 0-2.233-.304-3.23-.88l-.23-.135-2.404.63.64-2.345-.149-.236a8.455 8.455 0 01-1.298-4.475c0-4.67 3.798-8.47 8.47-8.47 2.262 0 4.389.881 5.989 2.48s2.48 3.727 2.48 5.99c0 4.67-3.801 8.47-8.47 8.47zm10.51-18.91C20.45 0 18.232-.218 12.001 0a11.93 11.93 0 00-11.94 11.95c0 2.234.582 4.412 1.688 6.32L0 24l5.908-1.549a11.91 11.91 0 005.892 1.55c.002 0 .005 0 .007 0 6.63 0 12.01-5.38 12.01-12.01 0-3.212-1.25-6.232-3.52-8.52z" />
              </svg>
            </a>
          </div>

          {/* Call FAB */}
          <div className="relative group flex items-center justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-2xl hidden md:block">
              Call Us Now
            </span>
            <a
              href={callUrl}
              className="w-14 h-14 rounded-full bg-white text-[#135bec] flex items-center justify-center shadow-2xl border border-slate-100 hover:bg-slate-50 hover:scale-110 transition-all duration-300 group"
              aria-label="Call Us"
            >
              <span className="material-symbols-outlined text-3xl">call</span>
            </a>
          </div>

          {/* Close button for manual toggle in collapsed mode */}
          {isCollapsed && isMenuOpen && (
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-14 h-14 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-2xl animate-in zoom-in"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          )}
        </>
      ) : (
        /* Single Button Mode (Scrolling Down) */
        <button
          onClick={() => setIsMenuOpen(true)}
          className="w-14 h-14 rounded-full bg-[#135bec] text-white flex items-center justify-center shadow-2xl animate-in zoom-in duration-300 hover:scale-110 transition-transform active:scale-95"
          aria-label="Contact Us"
        >
          <span className="material-symbols-outlined text-3xl">contact_support</span>
        </button>
      )}
    </div>
  );
};

export default FloatingContact;