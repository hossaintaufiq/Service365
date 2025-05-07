import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ isOpen, onClose, service }) => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    notes: '',
  });

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically save the booking to your database
    console.log('Booking submitted:', bookingData);
    onClose();
    // Show success message or redirect
  };

  if (!isOpen) return null;

  // If user is not logged in
  if (!currentUser) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-md mx-2 sm:mx-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Login Required</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Please login or create an account to book this service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If user is a provider
  if (userData?.role === 'provider') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-md mx-2 sm:mx-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Provider Account</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Service providers cannot book services. Please use a regular user account to make bookings.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Booking form for logged-in users
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-md mx-2 sm:mx-0 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Book Service</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Date
            </label>
            <input
              type="date"
              name="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={bookingData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              required
              value={bookingData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Address
            </label>
            <textarea
              name="address"
              required
              value={bookingData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your service address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={bookingData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Any specific requirements or details"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal; 