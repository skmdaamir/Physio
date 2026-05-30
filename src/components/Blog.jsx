import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

// Helper to strip HTML tags for clean text previews
const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

// Helper to get a clean text preview regardless of content format
const getPreviewText = (content) => {
  if (!content) return "";

  let parsedContent = content;
  // If content is a JSON string (starts with [), try to parse it
  if (typeof content === "string" && content.trim().startsWith("[")) {
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = content;
    }
  }

  if (Array.isArray(parsedContent)) {
    const firstParagraph = parsedContent.find((block) => block.type === "paragraph");
    return firstParagraph ? firstParagraph.value : "";
  }
  // Fallback for older HTML string format
  return stripHtml(parsedContent);
};

// Skeleton Card Component for loading state
const SkeletonCard = ({ className = "" }) => (
  <article
    className={`group flex flex-row md:flex-col overflow-hidden rounded-xl md:rounded-2xl bg-white border border-slate-200 md:border-slate-100 shadow-sm transition-all md:hover:shadow-xl p-3 md:p-0 gap-4 md:gap-0 animate-pulse ${className}`}
  >
    <div className="w-24 h-24 md:w-full md:h-56 shrink-0 relative overflow-hidden rounded-lg md:rounded-none bg-slate-200"></div>
    <div className="flex flex-1 flex-col justify-between md:p-6">
      <div>
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="hidden md:block h-3 bg-slate-200 rounded w-full mt-4"></div>
        <div className="hidden md:block h-3 bg-slate-200 rounded w-5/6 mt-2"></div>
      </div>
      <div className="flex items-center justify-between md:justify-start mt-2 md:mt-0">
        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
      </div>
    </div>
  </article>
);

