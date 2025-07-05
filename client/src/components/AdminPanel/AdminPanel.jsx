import { useState } from "react";
import { Helmet } from "react-helmet";
import AppointmentsTab from "./AppointmentsTab";
import ReviewsTab from "./ReviewsTab";
import BlogsTab from "./BlogsTab";
import GalleryTab from "./GalleryTab";
import CareersTab from "./CareersTab";

const tabItems = [
  { key: "appointments", label: "Appointments", Component: AppointmentsTab },
  { key: "reviews", label: "Reviews", Component: ReviewsTab },
  { key: "blogs", label: "Blogs", Component: BlogsTab },
  { key: "gallery", label: "Gallery", Component: GalleryTab },
  { key: "career", label: "Career", Component: CareersTab },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const renderTabContent = () => {
    const currentTab = tabItems.find((item) => item.key === activeTab);
    return currentTab ? <currentTab.Component /> : null;
  };

  return (
    <div className="w-full px-4 md:px-8 mt-6">
      <Helmet>
        <title>Admin Panel | Physio Pulse & Rehabilitation Studio (PPRS)</title>
      </Helmet>

      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-300 mb-4">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-md text-sm sm:text-base font-medium transition-all duration-300
              ${activeTab === tab.key
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow-sm">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
