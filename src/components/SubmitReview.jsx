import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Toast from './Toast';

const SubmitReview = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    rating: 5,
    description: '',
    place: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    if (typeof onNavigate === 'function') {
      onNavigate(id);
    } else {
      // Redirect to home or specific path
      navigate(id === 'home' ? '/' : `/${id}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.description || !formData.place) {
      setToast({ message: "Please fill in all required fields.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/submit-review`, formData);
      if (response.status === 201) {
        setToast({ message: "Success (201): Thank you! Your review has been submitted.", type: "success" });
        // Delay navigation so user sees the success message
        setTimeout(() => handleNavigation('home'), 2000);
      }
    } catch (error) {
      if (error.response?.status === 500) {
        setToast({ message: "Internal Server Error (500): We couldn't process your review at this time.", type: "error" });
      } else {
        setToast({ message: error.response?.data?.message || "Submission failed. Please check your connection.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (toast) setToast(null); // Clear notification when user starts typing

    // Numeric validation for mobile
    if (name === 'mobile' && value !== '' && !/^\d+$/.test(value)) return;

    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-900 font-sans pb-12 relative">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 bg-white z-40 border-b border-slate-100">
        <header className="relative flex items-center justify-center px-4 py-4">
          <button onClick={() => handleNavigation('home')} className="absolute left-4 p-2">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="font-bold text-lg">Leave a Review</h2>
        </header>
      </div>

      <main className="max-w-3xl mx-auto px-6 pt-8 md:pt-16">
        <div className="hidden md:block mb-10">
          <button 
            onClick={() => handleNavigation('home')}
            className="flex items-center gap-2 text-slate-500 hover:text-[#135bec] transition-colors mb-4 font-bold"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </button>
          <h1 className="text-4xl font-black tracking-tight">Share Your Experience</h1>
          <p className="text-slate-600 mt-2 text-lg">Your feedback helps us provide better care for our community.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
              <input 
                type="text" name="name" value={formData.name} onChange={handleChange} required
                placeholder="e.g. John Doe"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange} required
                placeholder="john@example.com"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Mobile Number</label>
              <input 
                type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required
                placeholder="10-digit mobile number"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Place / City</label>
              <input 
                type="text" name="place" value={formData.place} onChange={handleChange} required
                placeholder="e.g. Mumbai"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Overall Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                    formData.rating >= star ? 'bg-amber-50 border-amber-400 text-amber-500' : 'border-slate-100 text-slate-300'
                  }`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: formData.rating >= star ? "'FILL' 1" : "" }}>
                    star
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Review Details</label>
            <textarea 
              name="description" value={formData.description} onChange={handleChange} required
              rows="4" maxLength={500}
              placeholder="How was your recovery experience with our team?"
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-4 focus:ring-blue-500/5 outline-none resize-none transition-all"
            />
            <div className="flex justify-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{formData.description.length} / 500 Characters</span>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-[#135bec] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? "Processing..." : "Submit Review"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default SubmitReview;