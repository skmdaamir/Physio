import React, { useState, useEffect } from "react";

const AddRoleModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [role, setRole] = useState({
    title: "",
    department: "Clinical",
    type: "Full-time",
  });

  useEffect(() => {
    if (initialData) {
      setRole(initialData);
    } else {
      setRole({
        title: "",
        department: "Clinical",
        type: "Full-time",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role.title.trim()) {
      onSave(role);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">{initialData ? "Edit Job Role" : "Add New Job Role"}</h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Job Title</label>
            <input
              type="text"
              placeholder="e.g. Junior Physiotherapist"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
              value={role.title}
              onChange={(e) => setRole({ ...role, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Department</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all bg-white"
              value={role.department}
              onChange={(e) => setRole({ ...role, department: e.target.value })}
            >
              <option value="Clinical">Clinical</option>
              <option value="Administration">Administration</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Job Type</label>
            <div className="flex gap-4 pt-1">
              {["Full-time", "Part-time"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="jobType"
                    checked={role.type === type}
                    onChange={() => setRole({ ...role, type })}
                    className="w-4 h-4 text-[#135bec] focus:ring-[#135bec]"
                  />
                  <span className="text-sm font-medium text-slate-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 -mx-6 px-6 bg-slate-50 rounded-b-2xl">
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
              {initialData ? "Update Role" : "Post Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;