import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Testimonials = forwardRef(({ onNavigate }, ref) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    // Ensure the ID is valid for navigation
    const target = id === 'home' ? '/' : `/${id}`;
    
    if (typeof onNavigate === 'function') {
      onNavigate(id);
    }
    
    // Always fallback to navigate to ensure the page opens even if state-based nav fails
    navigate(target);
  };

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }, []);

  // Auto-scrolling logic
  useEffect(() => {
    if (loading || reviews.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        // If we've reached the end, reset to the beginning smoothly
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 5000); // Cycles every 5 seconds

    return () => clearInterval(interval);
  }, [loading, reviews, scroll, isPaused]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/approved-reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section ref={ref} id="testimonials" className="bg-slate-50 py-20 px-6 lg:px-10 overflow-hidden relative">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black lg:text-4xl mb-2">Patient Testimonials</h2>
          <p className="text-slate-500 mb-6">Real stories from our patients about their recovery journey.</p>
          <button 
            onClick={() => handleNavigation('submit-review')}
            className="inline-flex items-center gap-2 bg-[#135bec] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <span className="material-symbols-outlined">rate_review</span>
            Leave a Review
          </button>
        </div>

        {/* Desktop Navigation Arrows - Positioned absolutely to keep title centered */}
        <div className="hidden md:block">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-4 top-[60%] -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#135bec] hover:text-white transition-all shadow-lg group"
          >
            <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_left</span>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-4 top-[60%] -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#135bec] hover:text-white transition-all shadow-lg group"
          >
            <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_right</span>
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4"
        >
          {!loading && reviews.map((r, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-2xl border border-slate-200 text-left flex flex-col justify-between snap-center shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-right-4 duration-500" 
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div>
                <div className="flex items-center gap-0.5 mb-4 text-amber-400">
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {starIndex < r.rating ? 'star' : 'star_outline'}
                    </span>
                  ))}
                </div>
                <p className="italic mb-6 text-slate-600 leading-relaxed">"{r.description}"</p>
              </div>
              <div className="flex justify-between items-end border-t border-slate-50 pt-4">
                <div>
                  <h4 className="font-bold text-slate-900">{r.name}</h4>
                  <p className="text-xs text-[#135bec] font-semibold uppercase tracking-wider">{r.place}</p>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  {new Date(r.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;