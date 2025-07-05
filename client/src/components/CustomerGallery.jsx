import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";

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
      const res = await axios.get("/api/gallery");
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
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-6">
        Our Treatment Gallery
      </h3>

      {loading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : galleryItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded shadow hover:shadow-lg transition duration-300 cursor-pointer"
              data-aos="fade-up"
              onClick={() => handleShow(item)}
            >
              {item.image_path ? (
                <img
                  src={`/${item.image_path.replace(/\\/g, "/")}`}
                  alt="Gallery"
                  className="w-full h-48 object-cover rounded-t hover:scale-105 transition-transform duration-300"
                />
              ) : item.youtube_link ? (
                <div className="relative pb-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeID(
                      item.youtube_link
                    )}`}
                    title="YouTube video"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-t"
                  ></iframe>
                </div>
              ) : null}

              <div className="p-2 text-center">
                <h4
                  className="text-base font-medium truncate"
                  title={item.treatment_name || "Treatment"}
                >
                  {item.treatment_name || "Treatment"}
                </h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-10">No gallery available.</p>
      )}

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden shadow-lg animate-fadeIn">
            <div className="flex justify-between items-center p-4 border-b">
              <h5 className="text-lg font-semibold">
                {modalData?.treatment_name || "Treatment Detail"}
              </h5>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-red-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4 text-center">
              {modalData?.image_path ? (
                <img
                  src={`/${modalData.image_path.replace(/\\/g, "/")}`}
                  alt="Enlarged"
                  className="w-full h-auto rounded"
                />
              ) : modalData?.youtube_link ? (
                <div className="relative pb-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeID(
                      modalData.youtube_link
                    )}`}
                    title="YouTube video"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded"
                  ></iframe>
                </div>
              ) : (
                <p>No media available</p>
              )}
            </div>
            <div className="p-4 border-t text-right">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerGallery;
