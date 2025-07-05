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
              <div className="flex gap-2 mt-auto">
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
                <button
                  onClick={() => toggleStatus(blog.id, blog.is_active)}
                  className={`text-sm px-3 py-1 rounded ${
                    blog.is_active
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {blog.is_active ? "Draft" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={resetModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Blog" : "Add Blog"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={newBlog.title}
                  onChange={handleBlogChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  value={newBlog.content}
                  onChange={handleBlogChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleBlogChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Status</label>
                <select
                  name="status"
                  value={newBlog.status}
                  onChange={handleBlogChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="1">Published</option>
                  <option value="0">Draft</option>
                </select>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
