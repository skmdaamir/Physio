import { forwardRef } from "react";

const Footer = forwardRef(({ onNavigate }, ref) => {
  const navItems = ['Home', 'About Us', 'Blog', 'Gallery', 'Career'];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (onNavigate) onNavigate(id);
  };

  return (
    <footer
      ref={ref}
      id="contact"
      className="bg-slate-300 text-slate-700 pt-20 pb-28 md:pb-20 px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {/* Brand & Socials */}
        <div className="space-y-6">
          <div>
            <h2 className="text-slate-900 text-xl font-black mb-4">Physio Pulse</h2>
            <p className="text-sm leading-relaxed">
              Restoring your movement and quality of life through advanced
              techniques and personalized rehabilitation care.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-slate-700 hover:bg-[#135bec] hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 3.656 10.99 8.712 11.722v-8.295h-3.01v-3.427h3.01v-2.611c0-2.97 1.768-4.61 4.476-4.61 1.296 0 2.652.231 2.652.231v2.915h-1.494c-1.47 0-1.929.913-1.929 1.848v2.217h3.285l-.525 3.427h-2.76v8.295c5.056-.732 8.712-5.732 8.712-11.722z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-slate-700 hover:bg-[#135bec] hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 2.174 4.919 5.406.058 1.281.07 1.657.07 4.861s-.012 3.585-.07 4.861c-.148 3.227-1.664 5.256-4.919 5.403-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-2.175-4.919-5.406-.058-1.281-.07-1.657-.07-4.861s.012-3.585.07-4.861c.147-3.224 1.666-5.246 4.918-5.403 1.266-.058 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.337-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.338-2.617-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-5.838 2.435-5.838 5.838s2.435 5.838 5.838 5.838 5.838-2.435 5.838-5.838-2.435-5.838-5.838-5.838zm0 9.513c-2.03 0-3.675-1.645-3.675-3.675 0-2.03 1.645-3.675 3.675-3.675 2.03 0 3.675 1.645 3.675 3.675 0 2.03-1.645 3.675-3.675 3.675zm5.848-10.146c0 .731-.593 1.323-1.322 1.323s-1.322-.592-1.322-1.323.593-1.322 1.322-1.322 1.322.591 1.322 1.322z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-xs uppercase tracking-widest">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm">
            {navItems.map((item) => {
              const sectionId = item.toLowerCase().replace(/\s/g, '');
              return (
                <li key={item}>
                  <a
                    href={`#${sectionId}`}
                    onClick={(e) => handleNavClick(e, sectionId)}
                    className="hover:text-[#135bec] transition-colors font-medium"
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-xs uppercase tracking-widest">
            Services
          </h4>
          <ul className="space-y-4 text-sm font-medium">
            <li>Cardiac Recovery</li>
            <li>Sports Medicine</li>
            <li>Neuro Rehab</li>
            <li>Orthopedic Care</li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-slate-900 font-bold mb-6 text-xs uppercase tracking-widest">
            Contact
          </h4>
          <div className="space-y-4 text-sm font-medium">
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">location_on</span>
              Damgi Building, Ground Floor, Main Road Dargah Gate, Amrut Nagar - ShilRoad
            </p>
            <a href="tel:+919167252926" className="flex items-center gap-2 hover:text-[#135bec] transition-colors w-fit">
              <span className="material-symbols-outlined text-sm">call</span>
              +91 9167252926
            </a>
            <a href="https://wa.me/919167252926?text=Hi%20Physio%20Pulse%20team%2C%20I'd%20like%20to%20know%20more%20about%20your%20physiotherapy%20services%20and%20schedule%20an%20assessment." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors w-fit">
              <span className="material-symbols-outlined text-sm text-[#25D366]">chat</span>
              WhatsApp Us
            </a>
            <div className="mt-4 pt-4 border-t border-slate-400/30">
              <h5 className="font-bold text-xs text-slate-800 uppercase mb-2">Service Areas</h5>
              <p className="text-xs leading-relaxed opacity-80">Mumbai, Thane, Navi Mumbai, Delhi, Lucknow</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-slate-400">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs font-bold text-slate-900 mb-1">
              © 2026 Physio Pulse & Rehab. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <a 
                href="/privacy-policy" 
                onClick={(e) => { e.preventDefault(); onNavigate('privacy-policy'); }}
                className="hover:text-[#135bec] transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                onClick={(e) => { e.preventDefault(); onNavigate('terms-of-service'); }}
                className="hover:text-[#135bec] transition-colors cursor-pointer"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
