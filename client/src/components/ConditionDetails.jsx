// src/pages/ConditionDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Loader from "../components/Loader";

export default function ConditionDetails() {
  const { id } = useParams();
  const [condition, setCondition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCondition = async () => {
      try {
        const res = await axios.get(`/api/conditions/${id}`);
        setCondition(res.data);
      } catch (err) {
        console.error("Error fetching condition details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCondition();
  }, [id]);

  if (loading) return <Loader />;

  if (!condition) {
    return <div className="text-center py-8 text-red-500">Condition not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        {condition.name}
      </h1>

      {/* Flex row: Image left, Description right */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="md:w-1/2 w-full">
          <img
            src={`/uploads/conditions/${condition.image}`}
            alt={condition.name}
            className="w-full h-64 md:h-80 object-contain rounded-md shadow"
          />
        </div>
        <div className="md:w-1/2 w-full flex items-center">
          <div>
            <h2 className="font-semibold text-lg text-black mb-2">
              What is {condition.name} ?
            </h2>
            <p className="text-sm sm:text-base">{condition.description}</p>
          </div>
        </div>
      </div>

      {/* Other Details */}
      <div className="space-y-6 text-sm sm:text-base">
        <div>
          <h2 className="font-semibold text-lg text-black mb-1 py-10">
            Symptoms of {condition.name}
          </h2>
          {Array.isArray(condition.symptoms) ? (
            <ul className="list-disc list-inside space-y-2 text-black">
              {condition.symptoms.map((symptom, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{symptom.title}:</span>{" "}
                  <span>{symptom.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{condition.symptoms}</p>
          )}
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-lg text-black mb-1 py-10">
          Causes of {condition.name}
        </h2>
        {Array.isArray(condition.causes) ? (
          <ul className="space-y-2 list-disc list-inside text-black">
            {condition.causes.map((cause, idx) => (
              <li key={idx}>
                <span className="font-semibold">{cause.title}:</span>{" "}
                <span className="text-black">{cause.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black">{condition.causes}</p>
        )}
      </div>
      <div>
        <h2 className="font-semibold text-lg text-black mb-1 py-10">
          Treatment of {condition.name}
        </h2>
        {Array.isArray(condition.treatment) ? (
          <ul className="list-disc list-inside space-y-2 text-black">
            {condition.treatment.map((step, idx) => (
              <li key={idx}>
                <span className="font-semibold">{step.title}:</span>{" "}
                <span>{step.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{condition.treatment}</p>
        )}
      </div>
    </div>
  );
}
