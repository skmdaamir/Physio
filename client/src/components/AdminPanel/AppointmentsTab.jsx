// AdminPanel/AppointmentsTab.jsx
import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from '../../../axiosInstance';
import { toast } from "react-toastify";

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});

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
      await axios.put(`/api/appointments/${id}/remark`, {
        remarks,
      });
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

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>State</th>
          <th>City</th>
          <th>Treatment</th>
          <th>Conditions</th>
          <th>Appointment Received Date</th>
          <th>Action</th>
          <th>After Treatment Remarks</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appt, index) => (
          <tr key={index}>
            <td>{appt.name}</td>
            <td>{appt.phone}</td>
            <td>{appt.email}</td>
            <td>{appt.state}</td>
            <td>{appt.city}</td>
            <td>{appt.treatmentType}</td>
            <td>{appt.conditions}</td>
            <td>{appt.created_at}</td>
            <td>
              {appt.remarks ? (
                "✔️ Done"
              ) : (
                <>
                  <Form.Control
                    type="text"
                    placeholder="Enter remarks"
                    size="sm"
                    name="remarks"
                    value={remarksMap[appt.id] || ""}
                    onChange={(e) =>
                      handleRemarksChange(appt.id, e.target.value)
                    }
                  />
                  <Button
                    variant="success"
                    size="sm"
                    className="mt-1"
                    onClick={() => markAsDone(appt.id)}
                  >
                    Mark as Done
                  </Button>
                </>
              )}
            </td>
            <td>{appt.remarks}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AppointmentsTab;
