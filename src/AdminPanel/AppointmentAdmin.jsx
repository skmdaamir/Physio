import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import ScheduleAppointmentModal from "./ScheduleAppointmentModal"; // Import the new modal


const AppointmentAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isTodayFilterActive, setIsTodayFilterActive] = useState(false);

  // Desktop Filters
  const desktopServices = [
    "All Services",
    "Physiotherapy",
    "Massage Therapy",
    "Acupuncture",
    "Occupational Therapy",
  ];

  // Mobile Filters
  const mobileFilters = ["All", "Today", "Upcoming", "Completed", "Pending"];
  const [activeMobileFilter, setActiveMobileFilter] = useState("All");

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = isTodayFilterActive 
        ? `${API_BASE_URL}/appointments?filter=today` 
        : `${API_BASE_URL}/appointments`;
      const res = await axios.get(endpoint);
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  }, [isTodayFilterActive]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Function to handle updating remarks
  const handleUpdateRemark = async (id, currentRemark) => {
    const newRemark = window.prompt("Enter new remark:", currentRemark || "");
    if (newRemark !== null) { // User didn't cancel the prompt
      try {
        await axios.put(`${API_BASE_URL}/appointments/${id}/remark`, {
          remark: newRemark,
        }); // PUT /:id/remark endpoint
        fetchAppointments(); // Re-fetch appointments to update the UI
      } catch (err) {
        alert("Failed to update remark.");
        console.error("Error updating remark:", err);
      }
    }
  };

  // Function to handle updating status
  const handleUpdateStatus = async (id, currentStatus) => {
    // Example: Toggle between Pending and Confirmed, or set to Completed
    let nextStatus;
    if (currentStatus === "Pending") {
      nextStatus = "Confirmed";
    } else if (currentStatus === "Confirmed") {
      nextStatus = "Completed";
    } else {
      nextStatus = "Pending"; // Or some other default/cycle
    }

    if (window.confirm(`Change status from "${currentStatus}" to "${nextStatus}"?`)) {
      try {
        await axios.patch(`${API_BASE_URL}/appointments/${id}/status`, {
          status: nextStatus,
        }); // PATCH /:id/status endpoint
        fetchAppointments(); // Re-fetch appointments to update the UI
      } catch (err) {
        alert("Failed to update status.");
        console.error("Error updating status:", err);
      }
    }
  };

  // Function to handle opening the schedule modal
  const handleOpenScheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsScheduleModalOpen(true);
  };

  // Function to handle closing the schedule modal
  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setSelectedAppointment(null);
  };

  // Function to handle updating date and time
  const handleUpdateSchedule = async (id, scheduleData) => {
    try {
      await axios.put(`${API_BASE_URL}/appointments/${id}/schedule`, scheduleData);
      fetchAppointments();
      alert("Appointment schedule updated successfully!");
    } catch (err) {
      alert("Failed to update appointment schedule.");
      console.error("Error updating schedule:", err);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Confirmed": return "text-green-600 bg-green-50 border-green-100";
      case "Pending": return "text-amber-600 bg-amber-50 border-amber-100";
      case "Completed": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Cancelled": return "text-red-600 bg-red-50 border-red-100"; // Added for completeness
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : "??";
  };

  const filteredAppointments = appointments.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.treatment_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedMobileAppointments = filteredAppointments.reduce((acc, curr) => {
    const dateLabel = curr.appointment_date 
      ? new Date(curr.appointment_date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()
      : "PENDING SCHEDULE";

    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(curr);
    return acc;
  }, {});

  return (
    <>
    <div className="flex-1 flex flex-col bg-white md:bg-[#f6f6f8] h-full min-h-0 overflow-y-auto text-slate-900 font-sans">
      {/* =========================================
          MOBILE HEADER & ACTIONS
      ========================================= */}
      <div className="md:hidden">
        {/* Title & FAB */}
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-2xl font-bold leading-tight">Appointments</h2>
          <button className="flex items-center justify-center rounded-full w-10 h-10 bg-[#135bec] text-white shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2">
          <div className="flex w-full items-stretch rounded-xl h-12 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-center pl-4 text-slate-400">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              placeholder="Search patient or therapist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent focus:ring-0 text-base px-3 placeholder:text-slate-400 outline-none"
            />
            <button className="pr-4 text-slate-400 flex items-center">
              <span className="material-symbols-outlined text-xl">tune</span>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar">
          {mobileFilters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => {
                setActiveMobileFilter(filter);
                setIsTodayFilterActive(filter === "Today");
              }}
              className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 text-sm transition-colors ${
                activeMobileFilter === filter
                  ? "bg-[#135bec] text-white font-semibold"
                  : "bg-white border border-slate-200 text-slate-600 font-medium"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================
          DESKTOP HEADER
      ========================================= */}
      <header className="hidden md:block p-8 pb-4">
        <div className="flex flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              Appointment Management
            </h2>
            <p className="text-slate-500 mt-1">
              Manage and monitor all patient rehabilitation sessions
            </p>
          </div>
          <button className="bg-[#135bec] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            New Appointment
          </button>
        </div>
      </header>

      {/* =========================================
          DESKTOP FILTERS & CALENDAR
      ========================================= */}
      <section className="hidden md:grid px-8 py-4 grid-cols-12 gap-6">
        {/* Calendar Widget */}
        <div className="col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 hover:bg-slate-100 rounded">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="font-bold text-slate-900">October 2023</h3>
            <button className="p-1 hover:bg-slate-100 rounded">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-2">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100 col-start-2">
              1
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              2
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              3
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg bg-[#135bec] text-white font-bold">
              4
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              5
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              6
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              7
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              8
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100 border border-[#135bec]/30">
              9
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              10
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              11
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              12
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              13
            </button>
            <button className="aspect-square flex items-center justify-center text-sm rounded-lg hover:bg-slate-100">
              14
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="col-span-8 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {/* Today Filter Toggle */}
            <button
              onClick={() => setIsTodayFilterActive(!isTodayFilterActive)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 border ${
                isTodayFilterActive
                  ? "bg-[#135bec] border-[#135bec] text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
              Today's Sessions
            </button>
            <div className="w-px h-8 bg-slate-200 mx-1 hidden lg:block"></div>
            {desktopServices.map((service, idx) => (
              <button
                key={service}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  idx === 0
                    ? "bg-[#135bec] text-white"
                    : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] outline-none text-sm"
              />
            </div>
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
              <span className="material-symbols-outlined text-lg">
                filter_list
              </span>
              Advanced
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          CONTENT AREA (Mobile List vs Desktop Table)
      ========================================= */}

      {/* MOBILE CONTENT: Grouped Card List */}
      <div className="md:hidden px-4 pb-24">
        {loading ? (
           <div className="flex justify-center py-10 text-slate-400 font-medium">Loading appointments...</div>
        ) : appointments.length === 0 ? (
           <div className="flex justify-center py-10 text-slate-400 font-medium">No appointments found.</div>
        ) : (
        Object.entries(groupedMobileAppointments).map(
          ([groupName, groupApps], idx) => (
            <div key={groupName} className="mb-6">
              <h3
                className={`text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 ${idx > 0 ? "mt-8" : ""}`}
              >
                {groupName}
              </h3>
              <div className="space-y-4">
                {groupApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3 overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-[#135bec]/10 flex items-center justify-center text-[#135bec] font-bold shrink-0">
                          {getInitials(app.name)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg truncate">
                            {app.name}
                          </h4>
                          <p className="text-sm text-slate-500 truncate">
                            {app.treatment_type}
                          </p>
                        </div>
                      </div>
                      <span // Make status clickable in mobile view
                        onClick={() => handleUpdateStatus(app.id, app.status)}
                        title={`Click to change status (current: ${app.status})`}
                        className={`${getStatusStyles(app.status)} px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span className="material-symbols-outlined text-lg">
                          schedule
                        </span>
                        <span className="text-sm font-medium">
                          {app.appointment_time || "TBD"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span className="material-symbols-outlined text-lg">
                          medical_services
                        </span>
                        <span className="text-sm font-medium">
                          {app.phone}
                        </span>
                      </div>
                    </div>
                    {/* Mobile Actions */}
                    <div className="mt-4 flex justify-end gap-2 border-t border-slate-50 pt-3">
                      <button
                        onClick={() => handleUpdateRemark(app.id, app.remark)}
                        className="p-1.5 text-slate-400 hover:text-[#135bec] transition-colors"
                        title={app.remark || "Add Remark"}
                      >
                        <span className="material-symbols-outlined text-lg">comment</span>
                      </button>
                      {/* Delete button can be added here if needed */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )
        )}
      </div>

      {/* DESKTOP CONTENT: Data Table */}
      <section className="hidden md:block px-8 py-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Patient Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Service
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#135bec]/10 flex items-center justify-center text-[#135bec] text-xs font-bold shrink-0">
                          {getInitials(app.name)}
                        </div>
                        <p className="text-sm font-semibold">
                          {app.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200">
                        {app.treatment_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium">
                          {app.appointment_date ? new Date(app.appointment_date).toLocaleDateString() : "Not Scheduled"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {app.appointment_time || "--:--"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => handleUpdateStatus(app.id, app.status)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md w-fit border ${getStatusStyles(app.status)}`}
                        title={`Click to change status (current: ${app.status})`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${app.status === "Pending" ? "animate-pulse bg-amber-600" : "bg-current"}`}
                        ></span>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleUpdateRemark(app.id, app.remark)}
                          className="p-1.5 text-slate-400 hover:text-[#135bec] transition-colors"
                          title={app.remark || "Add Remark"}
                        >
                          <span className="material-symbols-outlined text-lg">
                            comment
                          </span>
                        </button>
                        <button
                          onClick={() => handleOpenScheduleModal(app)}
                          className="p-1.5 text-slate-400 hover:text-[#135bec] transition-colors"
                          title="Reschedule Appointment"
                        >
                          <span className="material-symbols-outlined text-lg">
                            event
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold hover:bg-slate-100 disabled:opacity-50 text-slate-700"
                disabled
              >
                Prev
              </button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold hover:bg-slate-100 text-slate-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    {isScheduleModalOpen && (
        <ScheduleAppointmentModal
          isOpen={isScheduleModalOpen}
          onClose={handleCloseScheduleModal}
          onSave={handleUpdateSchedule}
          appointment={selectedAppointment}
        />
    )}
    </>
  );
};

export default AppointmentAdmin;
