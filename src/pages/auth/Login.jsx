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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaf6fb] to-[#f0f6fc] py-6 px-2 sm:px-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 flex flex-col justify-center relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 mb-6"></div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a3a5c] mb-2 text-center">Sign In</h2>
        <p className="text-gray-500 text-center mb-6 text-base sm:text-lg">Welcome back! Please login to your account.</p>
        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
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
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-sm"
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
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-sm"
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
              <Link to="#" className="font-medium text-pink-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-blue-600 hover:from-blue-700 hover:to-pink-600 shadow-lg transition-all text-lg"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Or sign in with</span>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
            <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full w-10 h-10 flex items-center justify-center"><i className="fab fa-facebook-f text-blue-600"></i></button>
            <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full w-10 h-10 flex items-center justify-center"><i className="fab fa-twitter text-blue-400"></i></button>
            <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full w-10 h-10 flex items-center justify-center"><i className="fab fa-google text-red-500"></i></button>
            <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full w-10 h-10 flex items-center justify-center"><i className="fab fa-linkedin-in text-blue-700"></i></button>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm px-2">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 