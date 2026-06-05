import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AboutUs from "./components/AboutUs";
import BottomNav from './components/BottomNav';
import Loader from './components/Loader';
import BlogDetail from "./components/BlogDetail";
import FloatingContact from "./components/FloatingContact";
import MedicalDisclaimerModal from "./components/MedicalDisclaimerModal";

const BookAppointment = lazy(() => import("./components/BookAppointment"));
const Blog = lazy(() => import("./components/Blog"));
const SubmitReview = lazy(() => import("./components/SubmitReview"));
const PhotoGallery = lazy(() => import("./components/PhotoGallery"));
const Careers = lazy(() => import("./components/Careers"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/TermsOfService"));

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * @type {{
   *   home: React.RefObject<HTMLElement>,
   *   services: React.RefObject<HTMLElement>,
   *   testimonials: React.RefObject<HTMLElement>,
   *   about: React.RefObject<HTMLDivElement>,
   *   team: React.RefObject<HTMLElement>,
   *   contact: React.RefObject<HTMLElement>
   * }}
   */
  const sectionRefs = {
    home: useRef(null),
    services: useRef(null),
    testimonials: useRef(null),
    about: useRef(null),
    team: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const accepted = localStorage.getItem('medical_disclaimer_accepted');
    if (!accepted) {
      setShowDisclaimer(true);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    // Reset SEO Metadata for the main landing page
    document.title = "Best Physiotherapy Clinic & Home Service  | Pain Relief & Rehab Center";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Looking for the best physiotherapy clinic? Get expert physiotherapy treatment, sports injury physiotherapy, pain relief therapy & rehabilitation services.");
    }

    const refs = Object.values(sectionRefs);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Object.keys(sectionRefs).find(
              (key) => sectionRefs[key].current === entry.target,
            );
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px', // Trigger when the section is in the middle 20% of the viewport
        threshold: 0,
      },
    );
 
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
 
    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [location.pathname]);

  const pageComponents = {
    bookappointment: BookAppointment,
    blog: Blog,
    gallery: PhotoGallery,
    career: Careers,
    'submit-review': SubmitReview,
    'privacy-policy': PrivacyPolicy,
    'terms-of-service': TermsOfService,
  };

  const handleNavigate = (id) => {
    // Define IDs that should trigger a scroll on the home page
    const sectionIds = ['home', 'services', 'testimonials', 'aboutus', 'whychooseus', 'team', 'contact'];
    const isSection = sectionIds.includes(id);
    const isKnownPage = Object.keys(pageComponents).includes(id);

    if (isKnownPage || (!isSection && id !== 'home')) {
      // Navigation to a separate page/route
      setIsLoading(true);
      setTimeout(() => {
        navigate(`/${id}`);
        window.scrollTo(0, 0);
        setIsLoading(false);
      }, 600);
    } else {
      // This is for in-page scrolling on the 'main' view
      if (location.pathname !== "/") {
        navigate("/");
      }
      // Use a timeout to ensure the main page components are mounted before scrolling
      setTimeout(() => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const element = document.getElementById(id);
        if (element) {
          const headerOffset =
            document.querySelector('header')?.offsetHeight || 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('medical_disclaimer_accepted', 'true');
    setShowDisclaimer(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] font-sans text-slate-900">
      <MedicalDisclaimerModal 
        isOpen={showDisclaimer} 
        onAccept={handleAcceptDisclaimer} 
      />
      
      {isLoading && <Loader />}
      <Navbar onNavigate={handleNavigate} />
      <main className="pb-20 md:pb-0">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero ref={sectionRefs.home} onNavigate={handleNavigate} />
                  <Services ref={sectionRefs.services} />
                  <WhyChooseUs />
                  <Testimonials
                    ref={sectionRefs.testimonials}
                    onNavigate={handleNavigate}
                  />
                  <AboutUs
                    ref={sectionRefs.about}
                    teamRef={sectionRefs.team}
                    onNavigate={handleNavigate}
                  />
                </>
              }
            />
            <Route path="/blog" element={<Blog onNavigate={handleNavigate} />} />
            
            {/* Policy Routes */}
            <Route path="/privacy-policy" element={<PrivacyPolicy onNavigate={handleNavigate} />} />
            <Route path="/terms-of-service" element={<TermsOfService onNavigate={handleNavigate} />} />

            <Route path="/:slug" element={<BlogDetail onNavigate={handleNavigate} />} />
            <Route path="/bookappointment" element={<BookAppointment onNavigate={handleNavigate} />} />
            <Route path="/gallery" element={<PhotoGallery onNavigate={handleNavigate} />} />
            <Route path="/career" element={<Careers onNavigate={handleNavigate} />} />
            <Route path="/submit-review" element={<SubmitReview onNavigate={handleNavigate} />} />
          </Routes>
        </Suspense>
      </main>
      <FloatingContact />
      <Footer ref={sectionRefs.contact} onNavigate={handleNavigate} />
      {location.pathname === "/" && (
        <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;