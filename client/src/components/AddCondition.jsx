import { useState } from 'react';
import axios from '../axiosInstance';

const AddCondition = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    symptoms: '',
    causes: '',
    treatment: '',
  });
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);

    try {
      await axios.post('/api/conditions', data);
      setSuccess("Condition added successfully!");
      setForm({ name: '', description: '', symptoms: '', causes: '', treatment: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      setSuccess("Failed to add condition.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add New Condition</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'description', 'symptoms', 'causes', 'treatment'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize mb-1">{field}</label>
            <textarea
              name={field}
              rows={field === 'name' ? 1 : 3}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border rounded p-2 text-sm"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Image</label>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      </form>
    </div>
  );
};

export default AddCondition;
