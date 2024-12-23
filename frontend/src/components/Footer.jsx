import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-darkGrey border-t text-white py-12 mt-40 w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-10">
          {/* Left Section: Logo and Description */}
          <div className="flex flex-col items-start">
            <img src={assets.logo} className="mb-5 w-32" alt="logo" />
            <p className="text-base md:w-2/3 text-lightGray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          
          {/* Middle Section: Company Links */}
          <div>
            <p className="text-xl font-semibold mb-5 text-gold">COMPANY</p>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gold">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
              <li><Link to="/delivery" className="hover:text-gold">Delivery</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Right Section: Social Media Links (if needed) */}
          <div>
            <p className="text-xl font-semibold mb-5 text-gold">FOLLOW US</p>
            <ul className="space-y-2">
              {/* Add your social media links here */}
              <li><Link to="https://www.instagram.com/gaberinaofficial?igsh=MWQ2d3gxYnoxMjlwaw==" className="hover:text-gold">Instagram</Link></li>
              <li><Link to="#" className="hover:text-gold">Facebook</Link></li>
              <li><Link to="#" className="hover:text-gold">Twitter</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="text-center mt-3 border-lightGray pt-6">
          <p className="text-sm text-lightGray">&copy; {new Date().getFullYear()} Gaberina. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
