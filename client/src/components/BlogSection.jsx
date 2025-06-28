import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import axios from './axiosInstance';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        "/api/blogs/active"
      );
      setBlogs(response.data);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-section">
      <h2>Blog Management</h2>
      <BlogForm />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default BlogSection;
