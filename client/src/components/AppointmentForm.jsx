import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "../axiosInstance";
import Swal from 'sweetalert2';

export default function AppointmentForm({ isModal = false, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    treatmentType: [],
    conditions: "",
  });
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    const res = await axios.get("/api/treatment");
    setTreatments(res.data);
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
      Swal.fire({
  icon: 'warning',
  title: 'No Treatment Selected',
  text: 'Please select at least one treatment.',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'OK'
});
      return;
    }
    try {
      await axios.post("/api/appointments", form);
      Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Appointment submitted successfully!',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'OK'
});
      setForm({
        name: "",
        email: "",
        phone: "",
        treatmentType: [],
        place: "",
        conditions: "",
      });
      onClose?.(); // Close modal if passed
    } catch (error) {
      // console.error("Submission error:", error);
      Swal.fire({
  icon: 'error',
  title: 'Failed!',
  text: 'Failed to submit appointment.',
  confirmButtonColor: '#d33',
  confirmButtonText: 'OK'
});
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
            <label className="font-medium">Place</label>
            <input
              name="place"
              value={form.place}
              onChange={handleChange}
              required
              className="p-1.5 rounded border border-gray-300"
            />
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