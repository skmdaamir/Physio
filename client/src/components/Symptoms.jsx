import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Loader from "../components/Loader";

export default function Symptoms() {
  const { id } = useParams();
  const [symptoms, setSymptoms] = useState([]);
  const [conditionName, setConditionName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await axios.post(`/api/conditions/details`, { id });
        const data = res.data;

        setConditionName(data.name);

        if (typeof data.symptoms === "string") {
          try {
            data.symptoms = JSON.parse(data.symptoms);
          } catch (err) {
            console.warn("Could not parse symptoms:", err);
          }
        }
        setSymptoms(data.symptoms || []);
      } catch (err) {
        console.error("Error fetching symptoms", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSymptoms();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 pt-24">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        Symptoms of {conditionName}
      </h1>
      {Array.isArray(symptoms) && symptoms.length > 0 ? (
        <ul className="list-disc list-inside space-y-3 text-black">
          {symptoms.map((symptom, idx) => (
            <li key={idx}>
              <span className="font-semibold">{symptom.title}:</span>{" "}
              <span>{symptom.description}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No symptoms found.</p>
      )}
    </div>
  );
}
