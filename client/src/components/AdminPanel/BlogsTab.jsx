// AdminPanel/BlogsTab.jsx
import { useEffect, useState } from "react";
import { Card, Button, Col, Row, Modal, Form } from "react-bootstrap";
import axios from '../../axiosInstance';
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`/api/allBlogs`);
      console.log("Fetched blogs:", res.data.blogs);
      if (Array.isArray(res.data.blogs)) {
        setBlogs(res.data.blogs);
      } else {
        console.error("Expected array but got:", res.data.blogs);
        setBlogs([]); // fallback to avoid crash
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]); // safe fallback
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
      console.error("Delete error:", err);
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
        await axios.put(
          `/api/blogs/${selectedBlogId}`,
          formData
        );
        toast.success("Blog updated!");
      } else {
        await axios.post("/api/blogs", formData);
        toast.success("Blog added!");
      }
      fetchBlogs();
      resetModal();
    } catch (err) {
      console.error("Submit error:", err);
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
      console.error("Status toggle error:", err);
      toast.error("Failed to toggle status.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>All Blogs</h4>
        <Button onClick={() => setShowModal(true)}>Add Blog</Button>
      </div>

      <Row className="mt-4">
        {blogs.map((blog) => (
          <Col xs={12} sm={6} md={4} key={blog.id} className="mb-4">
            <Card>
              {blog.image_url && (
                <Card.Img
                  variant="top"
                  src={`${process.env.API_BASE_URL}/uploads/${process.env.blog.image_url}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
                <div className="d-flex justify-content-between mt-auto">
                  <Button size="sm" onClick={() => handleEdit(blog)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant={blog.is_active ? "warning" : "success"}
                    size="sm"
                    onClick={() => toggleStatus(blog.id, blog.is_active)}
                  >
                    {blog.is_active ? "Draft" : "Publish"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={resetModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Blog" : "Add Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="blogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="blogContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                rows={4}
                value={newBlog.content}
                onChange={handleBlogChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="blogImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleBlogChange}
              />
            </Form.Group>
            <Form.Group className="mt-3" controlId="blogStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={newBlog.status}
                onChange={handleBlogChange}
              >
                <option value="1">Published</option>
                <option value="0">Draft</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="mt-4" variant="primary">
              {editMode ? "Update Blog" : "Submit Blog"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BlogsTab;
