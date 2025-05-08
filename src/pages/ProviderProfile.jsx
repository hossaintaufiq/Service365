import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProviderProfile = () => {
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
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'services', label: 'My Services', icon: '🔧' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Mock data - replace with actual data from your backend
  const providerData = {
    rating: 4.8,
    totalReviews: 156,
    completedJobs: 289,
    responseRate: 98,
    responseTime: '15 min',
    services: ['Plumbing', 'Electrical', 'HVAC'],
    availability: 'Available Now',
    experience: '5 years',
    certifications: ['Licensed Plumber', 'Certified Electrician'],
    languages: ['English', 'Spanish'],
    businessName: "John's Professional Services",
    businessType: 'Individual',
    joinedDate: '2022-03-15',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between mt-6 mb-8 max-w-4xl mx-auto w-full gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {currentUser?.displayName?.charAt(0) || 'P'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-2xl font-bold text-gray-900">{providerData.businessName}</h1>
            <p className="text-gray-500 text-sm mt-1">{currentUser?.email}</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-sm text-gray-500 ml-1">({providerData.rating})</span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{providerData.totalReviews} reviews</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">Member since {new Date(providerData.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 px-6 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <nav className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  ${activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
                  } flex items-center space-x-2 px-4 py-3 border-b-2 font-medium text-sm rounded-lg transition-all duration-200`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {activeTab === 'overview' && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-blue-900">Completed Jobs</h3>
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mt-4">{providerData.completedJobs}</p>
                  <p className="text-sm text-blue-600 mt-2">+12 this month</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-green-900">Response Rate</h3>
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mt-4">{providerData.responseRate}%</p>
                  <p className="text-sm text-green-600 mt-2">Avg. response: {providerData.responseTime}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-900">Total Reviews</h3>
                    <span className="text-2xl">⭐</span>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mt-4">{providerData.totalReviews}</p>
                  <p className="text-sm text-purple-600 mt-2">4.8 average rating</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-yellow-900">Experience</h3>
                    <span className="text-2xl">🎓</span>
                  </div>
                  <p className="text-3xl font-bold text-yellow-600 mt-4">{providerData.experience}</p>
                  <p className="text-sm text-yellow-600 mt-2">{providerData.certifications.length} certifications</p>
                </div>
              </div>

              {/* Provider Details */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Business Type</span>
                      <span className="font-medium text-gray-900">{providerData.businessType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Services Offered</span>
                      <div className="flex flex-wrap gap-2">
                        {providerData.services.map((service, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Certifications</span>
                      <div className="flex flex-wrap gap-2">
                        {providerData.certifications.map((cert, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Languages</span>
                      <div className="flex flex-wrap gap-2">
                        {providerData.languages.map((lang, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600">📝</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New Booking</p>
                          <p className="text-sm text-gray-500">AC Repair Service</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600">✅</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Service Completed</p>
                          <p className="text-sm text-gray-500">Plumbing Service</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600">⭐</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">New Review</p>
                          <p className="text-sm text-gray-500">5-star rating received</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Services</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Add New Service
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providerData.services.map((service, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{service}</h3>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Base Price</span>
                        <span className="font-medium text-gray-900">$50/hour</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Availability</span>
                        <span className="font-medium text-green-600">Available Now</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Bookings</span>
                        <span className="font-medium text-gray-900">24</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Bookings</h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xl">❄️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">AC Repair</h3>
                        <p className="text-sm text-gray-500">Client: Sarah Johnson</p>
                        <p className="text-sm text-gray-500">Date: June 15, 2024 - 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-medium">Upcoming</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">View Details</button>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xl">🔧</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Plumbing Service</h3>
                        <p className="text-sm text-gray-500">Client: Mike Brown</p>
                        <p className="text-sm text-gray-500">Date: June 16, 2024 - 10:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-medium">Upcoming</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Customer Reviews</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl text-yellow-400">★★★★★</span>
                  <span className="text-lg font-medium text-gray-900">{providerData.rating}</span>
                  <span className="text-gray-500">({providerData.totalReviews} reviews)</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">SJ</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                  <p className="text-gray-700 mb-4">Excellent service! The technician was very professional and fixed the issue quickly. Would definitely recommend.</p>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AC Repair</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">On Time</span>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">MB</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Mike Brown</h3>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </div>
                    <div className="text-yellow-400">★★★★☆</div>
                  </div>
                  <p className="text-gray-700 mb-4">Good service overall. The plumber was knowledgeable and friendly. Would use again.</p>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Plumbing</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Professional</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-green-900">Total Earnings</h3>
                    <span className="text-2xl">💰</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mt-4">$12,450</p>
                  <p className="text-sm text-green-600 mt-2">+$1,200 this month</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-blue-900">Completed Jobs</h3>
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mt-4">289</p>
                  <p className="text-sm text-blue-600 mt-2">+24 this month</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-900">Average Rate</h3>
                    <span className="text-2xl">📊</span>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 mt-4">$85/hr</p>
                  <p className="text-sm text-purple-600 mt-2">+$5 from last month</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">AC Repair Service</p>
                        <p className="text-sm text-gray-500">Transaction ID: #12345</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+$150.00</p>
                      <p className="text-sm text-gray-500">June 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600">💰</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Plumbing Service</p>
                        <p className="text-sm text-gray-500">Transaction ID: #12344</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+$200.00</p>
                      <p className="text-sm text-gray-500">June 14, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-8">Account Settings</h2>
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Business Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        value={providerData.businessName}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                      <select
                        value={providerData.businessType}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      >
                        <option>Individual</option>
                        <option>Company</option>
                        <option>Partnership</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Service Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Areas</label>
                      <input
                        type="text"
                        placeholder="Enter service areas"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="time"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                        <input
                          type="time"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Radius</label>
                      <input
                        type="number"
                        placeholder="Enter service radius in miles"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Security</h3>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <span>Change Password</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                      <span>Delete Account</span>
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
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

export default ProviderProfile; 