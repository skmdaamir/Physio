import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import BookingSuccessModal from "./BookingSuccessModal";
import Toast from "./Toast";

const BookAppointment = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("physio");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
    conditions: "",
  });

  useEffect(() => {
    // Update SEO Metadata for Appointment Page
    document.title = "Book Appointment | PhysioPulseRehab Clinic";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Book your appointment at our physiotherapy clinic for personalized care, expert treatment, and faster recovery with trusted professionals.");
    }
  });

  const services = [
    {
      id: "physio",
      title: "General Physiotherapy",
      mobileTitle: "Physiotherapy",
      duration: "45 Mins",
      icon: "physical_therapy",
    },
    {
      id: "sports",
      title: "Sports Rehab",
      mobileTitle: "Sports Rehab",
      duration: "60 Mins",
      icon: "sports_gymnastics",
    },
    {
      id: "manual",
      title: "Manual Therapy",
      mobileTitle: "Massage",
      duration: "30 Mins",
      icon: "back_hand",
    },
    {
      id: "postop",
      title: "Post-Op Recovery",
      mobileTitle: "Acupuncture",
      duration: "60 Mins",
      icon: "medical_services",
    },
  ];

  const handleInputChange = (e) => {
    if (toast?.type === "error") setToast(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    setToast(null);
    if (!formData.name || !formData.phone || !formData.place) {
      setToast({ message: "Please fill in all required fields.", type: "error" });
      return;
    }

    setLoading(true);
    const treatmentType = services.find((s) => s.id === selectedService)?.title;
    try {
      const response = await axios.post(`${API_BASE_URL}/appointments`, { ...formData, treatment_type: treatmentType });
      
      if (response.status === 201) {
        setToast({ message: "Your appointment has been requested successfully!", type: "success" });
        setFormData({ name: "", phone: "", place: "", conditions: "" });
      }
    } catch (error) {
      if (error.response?.status === 500) {
        setToast({ message: "Internal Server Error (500). Please try again later.", type: "error" });
      } else {
        setToast({ message: error.response?.data?.message || "Something went wrong while booking.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="bookappointment"
      className="min-h-screen bg-white md:bg-[#f6f6f8] md:pb-12 text-slate-900 font-sans relative"
    >
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      {/* --- MOBILE ONLY: Header & Progress --- */}
      <div className="md:hidden sticky top-0 bg-white z-40 border-b border-slate-100">
        <header className="relative flex items-center justify-center px-4 py-4">
          <button
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                onNavigate("home");
              }
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2"
          >
            <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span>
          </button>
          <h2 className="font-bold text-lg">{step === 1 ? "Select Treatment" : "Patient Details"}</h2>
        </header>
      </div>

      <main className="max-w-7xl mx-auto w-full px-6 md:px-10 py-2 md:py-12">
        {/* --- MOBILE ONLY: Service Area Notice --- */}
        <div className="md:hidden my-4 p-4 rounded-xl bg-blue-500/10 text-blue-800 flex items-start gap-3 text-sm">
          <span className="material-symbols-outlined mt-0.5 text-lg">info</span>
          <div>
            <p>
              We are currently accepting patients from{" "}
              <span className="font-semibold">
                Thane, Mumbai, Navi Mumbai, Delhi and Lucknow
              </span>
              .
            </p>
          </div>
        </div>

        {/* --- DESKTOP ONLY: Page Header --- */}
        <div className="hidden md:block mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Schedule Your Recovery
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Select your preferred service, date, and time. Our certified
            professionals are ready to help you reach your physical goals.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 flex items-start gap-3">
            <span className="material-symbols-outlined mt-0.5">info</span>
            <div>
              <h4 className="font-bold">Service Area Notice</h4>
              <p className="text-sm">
                We are currently accepting patients from{" "}
                <span className="font-semibold">
                  Navi Mumbai, Mumbai, Thane, Delhi and Lucknow
                </span>{" "}
                only.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT COLUMN: Booking Steps */}
          <div className="lg:col-span-2 space-y-8 md:space-y-8">
            {step === 1 ? (
              /* STEP 1: Service Selection */
            <section className="bg-white md:p-6 md:rounded-xl md:border border-slate-200 md:shadow-sm">
              {/* Desktop Header */}
              <div className="hidden md:flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h3 className="text-xl font-bold">Choose a Service</h3>
              </div>
              {/* Mobile Header */}
              <label className="md:hidden flex items-center gap-2 text-sm font-bold mb-4">
                <span className="material-symbols-outlined text-[#135bec] text-xl">
                  medical_services
                </span>
                Select Treatment
              </label>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {services.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedService(srv.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all flex flex-col md:flex-row md:items-start md:gap-4 items-center justify-center text-center md:text-left ${
                      selectedService === srv.id
                        ? "border-[#135bec] bg-[#135bec]/5 text-[#135bec]"
                        : "border-slate-100 bg-slate-50 md:bg-white hover:border-[#135bec]/50 text-slate-700"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 mb-2 md:mb-0 ${
                        selectedService === srv.id
                          ? "text-[#135bec]"
                          : "text-slate-500 md:bg-slate-100 md:text-[#135bec]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-3xl md:text-2xl">
                        {srv.icon}
                      </span>
                    </div>
                    <div className="md:mt-1">
                      <p className="font-bold text-xs md:text-sm md:text-slate-900">
                        {/* Show diff titles based on breakpoint if needed, but keeping text consistent helps */}
                        <span className="md:hidden">{srv.mobileTitle}</span>
                        <span className="hidden md:block">{srv.title}</span>
                      </p>
                      <p className="hidden md:block text-xs text-slate-500 mt-1 text-center">
                        {srv.duration}
                      </p>
                    </div>
                    {/* Desktop Checkmark */}
                    {selectedService === srv.id && (
                      <div className="hidden md:block absolute top-4 right-4 text-[#135bec]">
                        <span className="material-symbols-outlined text-sm">
                          check_circle
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="w-full md:w-auto bg-[#135bec] text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  Next Step
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </section>
            ) : (
              /* STEP 2: Patient Information */
            <section className="bg-white md:p-6 md:rounded-xl md:border border-slate-200 md:shadow-sm">
              {/* Desktop Header */}
              <div className="hidden md:flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h3 className="text-xl font-bold">Patient Information</h3>
              </div>
              {/* Mobile Header */}
              <label className="md:hidden flex items-center gap-2 text-sm font-bold mb-4">
                <span className="material-symbols-outlined text-[#135bec] text-xl">
                  person_edit
                </span>
                Patient Details
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="hidden md:block text-xs font-bold text-slate-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full h-12 md:h-10 px-4 rounded-xl md:rounded-lg border border-slate-200 bg-slate-50 md:bg-white text-sm focus:border-[#135bec] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="hidden md:block text-xs font-bold text-slate-600">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile"
                    className="w-full h-12 md:h-10 px-4 rounded-xl md:rounded-lg border border-slate-200 bg-slate-50 md:bg-white text-sm focus:border-[#135bec] outline-none"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="hidden md:block text-xs font-bold text-slate-600">
                    Place / City
                  </label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                    placeholder="e.g. Navi Mumbai"
                    className="w-full h-12 md:h-10 px-4 rounded-xl md:rounded-lg border border-slate-200 bg-slate-50 md:bg-white text-sm focus:border-[#135bec] outline-none"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="hidden md:block text-xs font-bold text-slate-600">
                    Brief description of conditions
                  </label>
                  <textarea
                    rows="3"
                    name="conditions"
                    value={formData.conditions}
                    onChange={handleInputChange}
                    placeholder="Describe your symptoms or injury..."
                    className="w-full p-4 md:p-3 rounded-xl md:rounded-lg border border-slate-200 bg-slate-50 md:bg-white text-sm focus:border-[#135bec] outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="hidden md:block px-8 py-3 rounded-lg font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleBooking}
                  disabled={loading}
                  className="flex-1 bg-[#135bec] text-white font-bold py-4 md:py-3 rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm & Book Appointment"}
                </button>
              </div>
            </section>
            )}
          </div>

          {/* RIGHT COLUMN: Desktop Sidebar Summary */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden sticky top-28">
              <div className="bg-[#135bec] p-6 text-white">
                <h3 className="font-bold text-lg">Booking Summary</h3>
                <p className="text-white/80 text-xs">
                  Review your appointment details
                </p>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#135bec] text-xl">
                        physical_therapy
                      </span>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                          Service
                        </p>
                        <p className="font-bold">{services.find(s => s.id === selectedService)?.title}</p>
                      </div>
                    </div>
                    {step === 2 && (
                      <button 
                        onClick={() => setStep(1)}
                        className="text-[#135bec] text-xs font-bold hover:underline underline-offset-4 mt-1 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {formData.name && (
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#135bec] text-xl">
                        person
                      </span>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                          Patient
                        </p>
                        <p className="font-bold">{formData.name}</p>
                      </div>
                    </div>
                  )}
                  {formData.place && (
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#135bec] text-xl">
                        location_on
                      </span>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                          Location
                        </p>
                        <p className="font-bold">{formData.place}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-px bg-slate-100"></div>

                <div className="space-y-3">
                  <button 
                    onClick={step === 1 ? () => setStep(2) : handleBooking}
                    disabled={loading}
                    className="w-full bg-[#135bec] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {step === 1 ? "Next Step" : loading ? "Booking..." : "Confirm Appointment"}
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 px-4">
                    By booking, you agree to our 24-hour cancellation policy.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#135bec]/5 rounded-xl border border-[#135bec]/10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#135bec]">
                  security
                </span>
                <span className="text-xs font-bold text-slate-700">
                  HIPAA Compliant Booking
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#135bec]">
                  verified
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Certified Physiotherapists
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <BookingSuccessModal
        isOpen={toast?.type === 'success'}
        onClose={() => setToast(null)} // Allow closing the modal
        onNavigateHome={() => onNavigate('home')}
      />
    </div>
  );
};

export default BookAppointment;
