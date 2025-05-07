import React from "react";
import axios from "axios";

const BlogList = ({ blogs }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      // Refresh blog list or show success
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/blogs/${id}/status`, {
        is_active: status,
      });
      // Refresh blog list or show success
    } catch (err) {
      console.error("Error changing blog status:", err);
    }
  };

  return (
    <div className="blog-list">
      <h3>Blog List</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            <img
              src={`http://localhost:5000/${blog.image_url}`}
              alt={blog.title}
            />
            <button
              onClick={() => handleDelete(blog.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button
              onClick={() =>
                handleStatusChange(blog.id, blog.is_active ? 0 : 1)
              }
              className="btn btn-warning"
            >
              {blog.is_active ? "Disable" : "Enable"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
