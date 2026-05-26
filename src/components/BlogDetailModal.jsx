import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogDetailModal = ({ isOpen, onClose, blog, onNavigate }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !blog) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in zoom-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-slate-900">
            {blog.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {blog.imageUrl && (
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#135bec] bg-[#135bec]/10 px-3 py-1 rounded-lg">
                {blog.category}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-3 py-4 border-y border-slate-100">
              <div className="w-10 h-10 rounded-full bg-[#135bec]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#135bec]">person</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{blog.author}</p>
                <p className="text-xs text-slate-500">{blog.views} Views • {blog.comments} Comments</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {blog.content?.substring(0, 300)}...
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                if (typeof onNavigate === 'function') {
                  onNavigate(`blog/${blog.id}`);
                } else {
                  navigate(`/blog/${blog.id}`);
                }
              }}
              className="w-full bg-[#135bec] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              Continue Reading Full Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailModal;