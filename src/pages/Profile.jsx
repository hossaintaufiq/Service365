import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'My Bookings' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'reviews', label: 'My Reviews' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between mt-4 mb-8 max-w-2xl md:max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
            {currentUser?.displayName?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-gray-900">{currentUser?.displayName}</span>
            <span className="text-gray-500 text-xs sm:text-base">{currentUser?.email}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 md:mt-0 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition w-full md:w-auto"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 w-full">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto">
          <nav className="-mb-px flex space-x-4 sm:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`$
                  {activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {activeTab === 'overview' && (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Stats Cards */}
                <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-blue-900">Active Bookings</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">2</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-green-900">Completed Services</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">8</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-purple-900">Saved Providers</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-2">5</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-6 sm:mt-8">
                <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Recent Activity</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Booking Confirmed</p>
                      <p className="text-xs sm:text-sm text-gray-500">AC Repair Service</p>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">2 hours ago</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Service Completed</p>
                      <p className="text-xs sm:text-sm text-gray-500">Plumbing Service</p>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">My Bookings</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">AC Repair</h3>
                      <p className="text-sm text-gray-500">Provider: John's HVAC Services</p>
                      <p className="text-sm text-gray-500">Date: June 15, 2024</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Upcoming</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Plumbing Service</h3>
                      <p className="text-sm text-gray-500">Provider: Quick Fix Plumbing</p>
                      <p className="text-sm text-gray-500">Date: June 10, 2024</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Saved Providers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">J</span>
                    </div>
                    <div>
                      <h3 className="font-medium">John's HVAC Services</h3>
                      <p className="text-sm text-gray-500">HVAC Services</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★★★★★</span>
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600">Q</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Quick Fix Plumbing</h3>
                      <p className="text-sm text-gray-500">Plumbing Services</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★★★★☆</span>
                        <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">My Reviews</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400">★★★★★</div>
                    <span className="ml-2 text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-700">Excellent service! The plumber was very professional and fixed the issue quickly.</p>
                  <p className="text-sm text-gray-500 mt-2">- Quick Fix Plumbing</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400">★★★★☆</div>
                    <span className="ml-2 text-sm text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-gray-700">Good service overall. The technician was knowledgeable and friendly.</p>
                  <p className="text-sm text-gray-500 mt-2">- John's HVAC Services</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={currentUser?.displayName || ''}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifications"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                        Email Notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="marketing"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
                        Marketing Communications
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Security</h3>
                  <div className="space-y-4">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      Change Password
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 