import { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import axios from '../../axiosInstance';

const CareersTab = () => {
  const [careers, setCareers] = useState([]);
  const [form, setForm] = useState({
    position: "",
    description: "",
    experience: "",
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    const res = await axios.get("/api/careers");
    setCareers(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("/api/careers", form);
    setForm({ position: "", description: "", experience: "" });
    fetchCareers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/careers/${id}`);
    fetchCareers();
  };

  return (
    <div>
      <h5>Add New Job Opening</h5>
      <Form onSubmit={handleAdd} className="mb-4">
        <Row>
          <Col>
            <Form.Control
              placeholder="Position"
              required
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Experience (in years)"
              required
              type="number"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />
          </Col>
          <Col>
            <Button type="submit">Add</Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            <th>Description</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((job) => (
            <tr key={job.id}>
              <td>{job.position}</td>
              <td>{job.description}</td>
              <td>{job.experience} years</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(job.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CareersTab;
