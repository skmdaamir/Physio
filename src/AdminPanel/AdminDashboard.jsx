import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import BlogManagement from "./BlogManagement";
import AppointmentAdmin from "./AppointmentAdmin";
import GalleryCareer from "./GalleryCareer";
import PatientManagement from "./PatientManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sets a consistent page title for the entire admin dashboard
    document.title = "Physio Pulse Rehab | Expert Physiotherapy Care";
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetching today's sessions and patient stats in parallel
        const [apptsRes, statsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/appointments?filter=today`),
          axios.get(`${API_BASE_URL}/patients/count`)
        ]);
        setTodayAppointments(apptsRes.data);
        setTotalPatients(statsRes.data.count || 0);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activeView === "dashboard") {
      fetchDashboardData();
    }
  }, [activeView]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "bg-emerald-100 text-emerald-700";
      case "Pending": return "bg-amber-100 text-amber-700";
      case "Completed": return "bg-blue-100 text-blue-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "TBD --";
    const [h, m] = timeStr.split(':');
    const hrs = parseInt(h);
    return `${hrs % 12 || 12}:${m} ${hrs >= 12 ? 'PM' : 'AM'}`;
  };

  const handleLogout = () => {
    // Clear token and expiry from local storage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiry');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="flex h-screen bg-[#f6f6f8] font-sans text-slate-900 overflow-hidden relative">
      {/* MOBILE OVERLAY */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ease-in-out ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* =========================================
          DESKTOP SIDEBAR (Hidden on Mobile)
      ========================================= */}
      <aside className={`flex fixed inset-y-0 left-0 z-[70] md:relative w-64 flex-col bg-[#101622] text-slate-400 border-r border-slate-800 shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-[#101622] justify-between">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-[#135bec] text-2xl">
              monitor_heart
            </span>
            <span className="text-lg font-bold tracking-tight">
              Physio Pulse
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Main Menu
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView("dashboard");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "dashboard" ? "bg-[#135bec]/10 text-[#135bec] font-semibold" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span
              className="material-symbols-outlined"
              style={activeView === "dashboard" ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              dashboard
            </span>
            Dashboard
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView("appointments");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "appointments" ? "bg-[#135bec]/10 text-[#135bec] font-semibold" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="material-symbols-outlined">calendar_today</span>
            Appointments
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView("blog");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "blog" ? "bg-[#135bec]/10 text-[#135bec] font-semibold" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="material-symbols-outlined">article</span>
            Blog
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView("gallery");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "gallery" ? "bg-[#135bec]/10 text-[#135bec] font-semibold" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="material-symbols-outlined">image</span>
            Photo Gallery
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView("careers");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "careers" ? "bg-[#135bec]/10 text-[#135bec] font-semibold" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="material-symbols-outlined">work</span>
            Careers
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveView("patients");
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "patients" ? "bg-[#135bec]/10 text-[#135bec] font-semibold" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="material-symbols-outlined">group</span>
            Patients
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">medical_services</span>
            Treatments
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">analytics</span>
            Analytics
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-rose-400 transition-colors mt-1"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* =========================================
          MAIN CONTENT AREA
      ========================================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* TOP HEADER */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-20 shrink-0">
          {/* Mobile Left: Menu / Desktop Left: Greeting */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden flex items-center text-slate-600"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-slate-900">
                Good Morning, Dr. Chen
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Here's what's happening at the clinic today.
              </p>
            </div>
            {/* Mobile Title */}
            <span className="md:hidden text-lg font-bold text-slate-900">
              Dashboard
            </span>
          </div>

          {/* Right: Search, Notifications, Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center relative">
              <span className="material-symbols-outlined absolute left-3 text-slate-400 text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search patients, ID..."
                className="pl-9 pr-4 py-2 bg-[#f6f6f8] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#135bec]/20 w-64 outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-[#135bec]/20 rounded-full border border-[#135bec]/30 flex items-center justify-center overflow-hidden cursor-pointer">
              <span className="material-symbols-outlined text-[#135bec]">
                person
              </span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD CONTENT */}
        {activeView === "dashboard" && (
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            {/* Mobile Greeting (Hidden on Desktop) */}
            <div className="md:hidden mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Good Morning!</h1>
              <p className="text-sm text-slate-500">
                Dr. Sarah Chen • Today is Oct 24
              </p>
            </div>

            {/* QUICK STATS GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Patients"
                value={totalPatients.toLocaleString()}
                trend="+12%"
                trendUp={true}
                icon="group"
                color="text-blue-600"
                bg="bg-blue-100"
              />
              <StatCard
                title="Today's Appts"
                value={todayAppointments.length.toString()}
                trend={`${todayAppointments.filter(a => a.status === 'Pending').length} Pending`}
                trendUp={true}
                icon="calendar_today"
                color="text-emerald-600"
                bg="bg-emerald-100"
              />
              <StatCard
                title="New Inquiries"
                value="18"
                trend="+5% (7d)"
                trendUp={true}
                icon="mail"
                color="text-purple-600"
                bg="bg-purple-100"
              />
              <StatCard
                title="Avg. Recovery"
                value="4.2 Wks"
                trend="-2 days"
                trendUp={true}
                icon="trending_up"
                color="text-orange-600"
                bg="bg-orange-100"
              />
            </div>

            {/* MAIN CONTENT SPLIT (Table + Sidebar Tasks) */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              {/* LEFT AREA: Appointments (Takes up 2/3 on Desktop) */}
              <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Today's Schedule
                  </h2>
                  <button className="text-[#135bec] text-sm font-semibold hover:underline">
                    View All
                  </button>
                </div>

                {/* Responsive List/Table */}
                <div className="space-y-4">
                  {loading ? (
                    <div className="py-4 text-center text-slate-400 text-sm font-medium">Loading schedule...</div>
                  ) : todayAppointments.length === 0 ? (
                    <div className="py-4 text-center text-slate-400 text-sm font-medium">No appointments for today.</div>
                  ) : (
                    todayAppointments.map((app) => (
                      <AppointmentRow
                        key={app.id}
                        time={formatTime(app.appointment_time)}
                        patient={app.name}
                        type={app.treatment_type}
                        status={app.status}
                        statusColor={getStatusColor(app.status)}
                        doctor={app.assigned_doctor}
                        location={app.place}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* RIGHT AREA: Tasks & Activity (Takes up 1/3 on Desktop) */}
              <div className="w-full lg:w-80 flex flex-col gap-6 md:gap-8">
                {/* Action Items */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">
                    Action Items
                  </h2>
                  <div className="space-y-3">
                    <TaskItem
                      title="Review MRI Results"
                      desc="Patient: S. Hudson"
                      time="Due 12:00 PM"
                      icon="medical_information"
                      color="text-rose-500 bg-rose-50"
                    />
                    <TaskItem
                      title="Approve Equipment Order"
                      desc="Theraband Restock"
                      time="Due Today"
                      icon="shopping_cart"
                      color="text-blue-500 bg-blue-50"
                    />
                    <TaskItem
                      title="Sign Treatment Plans"
                      desc="3 Pending Approvals"
                      time="Due EOD"
                      icon="signature"
                      color="text-amber-500 bg-amber-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
        {activeView === "appointments" && <AppointmentAdmin />}
        {activeView === "blog" && <BlogManagement />}
        {(activeView === "gallery" || activeView === "careers") && <GalleryCareer activeTab={activeView} />}
        {activeView === "patients" && <PatientManagement />}
      </div>

      {/* =========================================
          MOBILE BOTTOM NAV (Hidden on Desktop)
      ========================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 pb-6 pt-2 z-50 flex justify-around">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setActiveView("dashboard");
          }}
          className={`flex flex-col items-center gap-1 ${activeView === "dashboard" ? "text-[#135bec]" : "text-slate-400"}`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Home
          </span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveView("appointments");
          }}
          className={`flex flex-col items-center gap-1 ${activeView === "appointments" ? "text-[#135bec]" : "text-slate-400"}`}
        >
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Schedule
          </span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Patients
          </span>
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setIsSidebarOpen(true);
          }}
          className={`flex flex-col items-center gap-1 ${isSidebarOpen ? "text-[#135bec]" : "text-slate-400"}`}
        >
          <span className="material-symbols-outlined">menu</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            More
          </span>
        </a>
      </nav>
    </div>
  );
};

/* --- Subcomponents for cleaner code --- */

const StatCard = ({ title, value, trend, trendUp, icon, color, bg }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg} ${color}`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
      >
        {trend}
      </span>
    </div>
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
        {value}
      </h3>
    </div>
  </div>
);

const AppointmentRow = ({ time, patient, type, status, statusColor, doctor, location }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors gap-4">
    <div className="flex items-center gap-4 flex-1">
      <div className="hidden md:flex flex-col items-center justify-center w-20 text-center border-r border-slate-200 pr-4 shrink-0">
        <span className="text-xs font-bold text-slate-500">
          {time.split(" ")[0]}
        </span>
        <span className="text-[10px] font-black uppercase text-slate-400">
          {time.split(" ")[1]}
        </span>
      </div>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 bg-[#135bec]/10 rounded-full flex items-center justify-center text-[#135bec] font-bold shrink-0">
          {patient ? patient.charAt(0).toUpperCase() : 'P'}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate">{patient}</h4>
          <div className="md:hidden">
            <p className="text-[11px] text-slate-500 truncate">
              {time} • {type}
            </p>
            <p className="text-[11px] font-semibold text-[#135bec] truncate">
              {doctor || "Unassigned"}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">medical_services</span>
              {type}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {location || "Clinic"}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
      <div className="hidden md:flex flex-col items-end mr-2">
        <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider leading-none mb-1">Therapist</span>
        <span className="text-xs font-bold text-slate-700">{doctor || "Pending"}</span>
      </div>
      <span
        className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${statusColor} whitespace-nowrap`}
      >
        {status}
      </span>
      <button className="text-slate-400 hover:text-[#135bec] transition-colors flex items-center justify-center">
        <span className="material-symbols-outlined text-[20px]">
          chevron_right
        </span>
      </button>
    </div>
  </div>
);

const TaskItem = ({ title, desc, time, icon, color }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
    <div
      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
    </div>
    <div>
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
        {time}
      </p>
    </div>
  </div>
);

export default AdminDashboard;
