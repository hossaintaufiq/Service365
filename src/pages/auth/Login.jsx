import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Redirect to profile after login
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e2a8e] via-[#7b2ff2] to-[#2a3eb1]">
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white/0">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-[#2a8ef7] to-[#7b2ff2] hover:from-[#2a3eb1] hover:to-[#a259e6] shadow-md transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">Sign in with</span>
            <div className="flex space-x-3">
              <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"><i className="fab fa-facebook-f text-blue-600"></i></button>
              <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"><i className="fab fa-twitter text-blue-400"></i></button>
              <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"><i className="fab fa-google text-red-500"></i></button>
              <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full"><i className="fab fa-linkedin-in text-blue-700"></i></button>
            </div>
          </div>
        </div>
        {/* Right: Welcome Section */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#4e2a8e] via-[#7b2ff2] to-[#2a3eb1] text-white p-8 relative">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold">💧</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Glad to see you!</h2>
            <p className="mb-6 text-center max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            </p>
            <Link
              to="/signup"
              className="w-full py-2 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-[#2a8ef7] to-[#7b2ff2] hover:from-[#2a3eb1] hover:to-[#a259e6] shadow-md transition-all text-center mb-4"
            >
              Sign Up
            </Link>
            <span className="text-gray-200 text-sm mb-2">Sign up with</span>
            <div className="flex space-x-3">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full"><i className="fab fa-facebook-f"></i></button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full"><i className="fab fa-twitter"></i></button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full"><i className="fab fa-google"></i></button>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full"><i className="fab fa-linkedin-in"></i></button>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-[#e14eca] bg-opacity-60 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login; 