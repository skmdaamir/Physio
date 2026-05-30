import React, { forwardRef, useState } from "react";
import DoctorCard from "./DoctorCard";
import DoctorDetailModal from "./DoctorDetailModal";

// Import your actual doctor images here. Filenames should match the doctor's name.
import drKamran from "../assets/doctor/Dr Kamran.jpg";
import drLaiba from "../assets/doctor/Dr Laiba Yusuf khan.jpg";
import drShoeb from "../assets/doctor/Dr Mohd Shoeb.jpg";
import drMoh from "../assets/doctor/Dr Mohseneen Akhtar.jpg";
import drPratibha from "../assets/doctor/Dr Pratibha Singh.jpg";
import drYasmeen from "../assets/doctor/Dr Yasmeen Manihar.jpg";

const AboutUs = forwardRef(({ teamRef, onNavigate }, ref) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const team = [
    {
      id: "1",
      name: "Dr Kamran Hameed [PT]",
      role: "[BPT, MPT, MIAP, CSMT, CCT, CDNT, CKTT]",
      mobileRole: "Consulting Physiotherapist Specialized in Rehab",
      desc: "Over 3+ years of experience in physiotherapy.",
      image: drKamran,
      objectPosition: "top",
    },
    {
      id: "2",
      name: "Dr Laiba Yusuf Khan [PT]",
      role: "[BPT, MIAP, CDNS, CRCT, IASTM]",
      mobileRole: "Physiotherapist Specialized in Specialized Rehab",
      desc: "Specialized in Clinical Dry Needling (CDNS), Kinesio Taping (CRCT), and Instrument Assisted Soft Tissue Mobilization (IASTM) for advanced rehabilitation.",
      image: drLaiba,
      objectPosition: "top",
    },
    {
      id: "3",
      name: "Dr Shoeb [PT]",
      role: "[BPT, MPT, MIAP, CCT, CMOT, CSMT, CVRT, CIASTM]",
      mobileRole: "Specialized in MSK & Sports Injuries",
      desc: "Over 10+ years of experience in MSK & Sports Injuries.",
      image: drShoeb,
      objectPosition: "top",
    },
    {
      id: "4",
      name: "Dr Mohseneen Akhtar [PT]",
      role: "[BPT, MPT, MIAP CNDT, CKTP, CAOM]",
      mobileRole:
        "Specialised in Musculoskeletal & Orthopaedic Gleneagles Hospital Mumbai, Ex Fortis Hospital Mulund.",
      desc: "Over 3+ years of experience in Musculoskeletal & Orthopaedic Injuries..",
      image: drMoh,
      objectPosition: "top",
    },
    {
      id: "5",
      name: "Dr Pratibha Singh [PT]",
      role: "[BPT, MIAP]",
      mobileRole:
        "Neuro and Orthopedic Specialist and Ex.Physio Fortis Hospital Mulund",
      desc: "Specialize in Neuro and Orthopedic injuries.",
      image: drPratibha,
      objectPosition: "top",
    },
    {
      id: "6",
      name: "Dr Yasmeen Manihar [PT]",
      role: "[BPT]",
      mobileRole: "Physiotherapist",
      desc: "",
      image: drYasmeen,
      objectPosition: "top",
    },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    onNavigate(id);
  };

  const handleDoctorClick = (member) => {
    setSelectedDoctor(member);
    setIsModalOpen(true);
  };

  return (
    <div id="aboutus" className="w-full bg-[#f6f6f8]" ref={ref}>
      {/* 1. Hero Section */}
      <section className="px-4 md:px-10 lg:px-20 xl:px-32 pt-4 md:pt-10 pb-6 relative">
        <div
          className="relative rounded-xl md:rounded-2xl overflow-hidden min-h-[220px] md:min-h-[360px] flex flex-col justify-end shadow-xl bg-cover bg-center group"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200')`,
          }}
        >
          {/* Mobile Gradient (Blue tinted) */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#135bec]/90 via-[#135bec]/30 to-transparent"></div>
          {/* Desktop Gradient (Dark tinted) */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#101622]/90 via-[#101622]/30 to-transparent transition-transform duration-700 group-hover:scale-105"></div>

          <div className="relative p-5 md:p-12 max-w-2xl z-10">
            {/* Mobile Text */}
            <div className="md:hidden">
              <span className="text-white/80 text-sm font-medium mb-1 uppercase tracking-widest block">
                Est. 2012
              </span>
              <p className="text-white tracking-tight text-3xl font-bold leading-tight">
                Physio Pulse & Rehab
              </p>
            </div>
            {/* Desktop Text */}
            <div className="hidden md:block">
              <span className="inline-block px-3 py-1 bg-[#135bec] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                Established 2012
              </span>
              <h2 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Empowering your movement through expert care.
              </h2>
              <p className="text-slate-200 text-lg leading-relaxed">
                Dedicated to restoring health and optimizing performance for
                every patient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Section (Mission, Story & Values) */}
      <section className="px-4 md:px-10 lg:px-20 xl:px-32 py-6 md:py-12">
        {/* Mobile Layout: Story & Values */}
        <div className="md:hidden space-y-8">
          <div>
            <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight mb-3">
              About Physio Pulse
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              Physio Pulse has a mission to heal lives with the help of
              professional physiotherapy and complete wellness services. We
              believe that people can recover, get strong and flourish, no
              matter whether they are going through the process of overcoming
              the injury, living with chronic pain or improving their athletic
              performance.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              Established with a love for movement and curing, we offer
              evidence-based interventions and customized care provided by a
              team of certified professionals in a friendly and supportive
              atmosphere.
            </p>
            <p className="text-slate-900 text-base font-bold italic border-l-4 border-[#135bec] pl-4 py-2 bg-[#135bec]/5 rounded-r-lg">
              "Physio pulse is all about your recovery, it is our pulse, and we
              focus on your wellness."
            </p>
          </div>

          <div>
            <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight mb-4">
              Vision & Mission
            </h2>
            <div className="space-y-3">
              {[
                "Give evidence-based and individualized physiotherapy.",
                "Thorough wellness: Long-term recovery and sustainable wellness.",
                "Make use of contemporary methods and technology to improve.",
                "Found a healing atmosphere of compassion and trust.",
                "Empower the patients with education and prevention.",
                "Work with other healthcare specialists in order to treat holistically.",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100"
                >
                  <span className="text-[#135bec] text-xs mt-1">✨</span>
                  <p className="text-sm text-slate-700 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout: Mission & Story Side-by-Side */}
        <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#135bec]">
              <span className="material-symbols-outlined text-3xl">flag</span>
              <h2 className="text-slate-900 text-2xl font-bold tracking-tight">
                Vision & Mission
              </h2>
            </div>
            <ul className="space-y-4">
              {[
                "Give evidence-based and individualized physiotherapy.",
                "Thorough wellness: Long-term recovery and sustainable wellness.",
                "Make use of contemporary methods and technology to improve.",
                "Found a healing atmosphere of compassion and trust.",
                "Empower the patients with education and prevention.",
                "Work with other healthcare specialists in order to treat holistically.",
              ].map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-600 group"
                >
                  <span className="text-[#135bec] text-xl group-hover:scale-125 transition-transform">
                    ✨
                  </span>
                  <span className="text-lg leading-snug">{point}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#135bec]/5 border border-[#135bec]/10">
                <span className="text-[#135bec] font-bold text-2xl">15+</span>
                <p className="text-slate-500 text-sm">Years of Experience</p>
              </div>
              <div className="p-4 rounded-lg bg-[#135bec]/5 border border-[#135bec]/10">
                <span className="text-[#135bec] font-bold text-2xl">10k+</span>
                <p className="text-slate-500 text-sm">Patients Healed</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#135bec]">
              <span className="material-symbols-outlined text-3xl">info</span>
              <h2 className="text-slate-900 text-2xl font-bold tracking-tight">
                About Physio Pulse
              </h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">
              Physio Pulse has a mission to heal lives with the help of
              professional physiotherapy and complete wellness services. We
              believe that people can recover, get strong and flourish, no
              matter whether they are going through the process of overcoming
              the injury, living with chronic pain or improving their athletic
              performance.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We deal with a variety of services such as manual treatment,
              rehabilitation, posture therapy, sports physiotherapy, and injury
              prevention programs. We customize your treatment plans based on
              your individual needs and objectives with the help of the newest
              techniques and technologies.
            </p>
            <p className="text-slate-900 text-xl font-black italic border-l-4 border-[#135bec] pl-4 py-2 bg-[#135bec]/5 rounded-r-lg">
              "Physio pulse is all about your recovery, it is our pulse, and we
              focus on your wellness."
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="px-4 md:px-10 lg:px-20 xl:px-32 py-6 md:py-12">
        <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm text-center">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Our Service Areas
          </h3>
          <p className="text-slate-600 mb-4 max-w-2xl mx-auto">
            We are proud to offer our expert physiotherapy services to patients
            in the following cities:
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2">
            {[
              { name: "Navi Mumbai", slug: "physiotherapy-clinic-navi-mumbai" },
              { name: "Mumbai", slug: "physiotherapy-at-home-mumbai" },
              { name: "Thane", slug: "physiotherapy-at-home-thane" },
              { name: "Delhi", slug: "physiotherapy-at-home-delhi" },
              { name: "Lucknow", slug: "physiotherapy-clinic-lucknow" },
            ].map((city) => (
              <button
                key={city.slug}
                onClick={() => onNavigate(city.slug)}
                className="font-semibold text-primary hover:text-[#135bec] hover:underline transition-all"
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Meet the Team Section */}
      <section
        ref={teamRef}
        id="team"
        className="bg-slate-100/50 md:bg-slate-100 py-8 md:py-20 overflow-hidden"
      >
        <div className="px-4 md:px-10 lg:px-20 xl:px-32 mb-6 md:mb-16">
          {/* Mobile Header */}
          <div className="md:hidden flex justify-between items-end">
            <div>
              <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight">
                Meet the Team
              </h2>
              <p className="text-slate-500 text-sm">
                Expert therapists at your service
              </p>
            </div>
            <a className="text-[#135bec] font-semibold text-sm" href="#">
              View All
            </a>
          </div>
          {/* Desktop Header */}
          <div className="hidden md:block text-center max-w-3xl mx-auto">
            <h2 className="text-slate-900 text-3xl font-extrabold mb-4">
              Meet Our Specialist Team
            </h2>
            <div className="w-16 h-1 bg-[#135bec] mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg">
              Our team of licensed therapists brings diverse expertise and a
              shared commitment to your recovery journey.
            </p>
          </div>
        </div>

        {/* Team Grid / Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 md:px-10 lg:px-20 xl:px-32">
          {team.map((member, index) => (
            <DoctorCard
              key={member.id}
              member={member}
              index={index}
              onClick={handleDoctorClick}
            />
          ))}
        </div>
      </section>

      <DoctorDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={selectedDoctor}
      />

      {/* 4. Call to Action Section */}
      <section className="px-4 md:px-10 lg:px-20 xl:px-32 py-6 md:py-24">
        {/* Mobile CTA */}
        <div className="md:hidden bg-[#135bec] rounded-2xl p-6 text-center shadow-lg shadow-blue-500/20">
          <h3 className="text-white text-xl font-bold mb-2">
            Ready to start your journey?
          </h3>
          <p className="text-white/80 text-sm mb-6">
            Book your initial assessment today and take the first step towards
            pain-free living.
          </p>
          <a
            href="#bookappointment"
            onClick={(e) => handleNavClick(e, "bookappointment")}
            className="w-full block cursor-pointer bg-white text-[#135bec] py-3 rounded-xl font-bold active:scale-95 transition-transform"
          >
            Book Appointment Now
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block relative bg-[#135bec] rounded-2xl p-10 lg:p-16 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-6">
              Ready to start your recovery?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Book your initial consultation today and take the first step
              towards a pain-free life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#bookappointment"
                onClick={(e) => handleNavClick(e, "bookappointment")}
                className="cursor-pointer bg-white text-[#135bec] font-bold px-8 py-4 rounded-lg hover:bg-slate-50 transition-colors shadow-lg shadow-black/10"
              >
                Schedule Appointment
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="cursor-pointer bg-[#135bec] border border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Our Clinic
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default AboutUs;
