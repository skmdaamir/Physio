import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = ({ darkMode }) => {
  const linkColor = darkMode ? "text-green-300" : "text-white";
  const linkHoverColor = darkMode ? "hover:text-green-500" : "hover:text-green-400";
  const textColor = darkMode ? "text-gray-300" : "text-white";

  return (
    <footer
      className={`backdrop-blur-md py-6 px-4 md:px-12 lg:px-20 transition-opacity duration-500 ${
        darkMode ? "bg-[#1d3141dd]" : "bg-[#1d3141cc]"
      } text-sm sm:text-base`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {/* Menu Links */}
        <div>
          <h5 className={`mb-4 font-semibold ${linkColor}`}>Menu</h5>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/blog", label: "Blog" },
              { to: "/gallery", label: "Photo Gallery" },
              { to: "/appointment", label: "Appointment" },
              { to: "/career", label: "Career" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`transition-colors duration-300 font-medium cursor-pointer ${linkColor} ${linkHoverColor}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h5 className={`mb-4 font-semibold ${linkColor}`}>About Us</h5>
          <p className={`${textColor}`}>
            We are committed to providing the best physiotherapy care for a
            healthier, stronger you.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h5 className={`mb-4 font-semibold ${linkColor}`}>Contact</h5>
          <p className={`${textColor}`}>Email: physiopulserehab6@gmail.com</p>
          <p className={`${textColor}`}>Phone: +91 916 725 2926</p>
        </div>

        {/* Social Media */}
        <div>
          <h5 className={`mb-4 font-semibold ${linkColor}`}>Follow Us</h5>
          <div className="flex space-x-4">
            {[
              { href: "https://facebook.com", icon: <FaFacebookF size={20} /> },
              { href: "https://www.instagram.com/drmohdshoeb?igsh=MXBzaTI1dzd1cDlzbg==", icon: <FaInstagram size={20} /> },
              { href: "https://linkedin.com", icon: <FaLinkedinIn size={20} /> },
              { href: "https://twitter.com", icon: <FaTwitter size={20} /> },
            ].map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${linkColor} ${linkHoverColor}`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-6">
  <small className={`${textColor}`}>
    &copy; {new Date().getFullYear()} Physiotherapy App - All Rights Reserved.
  </small>
  <br />
  <small className={`${textColor}`}>
    Website Development &amp; Maintenance by <strong>Amir Shaikh</strong> | 📞{" "}
    <a href="tel:+918655319821" className="underline hover:text-blue-500">
      +91 8655319821
    </a>
  </small>
</div>
    </footer>
  );
};

export default Footer;
