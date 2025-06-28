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

const AppContent = () => {
  const location = useLocation();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Refresh slightly later for consistent rendering
    setTimeout(() => {
      
      AOS.init({ duration: 1000 });
      AOS.refresh();
      setIsPageLoaded(true);
    }, 100); // You can try 50ms to 300ms depending on render speed
  }, [location]);

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
          <Route path="/review" element={<ReviewForm />} />
          <Route path="/gallery" element={<CustomerGallery />} />
          <Route path="/career" element={<Career />} />

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
      {/* {!isAdminRoute && !isLoginRoute && isPageLoaded && <Footer />} */}
      {!isAdminRoute && !isLoginRoute && isPageLoaded && <Footer />}
      <FloatingButtons />
    </div>
  );
};
const App = () => {
  return (
    <Router basename="/https://skmdaamir.github.io/">
      <AppContent />
    </Router>
  );
};

export default App;
