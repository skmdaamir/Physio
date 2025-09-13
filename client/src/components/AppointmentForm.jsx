import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "../axiosInstance";

export default function AppointmentForm({ isModal = false, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    treatmentType: [],
    conditions: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchTreatments();
    fetchStates();
  }, []);

  useEffect(() => {
    if (form.state) {
      fetchCities(form.state);
    }
  }, [form.state]);

  const fetchTreatments = async () => {
    const res = await axios.get("/api/treatment");
    setTreatments(res.data);
  };

  const fetchStates = async () => {
    const res = await axios.get("/api/states");
    setStates(res.data);
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(`/api/cities/${stateId}`);
      setCities(res.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.treatmentType.length === 0) {
      alert("Please select at least one treatment.");
      return;
    }
    try {
      await axios.post("/api/appointments", form);
      alert("Appointment submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        treatmentType: [],
        state: "",
        city: "",
        conditions: "",
      });
      onClose?.(); // Close modal if passed
    } catch (error) {
      // console.error("Submission error:", error);
      alert("Failed to submit appointment.");
    }
  };

  return (
    <div className={`w-full ${isModal ? "px-1 py-2" : "min-h-screen px-3 py-6 pt-24 flex justify-center items-start bg-white"}`}>
      <form
  onSubmit={handleSubmit}
  className={`
    w-full
    ${isModal 
      ? "max-w-full shadow-none p-2 text-xs" 
      : "max-w-3xl p-8 shadow-lg text-base"}
    bg-white text-black rounded-lg space-y-6
  `}
  data-aos="fade-up"
>
        {!isModal && (
  <h2 className="text-center text-3xl font-semibold">
    Book Appointment
  </h2>
)}

        {/* Treatment Field */}
        <div>
          <label className="block mb-1 font-medium">Select what you are looking for</label>
          <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto space-y-1">
            {treatments.map((t) => (
              <label
                key={t.treatment_id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={t.treatment_id}
                  checked={form.treatmentType.includes(String(t.treatment_id))}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm((prev) => {
                      const current = [...prev.treatmentType];
                      return {
                        ...prev,
                        treatmentType: current.includes(value)
                          ? current.filter((id) => id !== value)
                          : [...current, value],
                      };
                    });
                  }}
                />
                <span>{t.treatment_description}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Input Fields - 2 columns */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-1.5 rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="p-1.5 rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="p-1.5 rounded border border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">State</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="p-1.5 rounded border border-gray-300"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.state_id} value={s.state_id}>
                  {s.state_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">City</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="p-1.5 rounded border border-gray-300"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-1">
            <label className="font-medium">Breif you conditions</label>
            <textarea name="conditions"
              value={form.conditions}
              onChange={handleChange}
              className="p-1.5 rounded border border-gray-300">
              </textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}