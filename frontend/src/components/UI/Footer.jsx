import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import logo from '../../assets/logo.png'; 


const Footer = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        });
      }
    }, [isInView, controls]);
    
  return (
    <div>
      {/* CTA Section */}
      <section className="bg-blue-400">
        <motion.div
        ref={ref}
        initial={{ y: 50, opacity: 0 }}
        animate={controls}        
        className="text-white py-20 text-center px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Secure your finances with confidence.
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join thousands who trust Finesure to simplify money management and protect their financial future.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="group bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition cursor-pointer flex items-center gap-2">
              Get Started Free
              <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                <i className="fa fa-angle-right"></i>
              </span>
            </button>
            <button className="bg-white text-gray-400 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 hover:text-blue-600 transition cursor-pointer">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white py-8 px-4 flex flex-col md:flex-row items-center justify-evenly gap-4">
        <div className="flex items-center space-x-2">
          <div className="text-white rounded-xl">
            <img src={logo} alt="EcoTrack Logo" className="w-6 h-6 rounded" />
          </div>
          <span className="text-xl font-semibold text-gray-800">Finsure</span>
        </div>
        <div className='flex gap-6 text-gray-600 text-2xl'>
            <a href="https://youtube.com/@helperyt3156?si=7k9qTC9RPA4x1rJN">
                <i class="fa-brands fa-youtube hover:text-green-600"></i>
            </a>
            <a href="https://www.linkedin.com/company/105344689/">
                <i class="fa-brands fa-linkedin hover:text-green-600"></i>
            </a>
            <a href="https://youtube.com/@helperyt3156?si=7k9qTC9RPA4x1rJN">
                <i class="fa-brands fa-square-x-twitter hover:text-green-600"></i>
            </a>
        </div>
        <p className="text-gray-500 text-sm">
          © 2024 Finsure. All rights reserved. Built for a sustainable future.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
