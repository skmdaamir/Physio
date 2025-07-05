import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import { Helmet } from "react-helmet";

const AppointmentForm = ({ isModal = false }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    treatmentType: "",
    state: "",
    city: "",
    conditions: "",
  });
  const [treatments, setTreatments] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
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
    try {
      await axios.post("/api/appointments", form);
      alert("Appointment submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        treatmentType: "",
        state: "",
        city: "",
        conditions: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit appointment.");
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Treatment Type</label>
          <select
            name="treatmentType"
            value={form.treatmentType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
          >
            <option value="">Select</option>
            {treatments.map((t) => (
              <option key={t.treatment_id} value={t.treatment_id}>
                {t.treatment_description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
          >
            <option value="">Select</option>
            {states.map((s) => (
              <option key={s.state_id} value={s.state_id}>
                {s.state_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-base"
          >
            <option value="">Select</option>
            {cities.map((c) => (
              <option key={c.city_id} value={c.city_id}>
                {c.city_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Brief About Your Condition</label>
        <textarea
          rows={5}
          name="conditions"
          value={form.conditions}
          onChange={handleChange}
          maxLength={4000}
          required
          className="w-full border border-gray-300 rounded-lg p-3 text-base"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg w-full md:w-auto"
        >
          Submit Appointment
        </button>
      </div>
    </form>
  );

  return isModal ? (
    formContent
  ) : (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>Appointment Form | Physio Pulse</title>
      </Helmet>
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        Book an Appointment
      </h2>
      {formContent}
    </div>
  );
};

export default AppointmentForm;
