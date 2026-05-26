import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Toast from "../components/Toast";
import BlogDetailModal from "../components/BlogDetailModal";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedBlogForView, setSelectedBlogForForView] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Newest");
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    author: "",
    content: "",
    status: "Published",
    image: null, // For Cloudinary file upload
    benefits: [""],
    recovery_steps: [{ title: "", desc: "" }],
    faqs: [{ question: "", answer: "" }],
  });

  // Global Status Styling Mapping
  const getStatusStyles = (status) => {
    const styles = {
      Published: {
        color: "bg-green-100 text-green-700",
        dot: "bg-green-500",
      },
      Draft: {
        color: "bg-slate-100 text-slate-600",
        dot: "bg-slate-400",
      },
    };
    return styles[status] || styles.Draft;
  };

  // Helper to convert backend is_publish to frontend status string
  const getFrontendStatusString = (isPublish) => {
    // Robust check for numeric 1, string "1", or boolean true
    const p = String(isPublish).toLowerCase();
    return (p === "1" || p === "true") ? "Published" : "Draft";
  };

  const fetchBlogs = useCallback(async () => {
    try {
      // Use a timestamp to bypass browser cache so updates show immediately
      const response = await axios.get(`${API_BASE_URL}/blogs/allBlogs?nocache=${Date.now()}`);
      setBlogs(response.data.map(blog => ({
        ...blog,
        status: getFrontendStatusString(blog.is_publish), // Map backend is_publish to frontend status string
        desktopTitle: blog.title, // Assuming desktopTitle is same as title if not explicitly different
        category: blog.categories, // Map backend 'categories' to 'category' for UI consistency
        date: new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }), // Format date
        comments: blog.comments || 0, // Default comments if not provided by backend
        views: Number(blog.views) || 0, // Ensure views is a number
        benefits: typeof blog.benefits === 'string' ? JSON.parse(blog.benefits) : blog.benefits || [""],
        recovery_steps: typeof blog.recovery_steps === 'string' ? JSON.parse(blog.recovery_steps) : blog.recovery_steps || [{ title: "", desc: "" }],
        faqs: typeof blog.faqs === 'string' ? JSON.parse(blog.faqs) : blog.faqs || [{ question: "", answer: "" }],
        subtitle: blog.subtitle || ""
      })));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Sorting and Pagination logic
  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortBy === "Trending") {
      return b.views - a.views;
    }
    // Default: Newest
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const totalPages = Math.ceil(sortedBlogs.length / itemsPerPage);
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  useEffect(() => {
    // If current page is beyond total pages (e.g. after deletion), reset to last valid page
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.desktopTitle || blog.title,
      subtitle: blog.subtitle || "",
      category: blog.category || blog.categories, // Prefer mapped category
      author: blog.author,
      content: blog.content || "",
      status: getFrontendStatusString(blog.is_publish), // Set status based on is_publish
      image: null, // Image usually handled separately in edits
      benefits: blog.benefits || [""],
      recovery_steps: blog.recovery_steps || [{ title: "", desc: "" }],
      faqs: blog.faqs || [{ question: "", answer: "" }],
    });
    setIsModalOpen(true);
  };

  const addField = (field) => {
    const templates = {
      benefits: "",
      recovery_steps: { title: "", desc: "" },
      faqs: { question: "", answer: "" }
    };
    setFormData(prev => ({ ...prev, [field]: [...prev[field], templates[field]] }));
  };

  const removeField = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const updateDynamicField = (field, index, key, value) => {
    const updated = [...formData[field]];
    if (key === null) updated[index] = value;
    else updated[index] = { ...updated[index], [key]: value };
    setFormData(prev => ({ ...prev, [field]: updated }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewMode(false);
    setEditingBlog(null);
    setFormData({
      title: "",
      subtitle: "",
      category: "",
      author: "",
      content: "",
      status: "Published",
      image: null,
      benefits: [""],
      recovery_steps: [{ title: "", desc: "" }],
      faqs: [{ question: "", answer: "" }],
    });
  };

  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const isPublishValue = formData.status === "Published" ? "1" : "0";

    // Using FormData for Cloudinary/Backend support
    const data = new FormData();
    data.append("title", formData.title);
    data.append("categories", formData.category);
    data.append("author", formData.author);
    data.append("content", formData.content);
    data.append("subtitle", formData.subtitle);
    data.append("is_publish", isPublishValue); 
    data.append("benefits", JSON.stringify(formData.benefits.filter(b => b)));
    data.append("recovery_steps", JSON.stringify(formData.recovery_steps.filter(s => s.title)));
    data.append("faqs", JSON.stringify(formData.faqs.filter(f => f.question)));

    if (formData.image) {
      // Multer typically expects the field name 'image' for single file uploads
      data.append("image", formData.image);
    }

    try {
      if (editingBlog) {
        await axios.put(`${API_BASE_URL}/blogs/${editingBlog.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setToast({ message: "Blog post updated successfully!", type: "success" });
      } else {
        await axios.post(`${API_BASE_URL}/blogs`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setToast({ message: "Blog post created successfully!", type: "success" });
      }
      handleCloseModal();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      setToast({ message: "Failed to save blog post.", type: "error" });
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(`${API_BASE_URL}/blogs/${id}`);
        setToast({ message: "Blog post deleted successfully!", type: "success" });
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        setToast({ message: "Failed to delete blog post.", type: "error" });
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f6f6f8] text-slate-900 font-sans md:p-8 pb-24 md:pb-8 relative">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      {/* MOBILE ONLY: Tabs Navigation */}
      <nav className="md:hidden bg-white border-b border-slate-200 mb-4">
        <div className="flex px-4 overflow-x-auto no-scrollbar">
          <a
            href="#"
            className="flex shrink-0 flex-col items-center justify-center border-b-2 border-[#135bec] px-4 pb-3 pt-4"
          >
            <p className="text-sm font-bold text-[#135bec]">Published (18)</p>
          </a>
          <a
            href="#"
            className="flex shrink-0 flex-col items-center justify-center border-b-2 border-transparent px-4 pb-3 pt-4"
          >
            <p className="text-sm font-medium text-slate-500">Drafts (4)</p>
          </a>
          <a
            href="#"
            className="flex shrink-0 flex-col items-center justify-center border-b-2 border-transparent px-4 pb-3 pt-4"
          >
            <p className="text-sm font-medium text-slate-500">Scheduled (2)</p>
          </a>
        </div>
      </nav>

      <div className="px-4 md:px-0">
        {/* DESKTOP ONLY: Header Area */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-black tracking-tight">Blog Posts</h3>
            <p className="text-slate-500 mt-1">
              Manage and organize your clinic's articles and rehab guides.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#135bec] text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <span className="material-symbols-outlined">add</span>
            Add New Post
          </button>
        </div>

        {/* DESKTOP ONLY: Stats Cards */}
        <div className="hidden md:grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Posts", value: blogs.length },
            { label: "Published", value: blogs.filter(b => b.status === "Published").length },
            { label: "Drafts", value: blogs.filter(b => b.status === "Draft").length },
            { 
              label: "Total Views", 
              value: blogs.reduce((sum, b) => sum + (Number(b.views) || 0), 0).toLocaleString() 
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
            >
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-2xl font-black mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* MOBILE ONLY: List Header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-700">
            All Published Posts
          </h2>
          <div className="flex items-center text-xs font-medium text-slate-500">
            <span className="material-symbols-outlined text-sm mr-1">sort</span>{" "}
            Sort by: 
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-1 bg-transparent outline-none font-bold text-slate-700 cursor-pointer"
            >
              <option value="Newest">Newest</option>
              <option value="Trending">Trending</option>
            </select>
          </div>
        </div>

        {/* MOBILE LAYOUT: Card List */}
        <div className="md:hidden flex flex-col gap-4">
          {currentBlogs
            .filter((blog) => !blog.mobileHidden)
            .map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
              >
                <div className="flex gap-4">
                  <div
                    className="h-20 w-20 flex-shrink-0 rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${blog.imageUrl || 'http://googleusercontent.com/profile/picture/' + blog.image}')`,
                    }}
                  ></div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-sm font-bold leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      <span className="flex items-center text-[11px] text-slate-500">
                        <span className="material-symbols-outlined text-[14px] mr-1">
                          visibility
                        </span>{" "}
                        {blog.views}
                      </span>
                      <span className="flex items-center text-[11px] text-slate-500">
                        <span className="material-symbols-outlined text-[14px] mr-1">
                          chat_bubble
                        </span>{" "}
                        {blog.comments}
                      </span>
                      <span className="flex items-center text-[11px] text-slate-500">
                        <span className="material-symbols-outlined text-[14px] mr-1">
                          calendar_today
                        </span>{" "}
                        {blog.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(blog)}
                      className="flex items-center gap-1 rounded-lg bg-[#135bec]/10 px-3 py-1.5 text-xs font-bold text-[#135bec]"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>{" "}
                      Edit
                    </button>
                    <button 
                      onClick={() => setSelectedBlogForForView(blog)}
                      className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
                    >
                      <span className="material-symbols-outlined text-sm">
                        visibility
                      </span>{" "}
                      View
                    </button>
                  </div>
                  <button 
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="flex size-8 items-center justify-center rounded-lg text-red-500 bg-red-50"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* DESKTOP LAYOUT: Table */}
        <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Post Title
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Author
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date Published
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
                {currentBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">
                          {blog.title}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5">
                          {blog.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#135bec]/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px] text-[#135bec]">
                            person
                          </span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {blog.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-600">
                        {blog.date}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyles(blog.status).color}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${getStatusStyles(blog.status).dot} mr-1.5`}
                        ></span>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="p-2 text-slate-400 hover:text-[#135bec] transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl">
                            edit
                          </span>
                        </button>
                        <button 
                          onClick={() => setSelectedBlogForForView(blog)}
                          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl">
                            visibility
                          </span>
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Desktop Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
            <span className="text-sm text-slate-500 font-medium">
              Showing {blogs.length > 0 ? indexOfFirstBlog + 1 : 0} to {Math.min(indexOfLastBlog, blogs.length)} of {blogs.length} posts
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white'}`}
              >
                <span className="material-symbols-outlined text-xl leading-none">
                  chevron_left
                </span>
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                    currentPage === i + 1 
                      ? "bg-[#135bec] text-white shadow-sm" 
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`p-2 rounded-lg transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white'}`}
              >
                <span className="material-symbols-outlined text-xl leading-none">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ONLY: Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#135bec] text-white shadow-lg shadow-blue-500/40 active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* ADD NEW POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingBlog ? "Edit Post" : "Create New Post"}
                </h3>
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(false)}
                    className={`text-sm font-bold pb-1 border-b-2 transition-colors ${!previewMode ? 'border-[#135bec] text-[#135bec]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(true)}
                    className={`text-sm font-bold pb-1 border-b-2 transition-colors ${previewMode ? 'border-[#135bec] text-[#135bec]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {!previewMode ? (
            <form className="p-6 space-y-6" onSubmit={handleFormSubmit}>
              {/* Modal Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. 5 Ways to Improve Posture"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all bg-white invalid:text-slate-400"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option>Wellness</option>
                    <option>Prevention</option>
                    <option>Rehab</option>
                    <option>Nutrition</option>
                    <option>Exercises</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Subtitle (Intro Text)
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="e.g. A comprehensive guide to recovering comfortably at home."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Featured Image
                </label>
                <label className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-[#135bec] hover:text-[#135bec] hover:bg-blue-50/50 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    cloud_upload
                  </span>
                  <p className="text-sm font-medium">
                    {formData.image ? formData.image.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs mt-1">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData({ ...formData, image: e.target.files[0] });
                      }
                    }} 
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Content
                </label>
                <textarea
                  rows="6"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your post content here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Benefits Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Key Benefits</label>
                  <button type="button" onClick={() => addField('benefits')} className="text-xs font-bold text-[#135bec] hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">add_circle</span> Add Benefit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => updateDynamicField('benefits', i, null, e.target.value)}
                        placeholder={`Benefit #${i + 1}`}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-[#135bec] outline-none text-sm"
                      />
                      {formData.benefits.length > 1 && (
                        <button type="button" onClick={() => removeField('benefits', i)} className="text-red-400 hover:text-red-600">
                          <span className="material-symbols-outlined text-xl">remove_circle</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recovery Steps Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Recovery Steps</label>
                  <button type="button" onClick={() => addField('recovery_steps')} className="text-xs font-bold text-[#135bec] hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">add_circle</span> Add Step
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.recovery_steps.map((step, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateDynamicField('recovery_steps', i, 'title', e.target.value)}
                          placeholder="Step Title (e.g. Consistency)"
                          className="px-3 py-2 rounded-lg border border-slate-200 focus:border-[#135bec] outline-none text-sm font-bold"
                        />
                        <input
                          type="text"
                          value={step.desc}
                          onChange={(e) => updateDynamicField('recovery_steps', i, 'desc', e.target.value)}
                          placeholder="Description"
                          className="px-3 py-2 rounded-lg border border-slate-200 focus:border-[#135bec] outline-none text-sm"
                        />
                      </div>
                      {formData.recovery_steps.length > 1 && (
                        <button type="button" onClick={() => removeField('recovery_steps', i)} className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-xl">cancel</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700">Common FAQs</label>
                  <button type="button" onClick={() => addField('faqs')} className="text-xs font-bold text-[#135bec] hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">add_circle</span> Add FAQ
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.faqs.map((faq, i) => (
                    <div key={i} className="p-4 bg-blue-50/30 rounded-xl border border-blue-100 relative group">
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateDynamicField('faqs', i, 'question', e.target.value)}
                          placeholder="Question?"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#135bec] outline-none text-sm font-bold"
                        />
                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateDynamicField('faqs', i, 'answer', e.target.value)}
                          placeholder="Answer..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#135bec] outline-none text-sm resize-none"
                        />
                      </div>
                      {formData.faqs.length > 1 && (
                        <button type="button" onClick={() => removeField('faqs', i)} className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-xl">cancel</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    placeholder="Dr. Sarah Smith"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#135bec] focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Status
                  </label>
                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={formData.status === "Published"}
                        onChange={() =>
                          setFormData({ ...formData, status: "Published" })
                        }
                        className="w-4 h-4 text-[#135bec] focus:ring-[#135bec]"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        Publish Immediately
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={formData.status === "Draft"}
                        onChange={() =>
                          setFormData({ ...formData, status: "Draft" })
                        }
                        className="w-4 h-4 text-[#135bec] focus:ring-[#135bec]"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        Save as Draft
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Inside Form for proper submission) */}
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl sticky bottom-0 -mx-6 px-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-lg font-bold text-white bg-[#135bec] hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                  {editingBlog ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
            ) : (
              <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                {/* Preview Mode */}
                {(formData.image || (editingBlog && (editingBlog.imageUrl || editingBlog.image))) && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={formData.image ? URL.createObjectURL(formData.image) : (editingBlog.imageUrl || 'http://googleusercontent.com/profile/picture/' + editingBlog.image)}
                      alt="Featured Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyles(formData.status).color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusStyles(formData.status).dot} mr-1.5`}></span>
                      {formData.status}
                    </span>
                    <span className="text-sm font-bold text-[#135bec] bg-[#135bec]/10 px-3 py-1 rounded-lg">
                      {formData.category}
                    </span>
                  </div>

                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {formData.title || "Untitled Post"}
                  </h1>

                  <div className="flex items-center gap-3 py-4 border-y border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#135bec]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#135bec]">person</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{formData.author || "Anonymous Author"}</p>
                      <p className="text-xs text-slate-500">Last updated today</p>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {formData.content || "No content written yet..."}
                    </p>
                  </div>
                </div>

                {/* Preview Mode Footer */}
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl sticky bottom-0 -mx-6 px-6">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(false)}
                    className="px-6 py-2.5 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Back to Editor
                  </button>
                  <button 
                    onClick={() => handleFormSubmit()}
                    className="px-6 py-2.5 rounded-lg font-bold text-white bg-[#135bec] hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                  >
                    {editingBlog ? "Update Post" : "Create Post"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <BlogDetailModal 
        isOpen={!!selectedBlogForView}
        onClose={() => setSelectedBlogForForView(null)}
        blog={selectedBlogForView}
      />
    </div>
  );
};

export default BlogManagement;
