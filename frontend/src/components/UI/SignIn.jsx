import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("signin");
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  if (!isOpen) return null;

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
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
              {otpStep
                ? "Enter the OTP sent to your email"
                : "Login with your email to begin investing"}
            </p>
          </div>

          {/* Tabs (hidden when in OTP step) */}
          {!otpStep && (
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
          )}

          {/* Form */}
          <form className="px-6 pb-6 space-y-4">
            {/* OTP Step */}
            {otpStep ? (
              <>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      autoFocus={i === 0}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      className="w-12 h-12 text-center border rounded-lg text-lg focus:ring-1 focus:ring-green-500"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
                >
                  Verify OTP
                </button>
                <p className="text-center text-sm text-gray-500">
                  Didn’t receive the code?{" "}
                  <a href="#" className="text-green-600 font-semibold">
                    Resend OTP
                  </a>
                </p>
              </>
            ) : (
              <>
                {/* Sign Up Form */}
                {tab === "signup" && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-1/2 border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-1/2 border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                )}

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
                  autoComplete="off"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-green-500"
                  autoComplete="off"
                />

                {tab === "signup" && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
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
                  onClick={() =>
                    tab === "signin"
                      ? setOtpStep(true)
                      : alert("Account created")
                  }
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
              </>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthModal;
