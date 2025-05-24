
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";
import { Helmet } from "react-helmet";

const AdminPanel = () => {
  //
  const [appointments, setAppointments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [remarksMap, setRemarksMap] = useState({});
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
    status: "0",
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
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/allBlogs");
      setBlogs(Array.isArray(res.data) ? res.data : res.data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
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
    formData.append("status", newBlog.status);
    if (newBlog.image) {
      formData.append("image", newBlog.image);
    } else if (newBlog.existingImageUrl) {
      formData.append("image_url", newBlog.existingImageUrl); // fallback
    }
    // if (newBlog.image) formData.append("image", newBlog.image);

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/blogs/${selectedBlogId}`,
          formData
        );
        toast.success("Blog updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/blogs", formData);
        toast.success("Blog added successfully!");
      }

      await fetchBlogs();
      resetModal();
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("There was an error. Please try again.");
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedBlogId(null);
    setNewBlog({ title: "", content: "", image: null, status: "0" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete the blog");
      }
    }
  };

  const markAsDone = async (id) => {
    const remarks = remarksMap[id];
    if (!remarks) {
      toast.warning("Please enter remarks before marking as done.");
      return;
    }

    try {
      await axios.put(
          `http://localhost:5000/api/appointments/${id}/remark`,
        {
          remarks,
        }
      );
      toast.success("Marked as done!");
      fetchAppointments();
    } catch (error) {
      console.error("Error marking as done:", error);
      toast.error("Failed to update appointment.");
    }
  };

  const handleRemarksChange = (id, value) => {
    setRemarksMap((prev) => ({ ...prev, [id]: value }));
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

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/blogs/${id}/status`, {
        is_active: currentStatus,
      });
      toast.info("Blog status updated!");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Status update error:", error);
    }
  };

  return (
    <div className="container-fluid mt-3 px-2 px-md-4">
      <Helmet>
        <title>Admin Panel | Physio Pulse</title>
      </Helmet>
      <h2>Dashboard</h2>
      <Tabs defaultActiveKey="appointments" className="mt-4">
        <Tab eventKey="appointments" title="Appointments">
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>State</th>
                <th>City</th>
                <th>Treatment</th>
                <th>Conditions</th>
                <th>Appointment Received Date</th>
                <th>Action</th>
                <th>After treatment Remarks</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={index}>
                  <td>{appt.name}</td>
                  <td>{appt.phone}</td>
                  <td>{appt.email}</td>
                  <td>{appt.state}</td>
                  <td>{appt.city}</td>
                  <td>{appt.treatmentType}</td>
                  <td>{appt.conditions}</td>
                  <td>{appt.created_at}</td>
                  <td>
                    {appt.remarks ? (
                      "✔️ Done"
                    ) : (
                      <>
                        <Form.Control
                          type="text"
                          placeholder="Enter remarks"
                          size="sm"
                          name="remarks"
                          value={remarksMap[appt.id] || ""}
                          onChange={(e) =>
                            handleRemarksChange(appt.id, e.target.value)
                          }
                        />
                        <Button
                          variant="success"
                          size="sm"
                          className="mt-1"
                          onClick={() => markAsDone(appt.id)}
                        >
                          Mark as Done
                        </Button>
                      </>
                    )}
                  </td>
                  <td>{appt.remarks}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="blogs" title="Blogs">
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
                      src={blog.image_url}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body
                    className="d-flex flex-column"
                    style={{ height: "200px", objectFit: "cover" }}
                  >
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(blog)}
                      >
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
                        variant="warning"
                        size="sm"
                        onClick={() => toggleStatus(blog.id, blog.is_active)}
                      >
                        {blog.is_active === 0 ? "Draft" : "Publish"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      {/* Blog Modal */}
      <Modal show={showModal} onHide={resetModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Blog" : "Add New Blog"}</Modal.Title>
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
                rows={4}
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
            <Form.Group controlId="formStatus" className="mt-3">
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
            <Button variant="primary" type="submit" className="mt-4">
              {editMode ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AdminPanel;
