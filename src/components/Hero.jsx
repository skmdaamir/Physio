import { forwardRef } from 'react';

const Hero = forwardRef(({ onNavigate }, ref) => {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative px-6 py-12 lg:px-10 lg:py-20 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              Welcome to the Future of Rehab
            </span>
            <h1 className="text-4xl font-black leading-tight tracking-tight lg:text-6xl text-slate-900">
              Welcome to{" "}
              <a href="https://surl.li/gcflij" target="_blank" rel="noopener noreferrer" className="text-[#135bec] hover:underline">
                Physio Pulse & Rehabilitation
              </a>
            </h1>
            <h5 className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed">
              – where every step brings you closer to healing, strength, and a healthier tomorrow.
            </h5>
            <p className="text-lg text-slate-600 max-w-xl">
              Experience world-class rehabilitation with personalized care plans
              designed for your unique journey to wellness.
            </p>
            <div className="mt-4 flex items-center gap-2 text-slate-500">
              <span className="material-symbols-outlined text-lg">
                location_on
              </span>
              <p className="text-sm font-medium">
                Now serving:{" "}
                <span className="font-bold text-slate-700">
                  Thane, Navi Mumbai, Mumbai, Delhi & Lucknow
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#bookappointment"
              onClick={(e) => handleNavClick(e, "bookappointment")}
              className="cursor-pointer bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services")}
              className="cursor-pointer bg-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-300 transition-all"
            >
              View Services
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtyDQ9tDK05CudsB8ExSNk0p2wX0SryGZtXfzoSPuD4ZoxPLf9PgwUz38XViEAXZpN1dtvwODF7Ife3hTIF84G3U0C-g73PpVFybZLieMqPUQHfcInSI45fLS3n4nWLYmpGzjn9iX4r0VLHCE2pi6d14_TgO5VOn8mdfzEl69KguQ3zTREh48_e7NKSTzfWIzWhT164W3QwOhvguoNOFhZ6h7ZvJgEnxZNfpn9G-3X-UPL72-8tiqPiGvqfXApilBsNXBdlLGZJEGw"
            alt="Clinic"
            className="relative rounded-3xl shadow-2xl w-full object-cover aspect-video"
          />
        </div>
      </div>
    </section>
  );
});

export default Hero;