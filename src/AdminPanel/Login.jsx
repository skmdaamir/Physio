import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Login = () => {
    
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Sets a consistent page title for the login page
    document.title = "Physio Pulse Rehab | Expert Physiotherapy Care";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const expiry = localStorage.getItem("adminTokenExpiry");

    if (token && expiry && new Date().getTime() < Number(expiry)) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
      const { token } = res.data;
      const expiryTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes expiry
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminTokenExpiry", expiryTime.toString());
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:items-center md:justify-center bg-white md:bg-[#f6f6f8] relative overflow-x-hidden font-sans">
      {/* DESKTOP ONLY: Background Decorations */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#135bec]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#135bec]/10 rounded-full blur-3xl"></div>
      </div>

      {/* MOBILE ONLY: Top Navigation */}
      <div className="md:hidden flex items-center p-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={() => navigate("/")}
          className="flex h-10 w-10 items-center justify-center text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center pr-10">
          Portal Access
        </h1>
      </div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full flex-1 md:flex-none flex flex-col md:max-w-md md:bg-white md:shadow-xl md:rounded-2xl md:border md:border-slate-200 px-6 pt-10 pb-8 md:p-10">
        {/* MOBILE ONLY: Branding Header */}
        <div className="md:hidden flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-[#135bec]/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#135bec] text-4xl">
              monitor_heart
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Physio Pulse
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 mb-8">
            & Rehab Center
          </p>

          <h3 className="text-2xl font-bold text-slate-900">Admin Sign In</h3>
          <p className="text-slate-500 text-sm mt-2 px-4 leading-relaxed">
            Enter your credentials to manage patient care and clinic operations.
          </p>
        </div>

        {/* DESKTOP ONLY: Branding Header */}
        <div className="hidden md:flex flex-col items-center mb-10 text-center">
          <div className="flex items-center justify-center w-14 h-14 bg-[#135bec] rounded-xl mb-6 shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-white text-3xl">
              monitor_heart
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
            Admin Portal
          </h2>
          <p className="text-slate-500 text-sm">
            Secure access for Physio Pulse & Rehab
          </p>
        </div>

        {/* Login Form */}
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-col gap-2 mb-5 md:mb-6">
            <label className="text-sm font-semibold text-slate-900 md:text-slate-700 md:tracking-wide md:uppercase">
              <span className="md:hidden">Institutional Email</span>
              <span className="hidden md:inline">Email Address</span>
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                mail
              </span>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@physiopulse.com"
                className="w-full h-14 pl-12 pr-4 rounded-xl md:rounded-lg border border-slate-200 bg-white md:bg-slate-50 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all placeholder:text-slate-400 text-sm md:text-base"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 mb-5 md:mb-6">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-900 md:text-slate-700 md:tracking-wide md:uppercase">
                Password
              </label>
              {/* Mobile Forgot Password */}
              <a
                href="#"
                className="md:hidden text-[#135bec] text-sm font-semibold"
              >
                Forgot?
              </a>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                lock
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-14 pl-12 pr-12 rounded-xl md:rounded-lg border border-slate-200 bg-white md:bg-slate-50 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all placeholder:text-slate-400 text-sm md:text-base tracking-widest md:tracking-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Forgot Password */}
          <div className="hidden md:flex justify-end mb-6">
            <a
              href="#"
              className="text-[#135bec] text-sm font-semibold hover:underline decoration-2 underline-offset-4"
            >
              Forgot Password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-center text-sm text-red-600 bg-red-100 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Mobile Secure Checkbox */}
          <div className="md:hidden flex items-center gap-3 p-4 mb-6 bg-[#f6f6f8] rounded-xl border border-slate-100">
            <div className="flex w-5 h-5 items-center justify-center rounded border border-slate-300 bg-white">
              <span className="material-symbols-outlined text-[16px] text-[#135bec] font-bold">
                check
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              Verify this is a secure session
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 bg-[#135bec] hover:bg-blue-700 text-white font-bold md:text-lg rounded-xl md:rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="md:hidden">Secure Access</span>
            <span className="hidden md:inline">Sign In</span>
            <span className="material-symbols-outlined">
              <span className="md:hidden">login</span>
              <span className="hidden md:inline">arrow_forward</span>
            </span>
          </button>
        </form>

        {/* MOBILE ONLY: Footer Help */}
        <div className="md:hidden mt-auto pt-12 pb-6 text-center">
          <p className="text-slate-500 text-sm">Authorized personnel only.</p>
          <div className="flex justify-center gap-6 mt-6">
            <span className="text-slate-400 material-symbols-outlined">
              shield_lock
            </span>
            <span className="text-slate-400 material-symbols-outlined">
              verified_user
            </span>
            <span className="text-slate-400 material-symbols-outlined">
              encrypted
            </span>
          </div>
        </div>

        {/* DESKTOP ONLY: Footer Info */}
        <div className="hidden md:block mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            Protected by Physio Pulse Security
          </p>
        </div>
      </div>

      {/* DESKTOP ONLY: System Status Indicators */}
      <div className="hidden md:flex mt-8 gap-6 text-slate-500 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="text-xs font-medium">System Online</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">shield</span>
          <span className="text-xs font-medium">SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
