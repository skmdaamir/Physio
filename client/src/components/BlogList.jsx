import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogList = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to fetch blogs");
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await axios.post("/api/blogs", formData);
      fetchBlogs();
      setTitle("");
      setContent("");
      setImage(null);
      toast.success("Blog added successfully!");
    } catch (err) {
      console.error("Error uploading blog:", err);
      toast.error("Failed to add blog.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10">
      <h3 className="text-2xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
        Add New Blog
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full px-4 py-2 h-32 border border-gray-300 dark:border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
        ></textarea>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-white file:bg-green-600 hover:file:bg-green-700 dark:file:bg-green-500 dark:hover:file:bg-green-600"
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
        >
          Submit
        </button>
      </form>

      <div className="mt-8">
        <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">All Blogs</h4>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800"
            >
              <h5 className="text-lg font-bold text-green-700 dark:text-green-400">
                {blog.title}
              </h5>
              <p className="text-gray-700 dark:text-gray-300">
                {blog.content.slice(0, 100)}...
              </p>
              {blog.imagePath && (
                <img
                  src={`${blog.imagePath}`}
                  alt="Blog"
                  className="mt-2 w-40 h-auto rounded-md border border-gray-300 dark:border-gray-600"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default BlogList;
