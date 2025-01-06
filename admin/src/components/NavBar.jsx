import React from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate();  // For redirecting after logout

  const handleLogout = async () => {
    try {
      // Call the backend to logout and invalidate the token
      const response = await axios.post('http://localhost:4000/api/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        console.log('Logged out successfully');
        
        // Trigger logout callback passed from App
        onLogout();
        
        // Optionally, redirect to login pag
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <Link to="/">
        <img
          src={assets.logo}
          className="w-24 sm:w-44 md:w-52"
          alt="Logo"
        />
      </Link>
      <button 
        onClick={handleLogout}  // Trigger logout function
        className="bg-lighterDark text-buttontxt px-4 py-2 sm:px-10 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
