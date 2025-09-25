import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentModal from "./components/AppointmentModal";
import AboutUs from "./components/AboutUs";
import CarouselSlide from "./components/CarouselSlide";
import AOS from "aos";
import "./App.css";
import HomePage from "./components/HomePage";
import Blog from "./components/Blog";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Helmet } from "react-helmet";
import ScrollToTop from "./components/ScrollToTop";
import ReviewForm from "./components/ReviewForm";
import CustomerGallery from "./components/CustomerGallery";
import Career from "./components/Career";
import ConditionDetails from "./components/ConditionDetails";
import AddCondition from "./components/AddCondition";
import Symptoms from "./components/Symptoms"; // ✅ Import Symptoms

const AppContent = () => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(true); // ✅ Start as open

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    setTimeout(() => {
      AOS.init({ duration: 1000 });
      AOS.refresh();
      setIsPageLoaded(true);
    }, 100);
  }, []);

  // ✅ Show modal every time route changes
  useEffect(() => {
    setShowModal(true);
  }, [location.pathname]);

  const isAdminRoute = location.pathname === "/admin";
  const isLoginRoute = location.pathname === "/login";
   const isReviewRoute = location.pathname === "/review"; // <--- added

  return (
    <div className="app-wrapper">
      <Helmet>
        <title>Welcome to Physio Pulse</title>
      </Helmet>

      {!isAdminRoute && !isLoginRoute && !isReviewRoute && <TopNav />}
      <ScrollToTop />

      <main className="main-content">
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
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/gallery" element={<CustomerGallery />} />
          <Route path="/career" element={<Career />} />
          <Route path="/conditions/details/:id" element={<ConditionDetails />} />
          <Route path="/symptoms/details/:id" element={<Symptoms />} /> {/* ✅ Added Route */}
          <Route path="/add-condition" element={<AddCondition />} />
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

      {/* Hide Footer & FloatingButtons on admin/login */}
      {!isAdminRoute && !isLoginRoute && isPageLoaded && !isReviewRoute &&<Footer />}
      {!isAdminRoute && !isLoginRoute && <FloatingButtons />}

      {/* ✅ Modal shows everywhere except admin, login, review */}
      {!isAdminRoute && !isLoginRoute && !isReviewRoute && (
        <AppointmentModal show={showModal} onClose={() => setShowModal(false)} />
      )}
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
