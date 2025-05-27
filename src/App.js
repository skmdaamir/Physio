import React, { useEffect, useState } from "react";
import {
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import AppointmentForm from "./components/AppointmentForm";
import AboutUs from "./components/AboutUs";
import CarouselSlide from "./components/CarouselSlide";
import AOS from "aos";
import "./App.css";
import HomePage from "./components/HomePage";
import Blog from "./components/Blog";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Helmet } from "react-helmet";
import ScrollToTop from "./components/ScrollToTop";

const AppContent = () => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setIsPageLoaded(true);
  }, []);

  const isAdminRoute = location.pathname === "/admin";
  const isLoginRoute = location.pathname === "/login";

  return (
    <div className="app-wrapper">
      {" "}
      {/* 👈 Flex container starts here */}
      <Helmet>
        <title>Welcome to Physio Pulse</title>
      </Helmet>
      {!isAdminRoute && !isLoginRoute && <TopNav />}
      <ScrollToTop />
      <main className="main-content">
        {" "}
        {/* 👈 Main area gets flex: 1 */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CarouselSlide />
                <HomePage />
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && !isLoginRoute && isPageLoaded && <Footer />}
      <FloatingButtons />
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
