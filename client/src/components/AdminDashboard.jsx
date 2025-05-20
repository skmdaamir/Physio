import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BlogSection from "./BlogSection";

const AdminDashboard = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Route path="/admin" exact component={BlogSection} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
