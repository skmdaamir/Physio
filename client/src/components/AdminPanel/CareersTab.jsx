import { useState, useEffect } from "react";
import axios from "../../axiosInstance";

const CareersTab = () => {
  const [careers, setCareers] = useState([]);
  const [form, setForm] = useState({
    position: "",
    description: "",
    experience: "",
  });

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    const res = await axios.get("/api/careers");
    setCareers(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("/api/careers", form);
    setForm({ position: "", description: "", experience: "" });
    fetchCareers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/careers/${id}`);
    fetchCareers();
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Add New Job Opening</h3>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Position"
          required
          className="border rounded px-3 py-2 w-full"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          required
          className="border rounded px-3 py-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Experience (in years)"
          required
          className="border rounded px-3 py-2 w-full"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 w-full"
        >
          Add
        </button>
      </form>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Position</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Experience</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((job) => (
              <tr key={job.id} className="text-center">
                <td className="px-4 py-2 border">{job.position}</td>
                <td className="px-4 py-2 border">{job.description}</td>
                <td className="px-4 py-2 border">{job.experience} years</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No openings added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareersTab;
