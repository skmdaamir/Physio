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

const AppContent = () => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setIsPageLoaded(true); // Set the page as loaded after effects are initialized
  }, []);

  const isAdminRoute = location.pathname === "/admin";
  const isLoginRoute = location.pathname === "/login";

  return (
    <>
      <Helmet>
        <title>Welcome to Physio Pulse</title>
      </Helmet>
      {/* Render the TopNav and Footer only if not on admin/login routes */}
      {!isAdminRoute && !isLoginRoute && (
        <>
          <TopNav />
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Render the page content (like carousel) */}
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

      {/* Render Footer only on non-admin and non-login routes */}
      {!isAdminRoute && !isLoginRoute && isPageLoaded && <Footer />}

      {/* Always render FloatingButtons */}
      <FloatingButtons />
    </>
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
