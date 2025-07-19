import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
    status: "0",
  });
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`/api/allBlogs`);
      if (Array.isArray(res.data.blogs)) {
        setBlogs(res.data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    }
  };

  const handleBlogChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewBlog({ ...newBlog, image: files[0] });
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedBlogId(null);
    setNewBlog({ title: "", content: "", image: null, status: "0" });
  };

  const handleEdit = (blog) => {
    setSelectedBlogId(blog.id);
    setNewBlog({
      title: blog.title,
      content: blog.content,
      image: null,
      existingImageUrl: blog.image_url,
      status: blog.is_active,
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      toast.success("Blog deleted!");
      fetchBlogs();
    } catch (err) {
      toast.error("Error deleting blog.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("status", newBlog.status);
    if (newBlog.image) {
      formData.append("image", newBlog.image);
    } else if (newBlog.existingImageUrl) {
      formData.append("image_url", newBlog.existingImageUrl);
    }

    try {
      if (editMode) {
        await axios.put(`/api/blogs/${selectedBlogId}`, formData);
        toast.success("Blog updated!");
      } else {
        await axios.post("/api/blogs", formData);
        toast.success("Blog added!");
      }
      fetchBlogs();
      resetModal();
    } catch (err) {
      toast.error("Error saving blog.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`/api/blogs/${id}/status`, {
        is_active: currentStatus === 1 ? 0 : 1,
      });
      toast.success("Status updated!");
      fetchBlogs();
    } catch (err) {
      toast.error("Failed to toggle status.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Blogs</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Blog
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow rounded overflow-hidden">
            {blog.image_url && (
              <img
                src={`${BASE_URL}/uploads/${blog.image_url.split("/").pop()}`}
                alt="Blog"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col justify-between h-full">
              <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-700 mb-3">
                {blog.content ? `${blog.content.slice(0, 100)}...` : "No content"}
              </p>
              <div className="flex gap-2 mt-auto flex-wrap items-center">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">
                    {blog.is_active ? "Published" : "Draft"}
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={blog.is_active === 1}
                      onChange={() => toggleStatus(blog.id, blog.is_active)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 transition-all"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg sm:max-w-xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-600"
              onClick={resetModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              {editMode ? "Edit Blog" : "Add Blog"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium text-sm">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={newBlog.title}
                  onChange={handleBlogChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm">Content</label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  value={newBlog.content}
                  onChange={handleBlogChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleBlogChange}
                  className="w-full text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm">Status</label>
                <select
                  name="status"
                  value={newBlog.status}
                  onChange={handleBlogChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="1">Published</option>
                  <option value="0">Draft</option>
                </select>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold"
                >
                  {editMode ? "Update Blog" : "Submit Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsTab;
