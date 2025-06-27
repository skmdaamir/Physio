import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Spinner,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CustomerGallery.css";

const CustomerGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchGallery();
    AOS.init({ duration: 800 });
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setGalleryItems(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeID = (url) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w-]+)/);
    return match ? match[1] : null;
  };

  const handleShow = (item) => setModalData(item);
  const handleClose = () => setModalData(null);

  return (
    <Container className="pt-5 mt-5">
      <h3 className="mb-4 text-center">Our Treatment Gallery</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : galleryItems.length > 0 ? (
        <Row>
          {galleryItems.map((item, idx) => (
            <Col
              key={idx}
              xs={6}
              sm={6}
              md={4}
              lg={4}
              className="mb-4"
              data-aos="fade-up"
            >
              <Card
                className="h-100 shadow-sm gallery-card"
                onClick={() => handleShow(item)}
                style={{ cursor: "pointer" }}
              >
                {item.image_path && (
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${item.image_path.replace(
                      /\\/g,
                      "/"
                    )}`}
                    className="hover-zoom"
                    style={{
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                )}

                {!item.image_path && item.youtube_link && (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeID(
                        item.youtube_link
                      )}`}
                      title="YouTube video"
                      allowFullScreen
                      className="rounded"
                    ></iframe>
                  </div>
                )}

                <Card.Body className="d-flex justify-content-center align-items-center">
                  <Card.Title
                    className="text-center text-truncate w-100"
                    title={item.treatment_name || "Treatment"}
                    style={{
                      fontSize: "1rem",
                      minHeight: "2.5rem",
                    }}
                  >
                    {item.treatment_name || "Treatment"}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No gallery available.</p>
      )
      }

      {/* Modal */}
      <Modal show={!!modalData} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalData?.treatment_name || "Treatment Detail"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {modalData?.image_path ? (
            <img
              src={`http://localhost:5000/${modalData.image_path.replace(
                /\\/g,
                "/"
              )}`}
              alt="Enlarged"
              className="img-fluid rounded"
            />
          ) : modalData?.youtube_link ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeID(
                  modalData.youtube_link
                )}`}
                title="YouTube video"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          ) : (
            <p>No media available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomerGallery;
