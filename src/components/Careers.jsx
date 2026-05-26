import React, { useEffect } from "react";

const Careers = ({ onNavigate }) => {
  const benefits = [
    {
      id: 1,
      mobileIcon: "trending_up",
      desktopIcon: "school",
      mobileTitle: "Growth & Mentorship",
      desktopTitle: "Professional Growth",
      mobileDesc:
        "Continuous learning and defined professional development paths for all clinicians.",
      desktopDesc:
        "Access to ongoing mentorship, structured career pathways, and generous CEU support for specialized certifications.",
    },
    {
      id: 2,
      mobileIcon: "event_available",
      desktopIcon: "balance",
      mobileTitle: "Flexible Schedules",
      desktopTitle: "Work-Life Balance",
      mobileDesc:
        "Work-life balance matters. We offer shifts that align with your lifestyle.",
      desktopDesc:
        "Flexible scheduling options, generous PTO, and a culture that values your mental and physical wellbeing above all.",
    },
    {
      id: 3,
      mobileIcon: "apartment",
      desktopIcon: "fitness_center",
      mobileTitle: "Modern Facilities",
      desktopTitle: "Modern Facilities",
      mobileDesc:
        "Work with cutting-edge equipment and the latest in rehab technology.",
      desktopDesc:
        "Work with state-of-the-art rehab equipment, digital health platforms, and bright, open-concept clinic spaces.",
    },
    {
      id: 4,
      desktopIcon: "payments",
      desktopTitle: "Competitive Pay",
      desktopDesc:
        "Above-market salaries, performance bonuses, comprehensive health insurance, and 401(k) matching programs.",
      desktopOnly: true,
    },
  ];

  const jobs = [
    {
      id: 1,
      mobileTitle: "Senior Physical Therapist",
      desktopTitle: "Senior Physiotherapist",
      mobileSub: "Full-time • Sports Rehabilitation",
      type: "Full-Time",
      dept: "Clinical Care",
      mobileLoc: "Downtown Hub",
      desktopLoc: "Downtown Clinic",
      mobilePay: "$85k - $105k",
      primaryMobileBtn: true,
    },
    {
      id: 2,
      mobileTitle: "Occupational Therapist",
      desktopTitle: "Sports Rehab Specialist",
      mobileSub: "Part-time • Pediatric Care",
      type: "Full-Time",
      dept: "Sports Medicine",
      mobileLoc: "Westside Clinic",
      desktopLoc: "North Branch",
      mobilePay: "$45 - $60 /hr",
      primaryMobileBtn: false,
    },
    {
      id: 3,
      mobileTitle: "Clinic Administrator",
      desktopTitle: "Front Desk Coordinator",
      mobileSub: "Full-time • Operations",
      type: "Part-Time",
      typeColor: "text-emerald-500 bg-emerald-500/10",
      dept: "Administration",
      mobileLoc: "Corporate Office",
      desktopLoc: "Downtown Clinic",
      mobilePay: "$55k - $65k",
      primaryMobileBtn: false,
    },
  ];

  useEffect(() => {
    // Update SEO Metadata for Careers Page
    document.title = "Careers at PhysioPulseRehab | Join Our Team";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Join our physiotherapy clinic team and grow your career in a supportive environment focused on patient care, learning, and professional success.");
    }
  }, []);

  return (
    <div className="w-full bg-[#f6f6f8] text-slate-900 font-sans pb-10 md:pb-0">
      {/* --- MOBILE ONLY: Custom Header --- */}
      <div className="md:hidden sticky top-0 z-50 flex items-center bg-white/90 backdrop-blur-md p-4 border-b border-slate-100 justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#135bec]/10 text-[#135bec]"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-base font-bold leading-tight flex-1 text-center px-2">
          Our Careers
        </h1>
        
      </div>

      {/* --- HERO SECTION --- */}
      {/* Mobile Hero */}
      <header className="md:hidden px-4 py-6">
        <div className="relative overflow-hidden rounded-xl bg-[#135bec]/10 aspect-[16/9] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#135bec]/40 to-transparent"></div>
          <div className="relative z-10 text-center px-4">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Join Our Team
            </h2>
            <p className="text-slate-700 text-sm max-w-xs mx-auto">
              Redefine rehabilitation and empower lives through expert physical
              therapy.
            </p>
          </div>
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVmXYgSQ1XReqSee359EAh54XwtxlQcblhJ9SH6EXnAJBWYPa-bEDK57443aWqYRNOZ-pSGT2dCqSDBsbKBTFsbOu_k0cRoOST0QPlxqpYH9DPdFjAfzG9e2uqwAqXBmGC2nLDrZ0Gvafv_YdBOW3HGJ_Wh7JMc3o3afEMvKi2pQUBbF6ktwC8Y_Its4GLqs4wethcJYglVTaL9Ixy51IYC51xeijGNaLpvEbvrlhDwIU0hQnI1WECkjWGY-_3Di6GkScxkd9a0EzM')`,
            }}
          ></div>
        </div>
      </header>

      {/* Desktop Hero */}
      <section className="hidden md:flex relative h-[600px] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVmXYgSQ1XReqSee359EAh54XwtxlQcblhJ9SH6EXnAJBWYPa-bEDK57443aWqYRNOZ-pSGT2dCqSDBsbKBTFsbOu_k0cRoOST0QPlxqpYH9DPdFjAfzG9e2uqwAqXBmGC2nLDrZ0Gvafv_YdBOW3HGJ_Wh7JMc3o3afEMvKi2pQUBbF6ktwC8Y_Its4GLqs4wethcJYglVTaL9Ixy51IYC51xeijGNaLpvEbvrlhDwIU0hQnI1WECkjWGY-_3Di6GkScxkd9a0EzM"
            alt="Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
            Join Our Team of Movement Experts
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-normal max-w-2xl mx-auto mb-10">
            Empowering lives through movement and expert care. Help us redefine
            rehabilitation and wellness.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-[#135bec] text-white px-8 py-4 rounded-lg text-base font-bold hover:scale-105 transition-transform">
              View Openings
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg text-base font-bold hover:bg-white/20 transition-all">
              Our Culture
            </button>
          </div>
        </div>
      </section>

      {/* --- WHY JOIN US --- */}
      <section className="px-4 py-8 md:py-24 md:bg-white">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div className="md:text-center mb-6 md:mb-16">
            <h2 className="text-xl md:text-4xl font-bold mb-1 md:mb-4">
              Why Join {<span className="md:hidden">Us</span>}
              {<span className="hidden md:inline">Physio Pulse?</span>}
            </h2>
            <p className="hidden md:block text-slate-600 max-w-2xl mx-auto">
              We invest in our people so they can invest in our patients. Here's
              what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`flex md:flex-col items-start gap-4 p-4 md:p-8 rounded-xl border border-slate-200 bg-white md:bg-slate-50 hover:border-[#135bec]/50 transition-colors group ${benefit.desktopOnly ? "hidden md:flex" : ""}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#135bec]/10 text-[#135bec] md:mb-2 md:group-hover:bg-[#135bec] md:group-hover:text-white transition-all">
                  <span className="material-symbols-outlined md:hidden">
                    {benefit.mobileIcon}
                  </span>
                  <span className="hidden md:block material-symbols-outlined">
                    {benefit.desktopIcon}
                  </span>
                </div>
                <div className="flex flex-col gap-1 md:gap-3">
                  <h3 className="font-bold text-base md:text-xl text-slate-900">
                    <span className="md:hidden">{benefit.mobileTitle}</span>
                    <span className="hidden md:block">
                      {benefit.desktopTitle}
                    </span>
                  </h3>
                  <p className="text-slate-500 md:text-slate-600 text-sm leading-relaxed">
                    <span className="md:hidden">{benefit.mobileDesc}</span>
                    <span className="hidden md:block">
                      {benefit.desktopDesc}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DESKTOP ONLY: OUR CULTURE --- */}
      <section className="hidden md:block py-24 bg-[#f6f6f8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Built on Collaboration
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                At Physio Pulse, we believe that the best results come from a
                unified approach. Our culture is defined by open communication,
                interdisciplinary collaboration, and a shared passion for seeing
                our patients thrive.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#135bec]">
                    check_circle
                  </span>
                  <span className="font-medium">
                    Monthly team-building events and socials
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#135bec]">
                    check_circle
                  </span>
                  <span className="font-medium">
                    Shared clinical rounds and knowledge sharing
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#135bec]">
                    check_circle
                  </span>
                  <span className="font-medium">
                    Supportive environment for new graduates
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAxoSvW1PA3RNk7LkdDbo_t-BenB99INlb01Qk72_vOCB08wtQ8U8gNS9HfZHiZcFcNxzfr-tnQJREPNhKp2vWe9XYSpX9ntGmiJJ4n4v2yLxzQZmsRaRxlNCrApUr2svbZ8ovoywYaPvBr873fgfAyXW2WeQGP-K4Ak9bzCDIPY8Y4Vy4d2ifvjkA2WXhlMNKhH6VPG9PIW0HcOGRB_UdQ99CrKsW2IZxAPYyuGm6-FacbUjJmcU66glMa2H7KSg-Re2KsPBfjomY"
                  alt="Team"
                  className="rounded-xl w-full h-64 object-cover shadow-sm"
                />
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3iKcIC_qR8MFvd_daI8ufBowVNxK1E3WdLkJNWh4ca6koEXL8EB91W4DKCeG8tujEfDNsUgph2mxmJWyTeqpDItEhMN-2rBY081hoFVvehuRrdMN5A3p1wgrCo5oUIWrAcvstPPOuuvhEXJW9vA8yu3tGlkaf5SCpU0hrDrNTLBhm560O3lh-7IMMfe-XinR_EPRJ7pzaUVswzSCW3fJxYRiVF5t-RCetzQ1OetocXl4YHiHbcHBCHxplOW8r5hIcIkCOjf6PQ9aX"
                  alt="Culture"
                  className="rounded-xl w-full h-48 object-cover shadow-sm"
                />
              </div>
              <div className="pt-8 space-y-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfcQJHHvY2Gr6p-MrfhVSXQFY6EaquOj2zbryYu10_Z5MbBpnMagLCTdCUSQTAC74c0Biu0X4UTACQeTYy7tDl_TaWp3Bl2eh2dA-032C7zgjvhA7S5cf8l909GcKuMGp8zu9Op6Aj9HWZRUxGbOrc7CSuFnemT0lUaccDIK8tDEkLCcMm3P_UInxBdssWpCRwDwSSxuvFd6CaOtE8OC_wyA7hI9GNDqOVGP32hMh4J8SMjwVBMicGIAm8k3MdhZc3yhBIrxzZ-Uld"
                  alt="Meeting"
                  className="rounded-xl w-full h-48 object-cover shadow-sm"
                />
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA12oa3Ca9IlYyDszi_OPq9jt2_t5BPOKOxk4eJC89YZsdrwNo8yYHC7KTUE0gPWk_CLaW5-Wo9kH5akGFW0TsqNrH-xfqA8I2w3-NOSDV1RmTxY-1Qx_1fMwcubCyLaQMekpghpc3zbM6Fc2PW4D2wVs9xl1PkxhFvDpNpnt1DzzQDtOhVKxmj6Xfz0_N9ij_Wu0ZjimxillWbV5kAkh1J9T99jRzFOqp678oTXaX32PSp-eAe07slcb45Qq3bjr7pNW2g4MF_j9Sa"
                  alt="Therapy"
                  className="rounded-xl w-full h-64 object-cover shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OPEN POSITIONS --- */}
      <section className="px-4 py-8 md:py-24 bg-white rounded-t-3xl md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.03)] md:shadow-none">
        <div className="max-w-5xl mx-auto md:px-6 lg:px-8">
          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-12">
            <div className="flex items-center justify-between md:block">
              <h2 className="text-xl md:text-3xl font-bold text-slate-900 md:mb-4">
                Open Positions
              </h2>
              <span className="md:hidden text-xs font-semibold px-2 py-1 bg-[#135bec]/10 text-[#135bec] rounded-full">
                4 Roles
              </span>
              <p className="hidden md:block text-slate-600">
                Join us in making a difference in our community.
              </p>
            </div>
            {/* Desktop Filters */}
            <div className="hidden md:flex flex-row gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search roles..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-[#f6f6f8] focus:ring-2 focus:ring-[#135bec] outline-none w-64"
                />
              </div>
              <select className="px-4 py-2 border border-slate-200 rounded-lg bg-[#f6f6f8] focus:ring-2 focus:ring-[#135bec] outline-none">
                <option>All Locations</option>
                <option>Downtown Clinic</option>
                <option>North Branch</option>
              </select>
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 md:p-6 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-start md:w-full">
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base md:text-xl font-bold text-slate-900 md:group-hover:text-[#135bec] transition-colors">
                        <span className="md:hidden">{job.mobileTitle}</span>
                        <span className="hidden md:block">
                          {job.desktopTitle}
                        </span>
                      </h3>
                      {/* Desktop Badge */}
                      <span
                        className={`hidden md:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${job.typeColor || "bg-[#135bec]/10 text-[#135bec]"}`}
                      >
                        {job.type}
                      </span>
                    </div>
                    {/* Mobile Subtitle */}
                    <p className="md:hidden text-slate-500 text-xs">
                      {job.mobileSub}
                    </p>

                    {/* Common Meta Details */}
                    <div className="flex items-center gap-4 text-slate-500 text-xs md:text-sm mt-2 md:mt-0">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <span className="md:hidden">{job.mobileLoc}</span>
                        <span className="hidden md:block">
                          {job.desktopLoc}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm md:hidden">
                          payments
                        </span>
                        <span className="material-symbols-outlined text-sm hidden md:block">
                          clinical_notes
                        </span>
                        <span className="md:hidden">{job.mobilePay}</span>
                        <span className="hidden md:block">{job.dept}</span>
                      </div>
                    </div>
                  </div>
                  {/* Mobile Active Tag */}
                  <span className="md:hidden text-xs font-medium text-[#135bec]">
                    Active
                  </span>
                </div>

                {/* Call to Action Button */}
                <button
                  className={`mt-2 md:mt-0 py-2.5 md:py-2 px-6 rounded-lg text-sm font-bold transition-all whitespace-nowrap active:scale-95 md:hover:bg-blue-700 w-full md:w-auto ${
                    job.primaryMobileBtn
                      ? "bg-[#135bec] text-white"
                      : "bg-[#135bec]/10 text-[#135bec] md:bg-[#135bec] md:text-white"
                  }`}
                >
                  <span className="md:hidden">View Position</span>
                  <span className="hidden md:block">View Details</span>
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Only: See All Button */}
          <button className="md:hidden w-full mt-6 py-3 text-slate-500 text-sm font-medium border-2 border-dashed border-slate-200 rounded-xl">
            See All Openings
          </button>
        </div>
      </section>

      {/* --- DESKTOP ONLY: CTA SECTION --- */}
      <section className="hidden md:block py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#135bec] rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0 100 C 20 0 50 0 100 100 Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4">Don't see a fit?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                We're always looking for talented individuals to join our
                mission. Send us your CV and tell us how you can contribute.
              </p>
              <button className="bg-white text-[#135bec] px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center gap-2 mx-auto shadow-lg">
                <span className="material-symbols-outlined">upload_file</span>
                Send Us Your CV
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
