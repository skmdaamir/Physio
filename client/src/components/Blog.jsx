import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Loader from "./Loader";
import { Helmet } from "react-helmet";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  // const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs/active");
      const activeBlogs = (res.data.blogs || res.data).filter(
        (blog) => blog.is_active === "Published" || blog.is_active === 1
      );
      setBlogs(activeBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="pt-24 pb-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Blogs | Physio Pulse</title>
      </Helmet>
      <h2
        className="text-3xl md:text-4xl text-center mb-10 text-black"
        data-aos="fade-up"
      >
        Our Latest Blogs
      </h2>

      {loading ? (
        <div className="text-center py-12">
          <Loader />
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {blog.image_url && (
                <div className="mb-4">
                  <img
                    src={`${blog.image_url.replace(/\\/g, "/")}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2 text-black">
                {blog.title}
              </h3>
              <p className="text-gray mb-4">
                {blog.content?.slice(0, 100) || "No description..."}
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                onClick={() => handleReadMore(blog)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-black-600">
          No blogs available.
        </p>
      )}

      {/* Modal */}
      {showModal && selectedBlog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-600 text-xl hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {selectedBlog.title}
            </h2>
            {selectedBlog.image_url && (
              <img
                src={`${selectedBlog.image_url.replace(/\\/g, "/")}`}
                alt={selectedBlog.title}
                className="w-full max-h-[300px] object-cover rounded-md mb-4"
              />
            )}
            <p className="text-gray-700 whitespace-pre-line">
              {selectedBlog.content}
            </p>
            <div className="mt-6 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
