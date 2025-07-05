import { useState } from "react";
import Rating from "react-rating";
import { toast, ToastContainer } from "react-toastify";
import axios from "../axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    rating: 0,
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/submit-review", formData);
      toast.success("Thank you for your feedback!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        rating: 0,
        description: "",
      });
    } catch (err) {
      toast.error("Submission failed. Try again.");
    }
  };

  return (
    <div className="py-6 px-4 max-w-3xl mx-auto" data-aos="fade-up">
      <h3 className="text-2xl font-semibold text-center mb-6">Leave a Review</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-5"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your mobile number"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Rating</label>
          <Rating
            emptySymbol={<span className="text-3xl text-gray-300">☆</span>}
            fullSymbol={<span className="text-3xl text-yellow-400">★</span>}
            fractions={2}
            initialRating={formData.rating}
            onChange={handleRating}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your feedback..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ReviewForm;
