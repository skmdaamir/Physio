import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.bmp";
import './TopNav.css';

const TopNav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/blog", name: "Blog" },
    { path: "/gallery", name: "Photo Gallery" },
    { path: "/appointment", name: "Appointment" },
    { path: "/career", name: "Career" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 py-3 px-5 flex justify-between items-center shadow-md ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
          <label className="flex items-center gap-1 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
              className="hidden"
            />
            {darkMode ? "🌙" : "☀️"}
          </label>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6">
          {menuItems.map(({ path, name }) => (
            <li key={path}>
              <Link
                to={path}
                className="hover:text-green-500 transition duration-200"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger for Mobile */}
        <button onClick={toggleMenu} className="lg:hidden text-3xl">
          <FaBars />
        </button>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-2xl absolute top-4 right-4"
          onClick={toggleMenu}
        >
          ✕
        </button>
        <div className="mt-16 flex flex-col gap-6 px-6">
          {menuItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="text-lg transition-all duration-300 animate-slideInRight"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopNav;
