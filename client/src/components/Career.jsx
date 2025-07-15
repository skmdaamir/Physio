import { useEffect, useState } from "react";
import axios from "../axiosInstance";

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
    <div className="max-w-6xl mx-auto px-4 py-10 mt-16">
      <h3 className="text-3xl font-semibold text-center text-green-600 mb-8">
        Current Job Openings
      </h3>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {job.position}
              </h4>
              <p className="text-gray-700 mb-3">{job.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Experience:</strong> {job.experience} years
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No jobs available.
        </p>
      )}
    </div>
  );
};

export default Career;
