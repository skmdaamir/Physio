import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { Table, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const ReviewsTab = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/api/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`/api/reviews/${id}`);
      toast.success("Review deleted!");
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review.");
    }
  };

  const handleToggleVisibility = async (id, currentStatus) => {
    try {
      await axios.put(`/api/reviewVisibility/${id}`, {
        isActive: !currentStatus,
      });
      toast.success("Review visibility updated!");
      fetchReviews();
    } catch (err) {
      console.error("Error updating review visibility:", err);
      toast.error("Failed to update review visibility.");
    }
  };

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>{review.name}</td>
            <td>{review.rating}</td>
            <td>{review.description}</td>
            <td>{new Date(review.created_at).toLocaleString()}</td>
            <td>
              <Badge bg={review.visible ? "success" : "secondary"}>
                {review.visible ? "Active" : "Inactive"}
              </Badge>
            </td>
            <td>
              <Button
                variant={review.visible ? "warning" : "success"}
                size="sm"
                className="me-2"
                onClick={() => handleToggleVisibility(review.id, review.visible)}
              >
                {review.visible ? "Deactivate" : "Activate"}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReviewsTab;
