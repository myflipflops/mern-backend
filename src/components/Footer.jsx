import React from 'react'
import footerLogo from "../assets/footer-logo.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          {/* Ensure footerLogo is visually appealing; consider replacing with text if image is low-res */}
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" /> 
          <ul className="flex flex-col md:flex-row gap-4">
            <li><a href="#home" className="hover:text-indigo-400 transition-colors duration-200">Home</a></li>
            <li><a href="#services" className="hover:text-indigo-400 transition-colors duration-200">Services</a></li>
            <li><a href="#about" className="hover:text-indigo-400 transition-colors duration-200">About Us</a></li>
            <li><a href="#contact" className="hover:text-indigo-400 transition-colors duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Right Side - Newsletter (kept for original functionality, can be removed if desired) */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4 text-gray-300">
            Stay updated with our latest collections and exclusive offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 px-6 py-2 rounded-r-md hover:bg-indigo-700 text-white font-medium transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Copyright & Designed By */}
        <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()} Book Store. All rights reserved. <br/>
          <span className="font-semibold text-indigo-300 tracking-wide">Designed by Parag Chaudhary</span> {/* Your name added */}
        </div>

        {/* Right Side - Privacy Links and Social Icons */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <ul className="flex gap-6 mb-4 sm:mb-0">
                <li><a href="#privacy" className="hover:text-indigo-400 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-indigo-400 transition-colors duration-200">Terms of Service</a></li>
            </ul>
            <div className="flex gap-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors duration-200">
                    <FaFacebook size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors duration-200">
                    <FaTwitter size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors duration-200">
                    <FaInstagram size={24} />
                </a>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
