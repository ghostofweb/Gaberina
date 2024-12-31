import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/collection')) {
      setShowSearch(true);  // Show search bar on collection page
    } else {
      setShowSearch(false);  // Hide search bar on other pages
      setSearch('');  // Optionally reset search input on page change
    }
  }, [location, setShowSearch, setSearch]);

  return showSearch ? (
    <div className="border-t border-b border-gold py-2 text-center transition-all duration-500 ease-in-out opacity-100 scale-100">
      <div className="inline-flex items-center justify-center border-2 border-champagne hover:border-gold px-5 py-2 mx-2 rounded-full w-3/4 sm:w-1/2 transition-all duration-300 ease-in-out">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="flex-1 outline-none bg-inherit text-sm text-gold placeholder-gold transition-all duration-300 ease-in-out"
          placeholder="Search"
        />
        <img className="w-4 transition-transform duration-300 ease-in-out hover:scale-125" src={assets.search_icon} alt="Search" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out"
        src={assets.cross_icon}
        alt="Close Search"
      />
    </div>
  ) : null;
};

export default SearchBar;
