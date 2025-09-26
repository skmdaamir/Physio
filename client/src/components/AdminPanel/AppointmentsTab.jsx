import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`/api/appointments`);
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const markAsDone = async (id) => {
    const remarks = remarksMap[id];
    if (!remarks) {
      toast.warning("Please enter remarks before marking as done.");
      return;
    }

    try {
      await axios.put(`/api/appointments/${id}/remark`, { remarks });
      toast.success("Marked as done!");
      fetchAppointments();
    } catch (error) {
      console.error("Error marking as done:", error);
      toast.error("Failed to update appointment.");
    }
  };

  const handleRemarksChange = (id, value) => {
    setRemarksMap((prev) => ({ ...prev, [id]: value }));
  };

  const allCount = appointments.length;
  const doneCount = appointments.filter((appt) => appt.remarks).length;
  const pendingCount = allCount - doneCount;

  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "done") return appt.remarks;
    if (filter === "pending") return !appt.remarks;
    return true;
  });

  return (
    <div className="w-full px-4 py-4">
      {/* Filter Buttons with Counts */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { type: "all", label: "All", count: allCount },
          { type: "pending", label: "Pending", count: pendingCount },
          { type: "done", label: "Done", count: doneCount },
        ].map(({ type, label, count }) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded text-sm font-medium transition flex items-center gap-2 ${
              filter === type
                ? type === "done"
                  ? "bg-green-600 text-white"
                  : type === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}{" "}
            <span className="text-xs bg-white text-black px-2 py-0.5 rounded-full">
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              {[
                "Name",
                "Mobile",
                "Email",
                "Place",
                "Treatment",
                "Conditions",
                "Date",
                "Action",
                "Remarks",
              ].map((head, i) => (
                <th key={i} className="p-2 text-left whitespace-nowrap">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt) => (
              <tr
                key={appt.id}
                className={`border-t ${
                  appt.remarks ? "bg-green-50" : "bg-white"
                }`}
              >
                <td className="p-2 whitespace-nowrap">{appt.name}</td>
                <td className="p-2 whitespace-nowrap">{appt.phone}</td>
                <td className="p-2 whitespace-nowrap">{appt.email}</td>
                <td className="p-2 whitespace-nowrap">{appt.place}</td>
                <td className="p-2 whitespace-nowrap">
  {Array.isArray(appt.treatmentType)
    ? appt.treatmentType.join(", ")
    : appt.treatmentType}
</td>
                <td className="p-2 whitespace-pre-line">{appt.conditions}</td>
                <td className="p-2 whitespace-nowrap">{appt.created_at}</td>
                <td className="p-2 min-w-[200px]">
                  {appt.remarks ? (
                    <span className="text-green-600 font-semibold">✔ Done</span>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <textarea
                        maxLength={1000}
                        rows={3}
                        className="border border-gray-300 rounded px-2 py-1 text-sm resize-none w-full"
                        placeholder="Enter remarks (max 1000 chars)"
                        value={remarksMap[appt.id] || ""}
                        onChange={(e) =>
                          handleRemarksChange(appt.id, e.target.value)
                        }
                      />
                      <button
                        className="bg-green-600 text-white text-sm py-1 rounded hover:bg-green-700"
                        onClick={() => markAsDone(appt.id)}
                      >
                        Mark as Done
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-2 break-words max-w-xs">{appt.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center text-gray-600 mt-6">
          No appointments found.
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;
