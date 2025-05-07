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
            to={`/gig/${service.id}`} 
            key={service.id}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={`https://placehold.co/60x60?text=${getFirstChar(service.name)}`}
                  alt={service.name || 'Service Provider'}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{service.name || 'Unnamed Provider'}</h3>
                  <p className="text-sm text-gray-600">{service.businessName || 'No Business Name'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Services:</span>{' '}
                  {Array.isArray(service.services) 
                    ? service.services.join(', ')
                    : service.services || 'No services listed'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {service.experience || '0'} years
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {service.serviceArea || 'Not specified'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Availability:</span> {service.availability || 'Not specified'}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-600">
                    {service.pricing || 'Contact for pricing'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {service.payment || 'Payment method not specified'}
                  </span>
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