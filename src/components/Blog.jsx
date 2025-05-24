import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import { Helmet } from "react-helmet";


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

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
      const res = await axios.get("http://localhost:5000/api/allBlogs");
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
    <section className="blog-section py-5">
      <Helmet>
        <title>Blogs | Physio Pulse</title>
      </Helmet>
      <Container>
        <h2 className="text-center mb-5" data-aos="fade-up">
          Our Latest Blogs
        </h2>
        {loading ? (
          <div className="text-center py-5">
            <Loader />
          </div>
        ) : blogs.length > 0 ? (
          <Row>
            {blogs.map((blog, index) => (
              <Col
                md={6}
                lg={4}
                className="mb-4"
                key={blog.id}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <Card className="blog-card">
                  {blog.image_url && (
                    <div className="blog-img-container">
                      <Card.Img variant="top" src={blog.image_url} />
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>
                      {blog.content?.slice(0, 100) || "No description..."}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="read-more-btn"
                      onClick={() => handleReadMore(blog)}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No blogs available.</p>
        )}

        {/* Blog Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          {selectedBlog && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedBlog.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedBlog.image_url && (
                  <img
                    src={selectedBlog.image_url}
                    alt={selectedBlog.title}
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                    className="img-fluid mb-3"
                  />
                )}
                <p>{selectedBlog.content}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </section>
  );
};

export default Blog;
