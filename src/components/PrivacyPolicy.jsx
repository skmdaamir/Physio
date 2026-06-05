import React, { useEffect } from 'react';

const PrivacyPolicy = ({ onNavigate }) => {
  useEffect(() => {
    document.title = "Privacy Policy | Physio Pulse & Rehab";
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

      <h1 className="text-4xl font-black mb-8 text-slate-900 tracking-tight">Privacy Policy</h1>
      
      <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">1. Commitment to Privacy</h2>
          <p>
            At Physio Pulse & Rehab, we recognize that your privacy is of utmost importance, especially concerning your personal health information. This policy outlines our procedures for collecting, using, and safeguarding the data you share with us through our clinical practices and digital platforms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">2. Information Collection</h2>
          <p>
            We collect various types of personal information to provide safe and effective care. This includes identifying details (name, contact information), medical history, symptoms, and diagnostic reports. This data is collected during intake, assessment, and throughout the duration of your treatment.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">3. Use of Information</h2>
          <p>
            Your data is used primarily to design and implement personalized rehabilitation programs. We may also use your information for administrative purposes, such as billing and appointment scheduling. We strictly adhere to medical confidentiality standards and only share information with other healthcare professionals when directly relevant to your care coordination.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">4. Data Security</h2>
          <p>
            We employ industry-standard encryption and security protocols to protect your records from unauthorized access. Our physical and digital storage systems are managed in compliance with relevant health data protection laws, ensuring that your sensitive information remains secure and private at all times.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wider">5. Your Rights</h2>
          <p>
            You have the right to request access to your records, ask for corrections to inaccurate information, and withdraw your consent for certain uses of your data. For any inquiries regarding your privacy, please reach out to our administrative team at the clinic.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;