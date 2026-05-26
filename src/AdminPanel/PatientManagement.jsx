import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPatient, setExpandedPatient] = useState(null); // Stores ID or Phone

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      // Assuming backend returns unique patients based on phone/email
      const res = await axios.get(`${API_BASE_URL}/patients`);
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const toggleHistory = (patientId) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f6f6f8] h-full min-h-0 overflow-y-auto text-slate-900 font-sans p-4 md:p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-black tracking-tight">Patient Directory</h2>
        <p className="text-slate-500 mt-1">
          Access unique patient records and comprehensive treatment histories.
        </p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] outline-none text-sm transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-slate-400 font-medium">
          Loading patient database...
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.phone} 
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-[#135bec]/30"
            >
              {/* Patient Summary Row */}
              <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#135bec]/10 flex items-center justify-center text-[#135bec] font-bold text-lg">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{patient.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">call</span>
                      {patient.phone}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 border-t md:border-t-0 pt-4 md:pt-0">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Last Visit</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {patient.last_visit ? new Date(patient.last_visit).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Sessions</p>
                    <p className="text-sm font-semibold text-slate-700">{patient.session_count || 0}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex items-center justify-end">
                    <button 
                      onClick={() => toggleHistory(patient.phone)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        expandedPatient === patient.phone 
                        ? "bg-[#101622] text-white" 
                        : "bg-[#135bec]/10 text-[#135bec] hover:bg-[#135bec]/20"
                      }`}
                    >
                      {expandedPatient === patient.phone ? "Close History" : "View History"}
                      <span className="material-symbols-outlined text-sm">
                        {expandedPatient === patient.phone ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed History Section */}
              {expandedPatient === patient.phone && (
                <div className="bg-slate-50 border-t border-slate-100 p-4 md:p-6 animate-in slide-in-from-top-2 duration-300">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-[#135bec]">history</span>
                    Treatment Timeline
                  </h4>
                  
                  {patient.history && patient.history.length > 0 ? (
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pb-2">
                      {patient.history.map((record, idx) => (
                        <div key={idx} className="relative pl-6">
                          {/* Timeline Dot */}
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#135bec]"></div>
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-[#135bec]">
                                {new Date(record.appointment_date).toLocaleDateString(undefined, { 
                                  year: 'numeric', month: 'short', day: 'numeric' 
                                })}
                              </p>
                              <p className="text-sm font-bold text-slate-800">{record.treatment_type}</p>
                              <p className="text-xs text-slate-500 mt-1 italic">
                                "{record.conditions || "Routine session"}"
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-right">
                              <div className="hidden md:block">
                                <p className="text-[9px] font-bold uppercase text-slate-400">Therapist</p>
                                <p className="text-xs font-semibold text-slate-700">{record.assigned_doctor || "Not assigned"}</p>
                              </div>
                              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-green-50 text-green-700 border border-green-100 uppercase">
                                {record.status}
                              </span>
                            </div>
                          </div>

                          {record.remark && (
                            <div className="mt-2 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 flex gap-2">
                              <span className="material-symbols-outlined text-sm text-slate-400">notes</span>
                              {record.remark}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 py-4 text-center italic">
                      No previous sessions recorded for this patient.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">person_search</span>
              <p className="text-slate-500 font-medium">No patients matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientManagement;