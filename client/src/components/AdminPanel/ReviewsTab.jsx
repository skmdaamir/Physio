// AdminPanel/ReviewsTab.jsx
import { useEffect, useState } from "react";
import axios from '.../axiosInstance';
import { Table, Button } from "react-bootstrap";
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

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>{review.name}</td>
            <td>{review.rating}</td>
            <td>{review.comment}</td>
            <td>{review.created_at}</td>
            <td>
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
