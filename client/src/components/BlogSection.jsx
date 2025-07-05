import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import axios from "../axiosInstance";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/active");
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-600 dark:text-green-400">
        Blog Management
      </h2>
      <BlogForm />
      <div className="mt-10">
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogSection;
