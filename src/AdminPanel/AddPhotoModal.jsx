import React, { useState, useEffect } from "react";
import Toast from "../components/Toast";

const AddPhotoModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setTitle("");
      setImgUrl("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && imgUrl.trim()) {
      onSave({ title, imgUrl });
      onClose();
    } else {
      setToast({ message: "Please enter both a title and an image URL.", type: "error" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-900">Add New Photo</h3>
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
            <label htmlFor="photoTitle" className="text-sm font-bold text-slate-700">
              Photo Title
            </label>
            <input
              type="text"
              id="photoTitle"
              placeholder="e.g. Clinic Interior"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-sm font-bold text-slate-700">
              Image URL
            </label>
            <input
              type="url" // Use type="url" for better validation
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />
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
              Add Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhotoModal;