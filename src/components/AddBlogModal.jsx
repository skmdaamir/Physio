import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

// Helper to strip HTML tags for card descriptions
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
};

const Blog = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetching all blogs from your updated backend endpoint
        const response = await fetch(`${API_BASE_URL}/blogs`); 
        const data = await response.json();
        
        // Ensure we only show 'Published' blogs if that is your intent, 
        // otherwise data will contain all records.
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Latest Insights</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Stay updated with the latest health tips, physiotherapy techniques, and clinic news.
        </p>
      </div>

      {/* 
          REMOVED: Filter buttons for 'All', 'Wellness', and 'Rehab'.
          The grid now simply displays the full list of blogs.
      */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article 
            key={blog.id}
            className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            {/* Banner Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={blog.banner_image || '/api/placeholder/400/320'} 
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {blog.author_name}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                {blog.title}
              </h2>
              
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                {stripHtml(blog.short_description || blog.content).substring(0, 120)}...
              </p>

              <button
                onClick={() => onNavigate(`${blog.slug}`)}
                className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all group/btn"
              >
                Read Full Article 
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 italic text-lg">No blog posts available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