const Blog = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // State for "Load More" loading

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Display 6 recent articles per page

  useEffect(() => {
    // Update SEO Metadata for Blog Page
    document.title = "Physio Pulse Rehab Blog | Expert Physio Tips";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore expert tips, recovery guides, and wellness insights from our physiotherapy clinic to stay active, pain-free, and healthy every day.");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/active`);
      // Map the data to ensure UI properties match the backend response structure
      const activeBlogs = response.data.map((blog) => ({
        ...blog,
        category: (blog.category || blog.categories || "Uncategorized").trim(),
        views: Number(blog.views) || 0,
        imageUrl: blog.banner_image || blog.imageUrl || blog.image_url || 
          (blog.image ? `http://googleusercontent.com/profile/picture/${blog.image}` : null)
      }));
      setBlogs(activeBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleArticleClick = (blog) => {
    const target = `${blog.slug}`;
    if (typeof onNavigate === 'function') {
      onNavigate(target);
    } else {
      navigate(`/${target}`);
    }
  };

  // Combined Search, Category Filter, and Sort logic
  const filteredAndSortedBlogs = [...blogs]
    .filter(blog => {
      const matchesSearch = !searchQuery || 
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        blog.content?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Trending") {
        return b.views - a.views;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  // Exclude the featured post from the recent articles list to avoid duplication
  const allRecent = filteredAndSortedBlogs.slice(1);

  // Pagination calculations
  const totalPages = Math.ceil(allRecent.length / itemsPerPage);
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;

  // On mobile, show items from 0 to the current page end (Load More style)
  // On desktop, show only the items for the current page
  const currentBlogsForDisplay = isMobile 
    ? allRecent.slice(0, indexOfLastBlog)
    : allRecent.slice(indexOfFirstBlog, indexOfLastBlog);

  // Reset current page if filters/sorts change and current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && !loading && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, loading]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate a network delay for appending more items
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
    }, 500); // Adjust delay as needed
  };

  if (loading) return <div className="min-h-screen bg-[#f6f6f8] flex items-center justify-center font-bold text-slate-700">Loading insights...</div>;

  const featuredPost = filteredAndSortedBlogs[0];
  const recentArticles = currentBlogsForDisplay;
  // Popular posts should always show globally popular items, not just from the filtered set
  const popularPostsSorted = [...blogs].sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0)).slice(0, 3);

  return (
    <div id="blog" className="min-h-screen bg-[#f6f6f8] text-slate-900 font-sans pb-24 md:pb-0">
      {/* --- MOBILE ONLY: Header --- */}
      <div className="md:hidden bg-white border-b border-slate-200">
        <header className="relative flex items-center justify-center px-4 py-4">
          <button
            onClick={() => onNavigate("home")}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2"
          >
            <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span>
          </button>
          <h2 className="font-bold text-lg">Our Blog</h2>
        </header>
      </div>
      {/* MOBILE ONLY: Top Search & Filters (Sits directly under Navbar) */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 sticky top-[60px] z-40">
        <div className="relative flex items-center mb-4">
          <span className="material-symbols-outlined absolute left-3 text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search recovery tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#135bec]/50 outline-none"
          />
        </div>
        <div className="flex gap-2 items-center overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 shrink-0">
            <span className="material-symbols-outlined text-xs text-slate-400">sort</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold bg-transparent outline-none text-slate-600 appearance-none cursor-pointer"
            >
              <option value="Newest">Newest</option>
              <option value="Trending">Trending</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 lg:px-6 py-6 lg:py-10">
        {/* DESKTOP ONLY: Page Header */}
        <header className="hidden lg:block mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            The Physio Pulse <br />
            <span className="text-[#135bec]">Knowledge Hub</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            Explore expert tips, recovery guides, and wellness insights from our team of specialists to stay active and healthy.
          </p>
        </header>

        {/* HERO: Featured Post */}
        <section className="mb-10 lg:mb-16">
          <h2 className="lg:hidden text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#135bec]">
              star
            </span>{" "}
            Featured Post
          </h2>

          {featuredPost && (
            <div className="group relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white lg:bg-slate-900 shadow-sm lg:shadow-2xl border border-slate-200 lg:border-none transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-56 lg:h-[480px] w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 lg:group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${featuredPost.imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80&w=800'}')`,
                  }}
                ></div>
                <div className="lg:hidden absolute top-4 left-4 bg-[#135bec] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                  Trending
                </div>
              </div>
              <div className="flex flex-col justify-center p-5 lg:p-12 bg-white lg:bg-transparent text-slate-900 lg:text-white">
                <div className="hidden lg:flex mb-4 items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#135bec]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#135bec]">
                    Featured Insight
                  </span>
                  <span className="text-xs text-slate-400">{Math.ceil(featuredPost.content?.length / 500) || 5} Min Read</span>
                </div>
                <div className="lg:hidden flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{Math.ceil(featuredPost.content?.length / 500) || 5} min read</span>
                </div>
                <h2 className="mb-3 lg:mb-4 text-xl lg:text-5xl font-black leading-tight lg:text-white">
                  {featuredPost.title}
                </h2>
                <p className="mb-4 lg:mb-8 text-sm lg:text-lg leading-relaxed text-slate-600 lg:text-slate-300 line-clamp-2 lg:line-clamp-none">
                  {getPreviewText(featuredPost.content).substring(0, 150)}...
                </p>
                <div>
                  <button 
                    onClick={() => handleArticleClick(featuredPost)}
                    className="w-full lg:w-auto flex h-12 items-center justify-center rounded-lg bg-[#135bec] px-8 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700"
                  >
                    Read Full Article
                    <span className="material-symbols-outlined ml-2 text-sm lg:hidden">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </section>

        {/* MAIN LAYOUT: Articles Grid & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Articles List/Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4 lg:mb-8">
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight">
                Recent Articles
              </h2>

              {/* Desktop Only Sort & Filter Pills */}
              <div className="hidden lg:flex items-center gap-4 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 border-r border-slate-200 pr-4 mr-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sort:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-bold bg-transparent outline-none text-slate-600 cursor-pointer hover:text-[#135bec] transition-colors"
                  >
                    <option value="Newest">Newest First</option>
                    <option value="Trending">Trending Now</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Articles Mapping (Responsive flex-row to flex-col) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"> 
              {recentArticles.length === 0 && (
                <div className="md:col-span-2 text-center py-10 text-slate-500">
                  <span className="material-symbols-outlined text-6xl mb-4">
                    sentiment_dissatisfied
                  </span>
                  <p className="text-lg font-bold">No articles found.</p>
                  <p className="text-sm">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}
              {recentArticles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-row md:flex-col overflow-hidden rounded-xl md:rounded-2xl bg-white border border-slate-200 md:border-slate-100 shadow-sm transition-all md:hover:shadow-xl p-3 md:p-0 gap-4 md:gap-0"
                >
                  <div className="w-24 h-24 md:w-full md:h-56 shrink-0 relative overflow-hidden rounded-lg md:rounded-none">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 md:group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${article.imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80&w=800'}')`,
                      }}
                    ></div>
                    <div className="hidden md:block absolute left-4 top-4">
                      <span className="rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-[#135bec] backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between md:p-6">
                    <div>
                      <span className="md:hidden text-[10px] font-bold text-[#135bec] uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="hidden md:block mb-2 text-xs font-medium text-slate-500">
                        {new Date(article.created_at).toLocaleDateString()} • {Math.ceil(article.content?.length / 500) || 5} min read
                      </span>
                      <h3 className="text-sm md:text-xl font-bold leading-tight md:mb-3 text-slate-900 transition-colors md:group-hover:text-[#135bec] line-clamp-2 md:line-clamp-none mt-1 md:mt-0">
                        {article.title}
                      </h3>
                      <p className="hidden md:block mb-6 text-sm leading-relaxed text-slate-600">
                        {getPreviewText(article.content).substring(0, 120)}...
                      </p>
                    </div>
                    <div className="flex items-center justify-between md:justify-start mt-2 md:mt-0">
                      <span className="md:hidden text-xs text-slate-500">
                        {Math.ceil(article.content?.length / 500) || 5} min read
                      </span>
                      <button
                        onClick={() => handleArticleClick(article)}
                        className="inline-flex items-center text-xs md:text-sm font-bold uppercase md:capitalize tracking-wider md:tracking-normal text-[#135bec] group/link"
                      >
                        Read More
                        <span className="hidden md:inline-block material-symbols-outlined ml-1 text-lg transition-transform group-hover/link:translate-x-1">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile Load More Button */}
            {isMobile && currentPage < totalPages && (
              <div className="mt-8 flex justify-center lg:hidden">
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#135bec] bg-white px-8 py-4 text-sm font-bold text-[#135bec] transition-all active:scale-95 shadow-sm"
                >
                  Load More Articles
                  <span className="material-symbols-outlined text-lg">
                    expand_more
                  </span>
                </button>
              </div>
            )}

            {/* Desktop Pagination (only show if more than 1 page) */}
            {totalPages > 1 && (
              <div className="hidden lg:flex mt-12 items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'hover:border-[#135bec] hover:text-[#135bec]'}`}
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                      currentPage === i + 1 
                        ? 'bg-[#135bec] text-white' 
                        : 'bg-white border border-slate-200 hover:border-[#135bec] hover:text-[#135bec]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 ${currentPage === totalPages || totalPages === 0 ? 'text-slate-300 cursor-not-allowed' : 'hover:border-[#135bec] hover:text-[#135bec]'}`}
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Desktop Sidebar */}
          <aside className="hidden lg:flex lg:col-span-4 flex-col space-y-10">
            {/* Search */}
            <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Search Articles</h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Topics, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm focus:border-[#135bec] focus:ring-1 focus:ring-[#135bec] outline-none"
                />
              </div>
            </div>

            {/* Popular Posts */}
            <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
              <h3 className="mb-6 text-lg font-bold">Popular Posts</h3>
              <div className="space-y-6">
                {popularPostsSorted.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handleArticleClick(post)}
                    href="#"
                    className="group flex gap-4 items-center text-left w-full"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform group-hover:scale-110"
                        style={{
                          backgroundImage: `url('${post.imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80&w=800'}')`,
                        }}
                      ></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold leading-tight group-hover:text-[#135bec] transition-colors">
                        {post.title}
                      </h4>
                      <span className="text-xs text-slate-500">
                        {post.views} Views
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Newsletter */}
            <div className="relative overflow-hidden rounded-2xl bg-[#135bec] p-8 text-white shadow-lg shadow-blue-500/20">
              <div className="relative z-10">
                <span className="material-symbols-outlined mb-4 text-4xl">
                  mail
                </span>
                <h3 className="mb-2 text-xl font-bold">Stay Updated</h3>
                <p className="mb-6 text-sm text-white/80">
                  Get the latest recovery tips and clinic news delivered to your
                  inbox weekly.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-xl border-none bg-white/20 px-4 py-3 text-sm placeholder:text-white/60 focus:ring-2 focus:ring-white outline-none"
                  />
                  <button className="w-full rounded-xl bg-white py-3 text-sm font-bold text-[#135bec] transition-transform hover:scale-[1.02]">
                    Subscribe Now
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/10"></div>
            </div>
          </aside>
        </div>

        {/* MOBILE ONLY: Newsletter */}
        <section className="lg:hidden bg-[#135bec] rounded-2xl p-6 mt-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Weekly Wellness Tips</h3>
          <p className="text-blue-100 text-sm mb-4 opacity-90">
            Join 5,000+ others getting the latest in rehab science.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="rounded-lg border-none text-slate-900 px-4 py-3 text-sm outline-none"
            />
            <button className="bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
              Subscribe Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
