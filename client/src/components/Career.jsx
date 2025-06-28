import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import axios from './axiosInstance';

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/careers");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="pt-5 mt-5">
      <h3 className="text-center mb-4">Current Job Openings</h3>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : jobs.length > 0 ? (
        <Row>
          {jobs.map((job) => (
            <Col key={job.id} md={6} lg={4} className="mb-4" data-aos="fade-up">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{job.position}</Card.Title>
                  <Card.Text>{job.description}</Card.Text>
                  <Card.Text>
                    <strong>Experience:</strong> {job.experience} years
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ): (
        <p className="text-center">No jobs available.</p>
      )
      }
    </Container>
  );
};

export default Career;
