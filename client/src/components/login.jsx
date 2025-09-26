import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Utility function to check expiry
const isTokenExpired = (token) => {
  debugger;
  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (e) {
    return true;
  }
};

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // 🔹 Check token when login page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
      } else {
        navigate("/admin"); // Already logged in, go to dashboard
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/login", credentials);
      const { token, exp } = res.data;

      if (isTokenExpired(token)) {
        alert("Token already expired. Please try again.");
        return;
      }

      // Store token
      localStorage.setItem("token", token);

      // Auto-logout when token expires
      const expiryTime = exp * 1000 - Date.now();
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, expiryTime);

      navigate("/admin");
    } catch (err) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-medium mb-1 text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium mb-1 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
