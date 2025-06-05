
import React, { useEffect, useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { sellerContext } from '../Context/sellerContext.jsx';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, setToken } = useContext(sellerContext);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleAuthClick = () => {
    if (token) {
      // Logout logic
      localStorage.removeItem("supplierToken");
      localStorage.removeItem("supplier");
      setToken('');
      navigate('/login');

    } else {
      // Login/Register logic
      navigate('/login');
    }
    toggleMenu(); // Close menu after clicking
  };

  useEffect(() => {
    // No changes needed here, token updates will re-render component
  }, [token]);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Brand</Link>

        {/* Desktop Menu */}
        {token && (
          <ul className="hidden md:flex space-x-6 text-gray-700">

            <li><NavLink to="/home" className="hover:text-gray-900">Home</NavLink></li>
            <li><NavLink to="/addproduct" className="hover:text-gray-900">Add Product</NavLink></li>
            <li><NavLink to="/request" className="hover:text-gray-900">Requests</NavLink></li>
            <li><NavLink to="/moreInfo" className="hover:text-gray-900">Supplier Information</NavLink></li>
            <li>
              <button
                onClick={handleAuthClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 text-2xl" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-white shadow-lg py-4 px-6 space-y-4 text-gray-700">

          {token && (
            <>
              <li><NavLink to="/home" onClick={toggleMenu}>Home</NavLink></li>
              <li><NavLink to="/addproduct" onClick={toggleMenu}>Add Product</NavLink></li>
              <li><NavLink to="/request" onClick={toggleMenu}>Requests</NavLink></li>
              <li><NavLink to="/moreInfo" onClick={toggleMenu}>Supplier Information</NavLink></li>
              <li>
                <button
                  onClick={handleAuthClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;