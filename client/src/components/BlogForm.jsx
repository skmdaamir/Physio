import React, { useState } from "react";
import axios from './axiosInstance';
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles




const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blogs");
    setBlogs(response.data);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "/api/blogs",
        formData
      );

      if (response.status === 201) {
        // Success
        fetchBlogs();
        setTitle("");
        setContent("");
        setImage(null);
        toast.success("Blog added successfully!");
      } else {
        // Handle any unexpected status codes
        toast.error("Failed to add blog.");
      }
    } catch (err) {
      console.error("Error uploading blog:", err);

      // Make sure to handle specific error responses from the server
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Failed to add blog.");
      } else {
        toast.error("Failed to add blog.");
      }
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default BlogForm;
