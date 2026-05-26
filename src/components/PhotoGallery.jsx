import React, { useEffect } from "react";

const PhotoGallery = ({ onNavigate }) => {
  const desktopFilters = [
    { name: "All Photos", icon: "grid_view", active: true },
    { name: "Facility", icon: "home_health", active: false },
    { name: "Equipment", icon: "fitness_center", active: false },
    { name: "Therapists", icon: "groups", active: false },
  ];

  const mobileFilters = [
    "All Photos",
    "Clinic Interior",
    "Treatment Rooms",
    "Rehab Gym",
    "Staff",
  ];

  const mobilePhotos = [
    { id: "35", title: "Reception", aspect: "aspect-[4/5]", colSpan: "" },
    { id: "36", title: "Consultation", aspect: "aspect-[4/5]", colSpan: "" },
    {
      id: "37",
      title: "Main Rehab Gym",
      aspect: "aspect-square",
      colSpan: "col-span-2",
    },
    { id: "38", title: "Equipment", aspect: "aspect-[4/5]", colSpan: "" },
    { id: "39", title: "Private Suite", aspect: "aspect-[4/5]", colSpan: "" },
    {
      id: "40",
      title: "Personal Training",
      aspect: "aspect-square",
      colSpan: "col-span-2",
    },
  ];

  const desktopPhotos = [
    {
      id: "41",
      tag: "Facility",
      title: "Main Reception Hall",
      desc: "Welcoming atmosphere for all patients.",
      aspect: "aspect-[4/5]",
    },
    {
      id: "42",
      tag: "Equipment",
      title: "High-Intensity Laser",
      desc: "Accelerated healing for chronic pain.",
      aspect: "aspect-square",
    },
    {
      id: "43",
      tag: "Team",
      title: "Guided Rehabilitation",
      desc: "One-on-one expert supervision.",
      aspect: "aspect-video",
    },
    {
      id: "44",
      tag: "Facility",
      title: "Mobility Zone",
      desc: "Spacious studio for group sessions.",
      aspect: "aspect-[3/4]",
    },
    {
      id: "45",
      tag: "Equipment",
      title: "Advanced Cryo Lab",
      desc: "Cold therapy for rapid inflammation reduction.",
      aspect: "aspect-[4/5]",
    },
    {
      id: "46",
      tag: "Team",
      title: "Expert Consultation",
      desc: "Precise diagnosis and treatment planning.",
      aspect: "aspect-square",
    },
  ];

  useEffect(() => {
    // Update SEO Metadata for Gallery Page
    document.title = "PhysioPulseRehab Gallery | Clinic & Treatments";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Browse our physiotherapy clinic gallery showcasing advanced equipment, treatment sessions, and a healing environment for better recovery.");
    }
  }, []);

  return (
    <div
      id="gallery"
      className="w-full bg-[#f6f6f8] text-slate-900 font-sans pb-24 md:pb-12"
    >
      {/* --- MOBILE ONLY: Header --- */}
      <div className="md:hidden bg-white border-b border-slate-200">
        <header className="relative flex items-center justify-center px-4 py-4">
          <button
            onClick={() => onNavigate("home")}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="font-bold text-lg">Photo Gallery</h2>
        </header>
      </div>
      {/* MOBILE ONLY: Scrollable Filters & Header */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto px-4 py-4 no-scrollbar">
          {mobileFilters.map((filter, index) => (
            <button
              key={index}
              className={`flex h-10 shrink-0 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${
                index === 0
                  ? "bg-[#135bec] text-white"
                  : "bg-white border border-[#135bec]/10 text-slate-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="px-4 pb-2">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Clinic Excellence
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Explore our world-class rehabilitation facilities.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-12">
        {/* DESKTOP ONLY: Hero Section & Filters */}
        <section className="hidden md:flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Our Professional <br />
              <span className="text-[#135bec]">Healing Environment</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Explore our state-of-the-art facilities designed for optimal
              recovery. From advanced hydrotherapy to personalized
              rehabilitation zones, witness where transformation happens.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {desktopFilters.map((filter, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                  filter.active
                    ? "bg-[#135bec] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#135bec]/50"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {filter.icon}
                </span>
                {filter.name}
              </button>
            ))}
          </div>
        </section>

        {/* MOBILE ONLY: Grid Gallery */}
        <section className="md:hidden grid grid-cols-2 gap-3">
          {mobilePhotos.map((photo) => (
            <div
              key={photo.id}
              className={`relative group overflow-hidden rounded-xl bg-slate-200 ${photo.aspect} ${photo.colSpan}`}
            >
              <div
                className="absolute inset-0 bg-center bg-cover transition-transform duration-300 group-active:scale-95"
                style={{
                  backgroundImage: `url('http://googleusercontent.com/profile/picture/${photo.id}')`,
                }}
              ></div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/90">
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* DESKTOP ONLY: Masonry Columns Gallery */}
        <section className="hidden md:block columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {desktopPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative group overflow-hidden rounded-xl bg-slate-100 break-inside-avoid shadow-sm"
            >
              <div
                className={`${photo.aspect} w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110`}
                style={{
                  backgroundImage: `url('http://googleusercontent.com/profile/picture/${photo.id}')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-[#135bec] mb-2 uppercase tracking-widest">
                  {photo.tag}
                </span>
                <h3 className="text-white text-xl font-bold">{photo.title}</h3>
                <p className="text-slate-300 text-sm mt-1">{photo.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* DESKTOP ONLY: Call To Action */}
        <section className="hidden md:block mt-24 mb-12 rounded-3xl bg-[#135bec] p-10 md:p-20 text-center overflow-hidden relative shadow-xl shadow-blue-500/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Ready to start your recovery journey?
            </h2>
            <p className="mt-6 text-white/80 text-lg md:text-xl">
              Experience our premium care firsthand. Book a tour of our facility
              or schedule your first assessment today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#bookappointment"
                onClick={(e) => { e.preventDefault(); onNavigate("bookappointment"); }}
                className="w-full sm:w-auto cursor-pointer px-10 py-4 bg-white text-[#135bec] font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl shadow-black/10"
              >
                Book Appointment
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}
                className="w-full sm:w-auto cursor-pointer px-10 py-4 bg-blue-600/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PhotoGallery;
