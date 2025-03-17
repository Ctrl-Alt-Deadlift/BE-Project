import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for hamburger menu

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">Brand</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <NavLink to="/" className="hover:text-gray-900">Home</NavLink>
          <NavLink to="/addproduct" className="hover:text-gray-900">Add Product</NavLink>
          <NavLink to="/request" className="hover:text-gray-900">Requests</NavLink>
          <NavLink to="/moreInfo" className="hover:text-gray-900">More Info</NavLink>
          <button
            onClick={() => !isLoggedIn && navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoggedIn ? "Logout" : "Login / Register"}
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 text-2xl" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-white shadow-lg py-4 px-6 space-y-4 text-gray-700">
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/addproduct" onClick={toggleMenu}>Add Product</NavLink>
          <NavLink to="/request" onClick={toggleMenu}>Requests</NavLink>
          <NavLink to="/moreInfo" onClick={toggleMenu}>More Info</NavLink>
          <button
            onClick={() => {
              if (!isLoggedIn) navigate('/login');
              toggleMenu();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoggedIn ? "Logout" : "Login / Register"}
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
