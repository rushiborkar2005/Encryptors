import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("signin");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  // 🔹 Handle Sign In
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate("/"); // ✅ redirect
        onClose(); // close modal
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // 🔹 Handle Sign Up (optional — hook to /register API)
  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        { firstName, lastName, phone, email, password, confirmPassword },
        { withCredentials: true }
      );

      if (res.status === 201) {
        // auto-login after register
        await handleLogin();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold">Start Your Journey</h2>
            <p className="text-gray-500 text-sm">
              {tab === "signin"
                ? "Login with your email to begin investing"
                : "Create an account to start investing"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex m-4 bg-gray-100 rounded-xl p-1">
            <button
              className={`flex-1 py-2 rounded-lg font-semibold ${
                tab === "signin" ? "bg-white shadow" : "text-gray-500"
              }`}
              onClick={() => setTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-semibold ${
                tab === "signup" ? "bg-white shadow" : "text-gray-500"
              }`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="px-6 pb-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {tab === "signup" && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
                />
              </div>
            )}

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
              autoComplete="off"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
              autoComplete="off"
            />

            {tab === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
              />
            )}

            {tab === "signin" && (
              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="text-green-600 font-semibold">
                  Forgot password?
                </a>
              </div>
            )}

            {tab === "signup" && (
              <div className="text-sm">
                <label className="flex gap-2 items-start">
                  <input type="checkbox" className="mt-1" />
                  I agree to the{" "}
                  <a href="#" className="text-green-600 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-green-600 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            <button
              type="button"
              onClick={tab === "signin" ? handleLogin : handleRegister}
              className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
            >
              {tab === "signin" ? "Sign In" : "Create Account"}
            </button>

            {/* Footer Note */}
            <p className="text-center text-xs text-gray-500 mt-4">
              By continuing, you agree to our{" "}
              <a href="#" className="text-green-600 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-600 underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthModal;
