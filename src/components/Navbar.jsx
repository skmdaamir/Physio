import React, { useState } from 'react';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'About Us', 'Blog', 'Gallery', 'Career'];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
    // Always close the menu after a navigation click.
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex cursor-pointer items-center gap-2 text-primary"
        >
          <span className="text-3xl font-bold">P+</span>
          <h2 className="text-slate-900 text-xl font-black tracking-tight">Physio Pulse</h2>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const sectionId = item.toLowerCase().replace(/\s/g, '');
            return (
              <a
                key={item}
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(e, sectionId)}
                className="text-sm font-semibold hover:text-primary transition-colors">
                {item}
              </a>
            );
          })}
        </nav>

        <a
          href="#bookappointment"
          onClick={(e) => handleNavClick(e, 'bookappointment')}
          className="hidden cursor-pointer md:block bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all">
          Book Appointment
        </a>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => {
            const sectionId = item.toLowerCase().replace(/\s/g, '');
            return (
              <a
                key={item}
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(e, sectionId)}
                className="font-bold">{item}</a>
            );
          })}
          <a
            href="#bookappointment"
            onClick={(e) => handleNavClick(e, 'bookappointment')}
            className="bg-primary text-white py-3 rounded-lg font-bold text-center">Book Appointment
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;