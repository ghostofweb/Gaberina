import React, { useContext, useState } from 'react';
import { useLocation, Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setShowSearch , cartCount,token,setToken,setCartItems} = useContext(ShopContext);
  const adminLink = "https://gaberina-yrai.vercel.app"
  const logout = ()=>{
    setToken(null)
    localStorage.removeItem("token")
    setCartItems({})
    toast.success('Logged out successfully!', {
      position: 'top-right',
      style: {
        backgroundColor: '#1E1E1E',
        color: '#FDFBF6',
      },
    });
    navigate("/login")
  }
  // Highlight current nav link
  const getHrStyle = (path) => ({
    display: location.pathname === path ? 'block' : 'none',
  });

  // Handle Search Icon Click
  const handleSearchClick = () => {
    setShowSearch(true);
    if (!location.pathname.includes('/collection')) {
      navigate('/collection'); // Redirect to the collection page
    }
  };

  return (
    <div className="flex items-center justify-between font-medium mb-3 bg-dark px-4 sm:px-6">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          className="w-24 sm:w-44 md:w-52" // Responsive widths for the logo
          alt="Logo"
        />
      </Link>

      {/* Desktop nav links */}
      <ul className="hidden sm:flex gap-4 md:gap-9 text-sm md:text-base text-gold">
  <NavLink
    to="/"
    className="flex flex-col items-center gap-1 group relative"
  >
    <p className="font-semibold transition-colors duration-200 ease-in-out group-hover:text-champagne">
      HOME
    </p>
    <hr
      className="w-2/4 border-none h-[1.5px] bg-gold transition-colors duration-200 ease-in-out"
      style={getHrStyle("/")}
    />
  </NavLink>

  <NavLink
    to="/collection"
    className="flex flex-col items-center gap-1 group relative"
  >
    <p className="font-semibold transition-colors duration-200 ease-in-out group-hover:text-champagne">
      COLLECTION
    </p>
    <hr
      className="w-2/4 border-none h-[1.5px] bg-gold transition-colors duration-200 ease-in-out"
      style={getHrStyle("/collection")}
    />
  </NavLink>

  <NavLink
    to="/about"
    className="flex flex-col items-center gap-1 group relative"
  >
    <p className="font-semibold transition-colors duration-200 ease-in-out group-hover:text-champagne">
      ABOUT
    </p>
    <hr
      className="w-2/4 border-none h-[1.5px] bg-gold transition-colors duration-200 ease-in-out"
      style={getHrStyle("/about")}
    />
  </NavLink>

  <NavLink
    to="/contact"
    className="flex flex-col items-center gap-1 group relative"
  >
    <p className="font-semibold transition-colors duration-200 ease-in-out group-hover:text-champagne">
      CONTACT
    </p>
    <hr
      className="w-2/4 border-none h-[1.5px] bg-gold transition-colors duration-200 ease-in-out"
      style={getHrStyle("/contact")}
    />
  </NavLink>

  <NavLink
    to={adminLink}
    className="flex flex-col items-center gap-1 group relative"
  >
    <p className="font-semibold transition-colors duration-200 ease-in-out group-hover:text-champagne">
      ADMIN
    </p>
    <hr
      className="w-2/4 border-none h-[1.5px] bg-gold transition-colors duration-200 ease-in-out"
      style={getHrStyle("/admin")}
    />
  </NavLink>
</ul>


      <div className="flex items-center gap-4 md:gap-6">
        {/* Search icon */}
        <SearchIcon
    
          onClick={handleSearchClick}
          sx={{
            cursor: 'pointer',
            color: '#CFC4B9',
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }, // Responsive sizes
            '&:hover': { color: '#C5A253' },
          }}
        />

        {/* Profile dropdown */}
        <div className="group relative">
  <PersonIcon
    sx={{
      cursor: 'pointer',
      color: '#CFC4B9',
      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }, // Responsive sizes
      '&:hover': { color: '#C5A253' },
    }}
  />
 <div
      className="group-hover:block hidden absolute dropdown-menu right-0 pt-4"
      style={{ zIndex: 50 }} // Ensures it floats above other elements
    >
      <div className="flex flex-col gap-3 px-5 w-36 py-5 bg-lighterDark text-gold rounded-lg shadow-lg">
        {token || localStorage.getItem('token') ? (
          <>
            <p
              onClick={() => navigate('/orders')}
              className="cursor-pointer hover:text-champagne text-lg border-b border-white pb-3 transition duration-300 ease-in-out"
            >
              Orders
            </p>
            <p
              onClick={logout}
              className="cursor-pointer hover:text-champagne text-lg border-b border-white pb-3 transition duration-300 ease-in-out"
            >
              Logout
            </p>
          </>
        ) : (
          <Link to="/login">
            <p className="cursor-pointer hover:text-champagne text-lg border-b border-white pb-3 transition duration-300 ease-in-out">
              Login
            </p>
          </Link>
        )}
      </div>
    </div>
</div>


        {/* Cart icon */}
        <Link to="/cart" className="relative">
        <LocalMallIcon
    sx={{
        cursor: 'pointer',
        color: '#CFC4B9',
        fontSize: { xs: '1.7rem', sm: '2rem', md: '2.2rem' },
        '&:hover': { color: '#C5A253' },
    }}
/>
<p className="absolute -right-2 -bottom-2 flex items-center justify-center w-6 h-5 bg-gold text-dark font-bold rounded-full text-xs border-2 border-white shadow-md">
    {cartCount}
</p>

        </Link>

        {/* Mobile menu icon */}
        <div className="block sm:hidden">
          <MenuIcon
            onClick={() => setVisible(!visible)}
            sx={{
              cursor: 'pointer',
              color: '#CFC4B9',
              fontSize: { xs: '1.7rem', sm: '2rem', md: '2.2rem' }, // Responsive sizes
              '&:hover': { color: '#C5A253' },
            }}
          />
        </div>
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bg-lighterDark transition-all duration-300 ease-in-out ${
          visible ? 'w-3/4 h-full' : 'w-0 h-0'
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gold">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <ArrowBackIcon
              sx={{
                fontSize: { xs: '1.7rem', sm: '2rem', md: '2.2rem' },
              }}
            />
            <p className="text-xl">Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-champagne transition-colors duration-200 ease-in-out"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-champagne transition-colors duration-200 ease-in-out"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-champagne transition-colors duration-200 ease-in-out"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-champagne transition-colors duration-200 ease-in-out"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
