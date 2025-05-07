import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import blog1 from "../assets/docs/blog1.jpg";
import blog2 from "../assets/docs/blog2.jpg";
import blog3 from "../assets/docs/blog3.jpg";
import blog4 from "../assets/docs/blog4.jpg";

const blogs = [
  {
    id: 1,
    title: "Benefits of Physiotherapy After Injury",
    desc: "Discover how physiotherapy speeds up recovery and prevents future injuries.",
    image: blog1,
  },
  {
    id: 2,
    title: "Top Exercises for Back Pain Relief",
    desc: "Learn simple exercises you can do at home to ease your back pain.",
    image: blog2,
  },
  {
    id: 3,
    title: "Post-Surgery Physiotherapy Explained",
    desc: "Why therapy after surgery is critical for a full and fast recovery.",
    image: blog3,
  },
  {
    id: 4,
    title: "Importance of Good Posture in Daily Life",
    desc: "Find out how correct posture can prevent many physical problems.",
    image: blog4,
  },
];

const Blog = () => {
  return (
    <section className="blog-section py-5">
      <Container>
        <h2 className="text-center mb-5" data-aos="fade-up">
          Our Latest Blogs
        </h2>
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
                <div className="blog-img-container">
                  <Card.Img variant="top" src={blog.image} />
                </div>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.desc}</Card.Text>
                  <Button variant="primary" className="read-more-btn">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Blog;
