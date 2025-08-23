import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import logo from '../../assets/logo.png';

const Navbar = ({ onSignInClick }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

// 🔹 Check login status on mount
useEffect(() => {
  axios.get("http://localhost:5000/api/users/profile", { withCredentials: true }) // <- changed from /me to /profile
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
}, []);

// 🔹 Handle logout
const handleLogout = async () => {
  await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
  setUser(null);
  navigate("/");
};

  return (
    <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-8 py-4 shadow bg-white font-sans border-b border-gray-200">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Finsure Logo" className="w-8 h-8 rounded" />
          <h1 className="text-xl font-bold text-black">Finsure</h1>
        </Link>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}     
      >
        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-600">
          <Link to="/" className="px-4 py-2 rounded-xl hover:text-black hover:bg-gray-100">Home</Link>
          {user ? (
          <>
            <span className="px-4 py-2">Hello, {user.firstname}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:text-black hover:bg-gray-100 cursor-pointer"
            >
              Sign Out
            </button>
          </>
          ) : (
            <button
              onClick={onSignInClick}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:text-black hover:bg-gray-100 cursor-pointer"
            >
              Sign In
            </button>
          )}
          <Link to="/get-started" className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Get Started
          </Link>
        </nav>
      </motion.div>
    </header>
  );
};

export default Navbar;
