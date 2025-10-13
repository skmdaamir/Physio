import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

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
    Swal.fire({
  title: 'Are you sure?',
  text: 'Are you sure you want to delete this review?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6',
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'Cancel'
}).then(async (result) => {
  if (result.isConfirmed) {
    try {
      await axios.delete(`/api/reviews/${id}`);
      toast.success("Review deleted!");
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("Failed to delete review.");
    }
  }
});
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
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow-sm text-sm">
        <thead className="bg-gray-100 text-gray-700 font-medium text-nowrap">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Rating</th>
            <th className="px-4 py-2 border">Comment</th>
              <th className="px-4 py-2 border">Place</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id} className="text-center">
              <td className="border px-4 py-2">{review.name}</td>
              <td className="border px-4 py-2">{review.rating}</td>
              <td className="border px-4 py-2 text-left">{review.description}</td>
              <td className="border px-4 py-2 text-left">{ review.place}</td>
              <td className="border px-4 py-2">
                {new Date(review.created_at).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    review.visible
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {review.visible ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() =>
                    handleToggleVisibility(review.id, review.visible)
                  }
                  className={`px-3 py-1 rounded text-white text-xs ${
                    review.visible ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {review.visible ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {reviews.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTab;
