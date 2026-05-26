import React, { useState, useEffect } from "react";

const ScheduleAppointmentModal = ({
  isOpen,
  onClose,
  onSave,
  appointment,
}) => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const doctors = [
    "Dr. Shoeb",
    "Dr. Kamran Hameed",
    "Dr. Laiba Yusuf Khan",
    "Dr. Mohseneen Akhtar",
    "Dr. Pratibha Singh",
    "Dr. Yasmeen Manihar",
  ];

  // Get today's date in YYYY-MM-DD format for local time to set the min attribute
  const today = new Date().toLocaleDateString('sv-SE');

  useEffect(() => {
    if (isOpen && appointment) {
      // Pre-fill form with existing appointment date and time
      setAppointmentDate(appointment.appointment_date || "");
      setAppointmentTime(appointment.appointment_time || "");
      setSelectedDoctor(appointment.assigned_doctor || "");
    } else if (!isOpen) {
      // Reset form when modal closes
      setAppointmentDate("");
      setAppointmentTime("");
      setSelectedDoctor("");
    }
  }, [isOpen, appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      alert("Please select both a date and a time.");
      return;
    }

    if (!selectedDoctor) {
      alert("Please assign a doctor or therapist.");
      return;
    }

    if (appointmentDate < today) {
      alert("The appointment date cannot be in the past.");
      return;
    }

    onSave(appointment.id, {
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      assigned_doctor: selectedDoctor,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-900">
            Schedule Appointment
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="appointmentDate" className="text-sm font-bold text-slate-700">
              Date
            </label>
            <input
              type="date"
              id="appointmentDate"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
              value={appointmentDate}
              min={today}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="appointmentTime" className="text-sm font-bold text-slate-700">
              Time
            </label>
            <input
              type="time"
              id="appointmentTime"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="assignedDoctor" className="text-sm font-bold text-slate-700">
              Assign Doctor/Therapist
            </label>
            <select
              id="assignedDoctor"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all bg-white"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
            >
              <option value="" disabled>Select a specialist</option>
              {doctors.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 -mx-6 px-6 bg-slate-50 rounded-b-2xl sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg font-bold text-white bg-[#135bec] hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal;