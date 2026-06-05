import React, { useEffect } from 'react';

const TermsOfService = ({ onNavigate }) => {
  useEffect(() => {
    document.title = "Terms of Service | Physio Pulse & Rehab";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 min-h-screen">
      <button 
        onClick={() => onNavigate('home')}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-[#135bec] transition-colors font-bold uppercase tracking-widest text-xs"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to Home
      </button>

      <h1 className="text-4xl font-black mb-8 text-slate-900 tracking-tight">Terms of Service</h1>
      
      <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">1. Acceptance of Terms</h2>
          <p>
            By utilizing the services, website, or facilities of Physio Pulse & Rehab, you agree to be bound by the following terms and conditions. These terms govern our professional relationship and your use of our rehabilitation resources.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">2. Medical Disclaimer</h2>
          <p>
            The information provided on this website and during consultations is for therapeutic and educational purposes. While our therapists are licensed professionals, outcomes depend on individual response to treatment. Our services are not a substitute for emergency medical care.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">3. Appointment Policy</h2>
          <p>
            We value our patients' time and request that you do the same. Cancellations or rescheduling requests must be made at least 24 hours in advance. Failure to provide notice may result in a standard cancellation fee. Arriving late may reduce your treatment duration to avoid affecting subsequent patients.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">4. Payment and Fees</h2>
          <p>
            Fees for physiotherapy sessions and home visits are due at the time of service unless otherwise arranged. We accept various payment methods. Detailed invoices for insurance claims can be provided upon request.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">5. Code of Conduct</h2>
          <p>
            We maintain a safe and respectful environment for all patients and staff. Any form of harassment, abuse, or unprofessional behavior will result in immediate termination of services without refund.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;