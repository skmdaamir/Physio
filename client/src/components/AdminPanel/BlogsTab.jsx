import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import BlogImagePreview from "./BlogImagePreview"
import Swal from 'sweetalert2';

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

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    debugger;
    try {
      const res = await axios.get(`/api/blogs/allBlogs`);
        setBlogs(res.data);
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
   Swal.fire({
  title: 'Are you sure?',
  text: 'Are you sure you want to delete this blog?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'Cancel'
}).then(async (result) => {
  if (result.isConfirmed) {
    try {
      await axios.delete(`/api/blogs/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Blog deleted successfully!',
        timer: 2000,
        showConfirmButton: false
      });
      fetchBlogs();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error deleting blog.',
        confirmButtonColor: '#d33'
      });
    }
  }
});
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
    console.log(currentStatus);
    try {
      await axios.put(`/api/blogs/${id}/status`, {
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

      <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-200 bg-white shadow rounded">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 border">Image</th>
        <th className="px-4 py-2 border">Title</th>
        <th className="px-4 py-2 border">Content</th>
        <th className="px-4 py-2 border">Status</th>
        <th className="px-4 py-2 border">Actions</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog) => (
        <tr key={blog.id} className="hover:bg-gray-50">
          <td className="px-4 py-2 border">
            {blog.image_url && <BlogImagePreview imageUrl={blog.image_url} />}
          </td>
          <td className="px-4 py-2 border">{blog.title}</td>
          <td className="px-4 py-2 border text-sm">
            {blog.content ? `${blog.content.slice(0, 60)}...` : "No content"}
          </td>
          <td className="px-4 py-2 border">
            {blog.is_active ? "Published" : "Draft"}
          </td>
          <td className="px-4 py-2 border space-x-2">
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
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              {blog.is_active ? "Unpublish" : "Publish"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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
