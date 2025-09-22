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
  <p className={`${textColor} text-sm sm:text-base leading-relaxed`}>
    At <span className="font-semibold">Physio Pulse & Rehabilitation Studio</span>, we are committed to helping you live a healthier, stronger, and pain-free life. Our skilled physiotherapists use advanced techniques and personalized care to support recovery, relieve pain, and restore mobility. Whether healing from injury, managing chronic conditions, or enhancing strength, we focus on long-term well-being with a compassionate, patient-first approach.
  </p>
</div>

        {/* Contact */}
        <div>
          <h5 className={`mb-4 font-semibold ${linkColor}`}>Contact</h5>
          <p className={`${textColor}`}>Email: physiopulserehab6@gmail.com</p>
          <p className={`${textColor}`}>Phone: +91 771 889 1672</p>
        </div>

        {/* Privacy Policy */}
        <div>
          <h5 className={`mb-4 font-semibold ${linkColor}`}>Privacy Policy</h5>
          <p className={`${textColor} text-sm sm:text-base leading-relaxed`}>
            We respect your privacy and are committed to protecting your personal information. 
            Any data you share with us (such as your name, phone number, or email address) is 
            collected solely for the purpose of contacting you and providing our services. 
            We do not sell, rent, or share your personal details with third parties without 
            your consent. All information is handled with strict confidentiality and in 
            accordance with applicable data protection laws.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h5 className={`mb-4 font-semibold ${linkColor}`}>Follow Us</h5>
          <div className="flex space-x-4">
            {[
              { href: "https://www.facebook.com/share/14LMiGUzPPL/", icon: <FaFacebookF size={20} /> },
              { href: "https://www.instagram.com/physiopulserehab?igsh=MXJjcGh2N2xyYTJuag==", icon: <FaInstagram size={20} /> },
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
          &copy; {new Date().getFullYear()} Physio Pulse & Rehab Studio - All Rights Reserved.
        </small>
        <br />
        <div className="mt-4">
  <small className={`${textColor} block`}>
    Website Developed &amp; Maintained by <strong>Amir Shaikh</strong>
  </small>
  <div className="border-t border-gray-500 my-2 w-24 mx-auto"></div>
  <small className={`${textColor} block`}>
    📞{" "}
    <a href="tel:+918655319821" className="underline hover:text-blue-500">
      +91 8655319821
    </a>
  </small>
</div>
      </div>
    </footer>
  );
};

export default Footer;
