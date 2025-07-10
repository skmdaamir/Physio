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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-6 md:px-10">
      <Helmet>
        <title>Admin Panel | Physio Pulse & Rehabilitation Studio (PPRS)</title>
      </Helmet>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h2>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 shadow 
              ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-800 hover:bg-blue-100"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
