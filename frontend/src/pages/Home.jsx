import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Smartphone, Target, Users } from "lucide-react";

const Home = () => {
  return (
    <section className="bg-white py-16 px-6 mt-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-medium mb-6"
        >
          ⭐ Start with just ₹10/day
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Invest Smart, <br /> Start Small
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
        >
          Build wealth with micro-investments. Safe, simple, and designed for
          everyone – even if you're new to investing.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { value: "₹10", label: "Minimum Investment" },
            { value: "12%+", label: "Expected Returns" },
            { value: "0", label: "Hidden Fees" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white shadow rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-gray-500 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Why Choose PaisaGrow?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, text: "100% Safe & Regulated" },
              { icon: <Target className="w-5 h-5" />, text: "Goal-Based Investing" },
              { icon: <Smartphone className="w-5 h-5" />, text: "Easy Mobile Experience" },
              { icon: <Users className="w-5 h-5" />, text: "Expert Guidance" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="bg-gray-100 p-2 rounded-full text-gray-700">
                  {item.icon}
                </span>
                <p className="font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-600">
          <span>🛡 SEBI Registered</span>
          <span>🏦 Bank Grade Security</span>
        </div>
      </div>
    </section>
  )
}

export default Home;
