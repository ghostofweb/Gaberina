import React from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ onLogout, isAdmin }) => {
  const navigate = useNavigate();  // For redirecting after logout

  const handleLogout = async () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
  }


  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <Link to="/">
        <img
          src={assets.logo}
          className="w-24 sm:w-44 md:w-52"
          alt="Logo"
        />
      </Link>
      <div className="flex items-center space-x-4">
       
          <p className="text-sm text-champagne">In guest mode, you can’t add or remove products. Admin only.</p>
      
        <button 
          onClick={handleLogout}  // Trigger logout function
          className="bg-lighterDark text-buttontxt px-4 py-2 sm:px-10 sm:py-2 rounded-full text-xs sm:text-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
