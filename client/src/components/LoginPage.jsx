import React, { useState } from "react";
import axios from '../axiosInstance';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/admin/login",
        {
          email: username,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        history.push("/admin");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Admin Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
