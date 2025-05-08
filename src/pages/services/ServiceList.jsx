import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const providersRef = collection(db, 'providers');
        const q = query(providersRef);
        
        const querySnapshot = await getDocs(q);
        const serviceList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setServices(serviceList);
        setSearchResults(serviceList);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Enhanced search functionality
  useEffect(() => {
    const performSearch = () => {
      if (!searchTerm.trim() && selectedCategory === 'all') {
        setSearchResults(services);
        return;
      }

      const searchLower = searchTerm.toLowerCase().trim();
      
      const filtered = services.filter(service => {
        // Search in multiple fields
        const searchFields = [
          service.name,
          service.businessName,
          service.serviceArea,
          service.availability,
          service.pricing,
          service.payment
        ].filter(Boolean); // Remove null/undefined values

        // Handle services array
        const serviceList = Array.isArray(service.services) 
          ? service.services 
          : service.services ? [service.services] : [];

        // Check if any search field contains the search term
        const matchesSearch = searchFields.some(field => 
          field.toLowerCase().includes(searchLower)
        ) || serviceList.some(s => 
          s.toLowerCase().includes(searchLower)
        );

        // Check category match
        const matchesCategory = selectedCategory === 'all' || 
          service.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      setSearchResults(filtered);
    };

    // Debounce search to improve performance
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, services]);

  // Get unique categories from services, filtering out undefined/null values
  const categories = ['all', ...new Set(services
    .map(service => service.category)
    .filter(Boolean))];

  // Helper function to format category name
  const formatCategoryName = (category) => {
    if (!category) return 'Uncategorized';
    try {
      return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch (error) {
      console.error('Error formatting category:', error);
      return category || 'Uncategorized';
    }
  };

  // Helper function to safely get first character
  const getFirstChar = (str) => {
    if (!str) return '?';
    return str.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Services</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name, business, services, location..."
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-3 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <select
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : formatCategoryName(category)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results Count */}
      <div className="mb-4 text-gray-600">
        Found {searchResults.length} {searchResults.length === 1 ? 'service' : 'services'}
        {searchTerm && ` matching "${searchTerm}"`}
        {selectedCategory !== 'all' && ` in ${formatCategoryName(selectedCategory)}`}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map(service => (
          <Link 
            to={`/services/${service.id}`} 
            key={service.id}
            className="block bg-gradient-to-br from-[#f0f6fc] to-white rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center mr-4 border-2 border-blue-200 group-hover:scale-105 transition-transform">
                  <img
                    src={`https://placehold.co/60x60?text=${getFirstChar(service.name)}`}
                    alt={service.name || 'Service Provider'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#0a3a5c] group-hover:text-pink-600 transition-colors truncate">{service.name || 'Unnamed Provider'}</h3>
                  {/* Services Provided */}
                  <div className="text-xs sm:text-sm text-blue-700 font-semibold mt-1 mb-1 truncate">
                    {Array.isArray(service.services) ? service.services.join(', ') : service.services || 'No services listed'}
                  </div>
                  {/* Rating Row */}
                  <div className="flex items-center mt-1 mb-1">
                    {(() => {
                      const rating = typeof service.rating === 'number' ? service.rating : 4.5;
                      const fullStars = Math.floor(rating);
                      const halfStar = rating % 1 >= 0.5;
                      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
                      return [
                        ...Array(fullStars).fill(<svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>),
                        halfStar && <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stopColor="#facc15"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient></defs><path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>,
                        ...Array(emptyStars).fill(<svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>),
                        <span className="ml-2 text-xs text-gray-500 font-semibold">{rating.toFixed(1)}</span>
                      ];
                    })()}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 flex-1">
                <p className="text-sm text-gray-700"><span className="font-semibold text-blue-700">Business Name:</span> {service.businessName || 'No Business Name'}</p>
                <p className="text-sm text-gray-700"><span className="font-semibold text-blue-700">Experience:</span> {service.experience || '0'} years</p>
                <p className="text-sm text-gray-700"><span className="font-semibold text-blue-700">Location:</span> {service.serviceArea || 'Not specified'}</p>
                <p className="text-sm text-gray-700"><span className="font-semibold text-blue-700">Availability:</span> {service.availability || 'Not specified'}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-pink-600">{service.pricing || 'Contact for pricing'}</span>
                  <span className="text-xs text-gray-400 font-semibold">{service.payment || 'Payment method not specified'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {searchResults.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No services found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceList; 