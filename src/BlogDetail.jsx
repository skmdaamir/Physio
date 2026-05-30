import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Loader from "./Loader";

/**
 * Component to display full content of a specific blog post on its own page.
 * Accessible via /blog/:blogid
 */
const BlogDetail = ({ onNavigate }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        // Fetch specific blog data from the server
        const response = await axios.get(`${API_BASE_URL}/blogs/${slug}`);
        
        // Map data to match project UI structure
        const blogData = {
          ...response.data,
          category: (response.data.category || response.data.categories || "Uncategorized").trim(),
          views: Number(response.data.views) || 0,
          imageUrl: response.data.banner_image || response.data.imageUrl || response.data.image_url || 
            (response.data.image ? `http://googleusercontent.com/profile/picture/${response.data.image}` : null),
          relatedServiceSlug: response.data.related_service_slug || null, // Assuming your API response includes this field
        };
        
        // Parse JSON fields safely if they come as strings from DB
        blogData.content = typeof response.data.content === 'string' ? JSON.parse(response.data.content) : response.data.content || '';
        blogData.summary_data = typeof response.data.summary_data === 'string' ? JSON.parse(response.data.summary_data) : response.data.summary_data || [];
        blogData.benefits = typeof response.data.benefits === 'string' ? JSON.parse(response.data.benefits) : response.data.benefits || [];
        blogData.recovery_steps = typeof response.data.recovery_steps === 'string' ? JSON.parse(response.data.recovery_steps) : response.data.recovery_steps || [];
        blogData.faqs = typeof response.data.faqs === 'string' ? JSON.parse(response.data.faqs) : response.data.faqs || [];
        blogData.conditions_treated = typeof response.data.conditions_treated === 'string' ? JSON.parse(response.data.conditions_treated) : response.data.conditions_treated || [];
        
        setBlog(blogData);

        // SEO and metadata update
        document.title = `${blogData.title} | Physio Pulse & Rehab Blog`;
        
        // Handle View Tracking (Wrapped in try/catch so failure doesn't block the blog load)
        try {
          const VIEW_EXPIRY = 24 * 60 * 60 * 1000;
          const now = Date.now();
          const viewedBlogs = JSON.parse(localStorage.getItem("viewed_blogs") || "{}");
          const blogId = blogData.id;

          if (!viewedBlogs[blogId] || (now - viewedBlogs[blogId] > VIEW_EXPIRY)) {
            await axios.patch(`${API_BASE_URL}/blogs/${blogId}/view`);
            viewedBlogs[blogId] = now;
            localStorage.setItem("viewed_blogs", JSON.stringify(viewedBlogs));
          }
        } catch (viewError) {
          console.warn("View tracking failed, but article will still be displayed:", viewError);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("We couldn't find the article you're looking for.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlogDetail();
    window.scrollTo(0, 0); // Ensure user starts at top of post
  }, [slug]);

  const handleBackNavigation = (targetId) => {
    if (typeof onNavigate === 'function') {
      onNavigate(targetId);
    } else {
      navigate(`/${targetId}`);
    }
  };

  if (loading) return <Loader />;

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#f6f6f8] flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-8xl text-slate-300 mb-6 font-light">article_off</span>
        <h2 className="text-3xl font-black text-slate-900 mb-3">Article Missing</h2>
        <p className="text-slate-600 mb-10 max-w-sm">{error || "This blog post might have been moved or deleted."}</p>
        <button
          onClick={() => handleBackNavigation('blog')}
          className="bg-[#135bec] text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          Back to All Insights
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-900 font-sans pb-20">
      {/* Navigation Header */}
      <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-10">
        <button
          onClick={() => handleBackNavigation('blog')}
          className="group flex items-center gap-2 text-slate-500 hover:text-[#135bec] transition-all font-bold text-sm uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-2">arrow_back</span>
          Go Back
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-8 md:mt-12">
        <article>
        {/* Post Metadata */}
        <header className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-[#135bec]/10 text-[#135bec] text-xs font-black uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-slate-400 text-sm font-medium">
              {new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} • {Math.ceil(blog.content?.length / 500) || 5} min read
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900">
            {blog.title}
          </h1>
          {blog.subtitle && <p className="text-xl text-slate-600 italic">{blog.subtitle}</p>}
        </header>

        {/* Post Visual */}
        {blog.imageUrl && (
          <div className="relative group overflow-hidden rounded-3xl shadow-xl mb-12 bg-white border border-slate-200">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        {/* Main Content Sections */}
        <div className="space-y-16">
          {/* Summary Table */}
          {blog.summary_data?.length > 0 && (
            <section className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <h2 className="bg-slate-900 text-white p-4 text-xl font-bold">Quick Overview</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  {blog.summary_data.map((item, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="p-4 font-bold bg-slate-50 w-1/3">{item.key}</td>
                      <td className="p-4">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Content Block */}
          <section className="max-w-none">
             {Array.isArray(blog.content) ? (
               <div className="space-y-2">
                 {blog.content.map((block, index) => {
                   switch (block.type) {
                     case 'main_header':
                       return <h2 key={index} className="text-3xl md:text-4xl font-extrabold text-slate-900 pt-4 mb-4">{block.value}</h2>;
                     case 'header':
                       return <h3 key={index} className="text-2xl md:text-3xl font-bold text-slate-800 pt-8 mb-4">{block.value}</h3>;
                     case 'sub_header':
                       return <h4 key={index} className="text-xl md:text-2xl font-bold text-slate-800 pt-6 mb-3">{block.value}</h4>;
                     case 'paragraph':
                       return <p key={index} className="text-slate-600 leading-relaxed mb-6">{block.value}</p>;
                     case 'bullet_points':
                       return (
                         <ul key={index} className="list-disc list-outside ml-6 space-y-3 mb-8 text-slate-700">
                           {block.items.map((item, i) => (
                             <li key={i} className="pl-2">{item}</li>
                           ))}
                         </ul>
                       );
                     default:
                       return null;
                   }
                 })}
               </div>
             ) : (
               <div 
                 className="prose prose-lg prose-slate max-w-none leading-relaxed min-h-[200px] text-slate-700"
                 dangerouslySetInnerHTML={{ __html: blog.content || blog.short_description || '' }}
               />
             )}
          </section>

          {/* Benefits List */}
          {blog.benefits?.length > 0 && (
            <section className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">check_circle</span> Key Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {blog.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 mt-1 shrink-0 text-[18px]">vital_signs</span>
                    <span className="font-medium text-slate-700 prose prose-sm prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: benefit }} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recovery Steps */}
          {blog.recovery_steps?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">checklist</span> Step-wise Recovery Process
              </h2>
              <div className="space-y-6">
                {blog.recovery_steps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{step.title}</h4>
                      <div className="text-slate-600 prose prose-sm prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: step.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {blog.faqs?.length > 0 && (
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">help</span> Common Questions
              </h2>
              <div className="space-y-4">
                {blog.faqs.map((faq, i) => (
                  <article key={i} className="rounded-xl border border-slate-200 overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors focus:outline-none"
                    >
                      <h4 className="font-bold text-slate-900 pr-8 flex gap-3">
                        <span className="text-blue-600 shrink-0">Q:</span> {faq.question}
                      </h4>
                      <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    <div 
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === i ? 'max-h-[1000px] border-t border-slate-100' : 'max-h-0'}`}
                    >
                      <div className="p-5 text-slate-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Related Service Link (if available) */}
          {blog.relatedServiceSlug && (
            <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm text-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Explore Related Service</h2>
              <p className="text-blue-700 mb-6">
                This article is related to our <span className="font-semibold">{blog.relatedServiceSlug.replace(/-/g, ' ')}</span> service.
              </p>
              <button
                onClick={() => navigate(`/services/${blog.relatedServiceSlug}`)}
                className="bg-[#135bec] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                View Service Details
              </button>
            </section>
          )}
        </div>

          {/* Footer of the post */}
          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-slate-500 italic text-sm">
              Note: This information is for educational purposes. Consult a certified physiotherapist for personalized medical advice.
            </p>
            <button
              onClick={() => handleBackNavigation('blog')}
              className="px-6 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
            >
              Explore More Articles
            </button>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetail;