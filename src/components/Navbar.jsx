import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600">
              Service365
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 focus:outline-none p-2"
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Toggle menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 text-base">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 text-base">Services</Link>
            <Link to="/category" className="text-gray-700 hover:text-blue-600 text-base">All Categories</Link>
            <Link to="/providerform" className="text-gray-700 hover:text-blue-600 text-base">Become a Provider</Link>
            <Link to="/providergig" className="text-gray-700 hover:text-blue-600 text-base">Provider Gig</Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-base">
              Login
            </Link>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-2 py-2">
            <Link to="/" className="text-gray-700 hover:text-blue-600 text-base px-2 py-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 text-base px-2 py-2" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/category" className="text-gray-700 hover:text-blue-600 text-base px-2 py-2" onClick={() => setMenuOpen(false)}>All Categories</Link>
            <Link to="/providerform" className="text-gray-700 hover:text-blue-600 text-base px-2 py-2" onClick={() => setMenuOpen(false)}>Become a Provider</Link>
            <Link to="/providergig" className="text-gray-700 hover:text-blue-600 text-base px-2 py-2" onClick={() => setMenuOpen(false)}>Provider Gig</Link>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-base mx-2" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 