// AdminPanel/AdminPanel.jsx
import { Tabs, Tab } from "react-bootstrap";
import { Helmet } from "react-helmet";
import AppointmentsTab from "./AppointmentsTab";
import ReviewsTab from "./ReviewsTab";
import BlogsTab from "./BlogsTab";
import GalleryTab from "./GalleryTab";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";
import CareersTab from "./CareersTab";

const AdminPanel = () => {
  return (
    <div className="container-fluid mt-3 px-2 px-md-4">
      <Helmet>
        <title>Admin Panel | Physio Pulse & Rehabilitation Studio (PPRS)</title>
      </Helmet>
      <h2>Dashboard</h2>
      <Tabs defaultActiveKey="appointments" className="mt-4">
        <Tab eventKey="appointments" title="Appointments">
          <AppointmentsTab />
        </Tab>
        <Tab eventKey="reviews" title="Reviews">
          <ReviewsTab />
        </Tab>
        <Tab eventKey="blogs" title="Blogs">
          <BlogsTab />
        </Tab>
        <Tab eventKey="gallery" title="Gallery">
          <GalleryTab />
        </Tab>
        <Tab eventKey="career" title="Career">
          <CareersTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
