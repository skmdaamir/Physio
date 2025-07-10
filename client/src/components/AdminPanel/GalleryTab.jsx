import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
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
    if (newItem.youtubeLink) formData.append("youtubeLink", newItem.youtubeLink);

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
    <div className="px-4 py-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gallery</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Photo/Video
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="bg-white shadow rounded overflow-hidden">
            {item.image_path && (
              <img
                src={`/${item.image_path}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}

            {item.youtube_link && (
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtube_link.split("v=")[1]}`}
                  title="YouTube video"
                  allowFullScreen
                  className="absolute w-full h-full top-0 left-0"
                ></iframe>
              </div>
            )}

            <div className="p-4">
              <h4 className="text-md font-medium mb-2">{item.treatment_name}</h4>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md sm:max-w-lg p-6 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
              onClick={resetModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">Add Gallery Item</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1 text-sm">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newItem.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm">YouTube Video Link</label>
                <input
                  type="url"
                  name="youtubeLink"
                  value={newItem.youtubeLink}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded text-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
