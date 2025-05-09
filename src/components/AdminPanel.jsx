import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
  });

  useEffect(() => {
    fetchAppointments();
    fetchBlogs();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      // Optionally, update the UI to inform the user
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/allBlogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Optionally, update the UI to inform the user
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

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    if (newBlog.image) formData.append("image", newBlog.image);

    await axios.post("/api/blogs", formData);
    fetchBlogs();
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>

      <section className="mt-4">
        <h4>Appointments</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{appt.name}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.reason}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <section className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Blogs</h4>
          <Button onClick={() => setShowModal(true)}>Add Blog</Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={index}>
                <td>{blog.title}</td>
                <td>{blog.content.slice(0, 100)}...</td>
                <td>
                  {blog.imagePath && (
                    <img
                      src={blog.imagePath}
                      alt="blog"
                      style={{ width: "80px" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBlogSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={newBlog.content}
                onChange={handleBlogChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleBlogChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPanel;
