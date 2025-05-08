import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userData } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white text-black border-b-4 border-[#0a3a5c] shadow transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              Service365
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className="border-transparent hover:border-pink-400 hover:text-pink-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="border-transparent hover:border-pink-400 hover:text-pink-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
            >
              Services
            </Link>
            {currentUser && userData?.role === 'provider' && (
              <Link
                to="/providerform"
                className="border-transparent hover:border-pink-400 hover:text-pink-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
              >
                Register Your Business
              </Link>
            )}
            {currentUser ? (
              <Link
                to="/profile"
                className="hover:text-blue-200 px-3 py-2 rounded-md text-sm font-semibold flex items-center transition-all duration-200 hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 via-pink-300 to-purple-400 bg-opacity-40 rounded-full flex items-center justify-center mr-2">
                  <span className="text-pink-500 font-bold">
                    {currentUser.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
                Profile
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-blue-600 hover:to-pink-600 px-4 py-2 rounded-md text-sm font-bold shadow-md transition-all duration-200 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-pink-400 hover:bg-blue-100 bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  style={{ color: 'black' }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  style={{ color: 'black' }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white bg-opacity-90 backdrop-blur-md text-blue-900">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-semibold hover:text-pink-500 hover:bg-blue-50 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-semibold hover:text-pink-500 hover:bg-blue-50 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            {currentUser && userData?.role === 'provider' && (
              <Link
                to="/providerform"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-semibold hover:text-pink-500 hover:bg-blue-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Register Your Business
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {currentUser ? (
              <Link
                to="/profile"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-semibold hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-semibold hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-blue-600 hover:to-pink-600 hover:text-white hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 