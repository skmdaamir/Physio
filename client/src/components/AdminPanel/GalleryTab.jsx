// AdminPanel/GalleryTab.jsx
import { useEffect, useState } from "react";
import { Card, Button, Col, Row, Modal, Form } from "react-bootstrap";
import axios from '.../axiosInstance';
import { toast } from "react-toastify";

const GalleryTab = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    image: null,
    youtubeLink: "",
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("/api/gallery");
      setGalleryItems(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewItem({ ...newItem, image: files[0] });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const resetModal = () => {
    setNewItem({ title: "", image: null, youtubeLink: "" });
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newItem.title || (!newItem.image && !newItem.youtubeLink)) {
      toast.error("Please provide an image or YouTube link with title.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newItem.title);
    if (newItem.image) formData.append("image", newItem.image);
    if (newItem.youtubeLink)
      formData.append("youtubeLink", newItem.youtubeLink);

    try {
      await axios.post("/api/upload-photo", formData);
      toast.success("Gallery item added!");
      fetchGallery();
      resetModal();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Error uploading item.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`/api/gallery/${id}`);
      toast.success("Item deleted!");
      fetchGallery();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete item.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Gallery</h4>
        <Button onClick={() => setShowModal(true)}>Add Photo/Video</Button>
      </div>

      <Row className="mt-4">
        {galleryItems.map((item) => (
          <Col xs={12} sm={6} md={4} key={item.id} className="mb-4">
            <Card>
              {item.image_path && (
                <Card.Img
                  variant="top"
                  src={`/${item.image_path}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              {item.youtube_link && (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      item.youtube_link.split("v=")[1]
                    }`}
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <Card.Body>
                <Card.Title>{item.treatment_name}</Card.Title>
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={resetModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Gallery Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="galleryTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3" controlId="galleryImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3" controlId="youtubeLink">
              <Form.Label>YouTube Video Link</Form.Label>
              <Form.Control
                type="url"
                name="youtubeLink"
                value={newItem.youtubeLink}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=video_id"
              />
            </Form.Group>

            <Button type="submit" className="mt-4" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GalleryTab;
