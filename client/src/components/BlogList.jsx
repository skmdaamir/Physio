import React, { useState, useEffect } from "react";
import axios from './axiosInstance';
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs when the component is mounted
    fetchBlogs();
  }, []);

  // Function to fetch blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data); // Set the blogs state
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to fetch blogs"); // Display error toast
    }
  };

  // Handle file change (image selection)
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      // Submit the blog post
      await axios.post("/api/blogs", formData);
      fetchBlogs(); // Fetch updated list of blogs
      setTitle(""); // Reset title input
      setContent(""); // Reset content input
      setImage(null); // Reset image input
      toast.success("Blog added successfully!"); // Show success toast
    } catch (err) {
      console.error("Error uploading blog:", err);
      toast.error("Failed to add blog."); // Show error toast
    }
  };

  return (
    <div className="blog-form">
      <h3>Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="mt-4">
        <h4>All Blogs</h4>
        <div>
          {blogs.map((blog) => (
            <div key={blog._id} className="mb-3">
              <h5>{blog.title}</h5>
              <p>{blog.content.slice(0, 100)}...</p>
              <img
                src={`/${blog.imagePath}`}
                alt="Blog"
                className="img-thumbnail"
                style={{ width: "150px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default BlogForm;
