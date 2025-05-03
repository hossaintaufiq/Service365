import React from 'react';
import { useParams, Link } from 'react-router-dom';
import providers from '../../data/providers.json';
import servicesData from '../../data/services.json';

const ServiceGigList = () => {
  const { categoryId, serviceName } = useParams();
  const category = servicesData.categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
          <Link to="/category" className="text-blue-600 hover:underline">Back to Categories</Link>
        </div>
      </div>
    );
  }

  // Filter: providers whose category matches and whose services array includes the selected service
  const gigs = providers.filter(p => {
    if (!p.category || !p.services) return false;
    const matchesCategory = p.category === categoryId;
    if (serviceName) {
      // Ensure p.services is always an array
      const servicesArr = Array.isArray(p.services)
        ? p.services
        : String(p.services).split(',').map(s => s.trim());
      return (
        matchesCategory &&
        servicesArr.some(s => s.toLowerCase() === decodeURIComponent(serviceName).toLowerCase())
      );
    }
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-blue-700">
            {category.title}
            {serviceName && (
              <span className="text-lg font-normal text-gray-500 ml-2">/ {decodeURIComponent(serviceName)}</span>
            )} Providers
          </h2>
          <Link to="/category" className="text-blue-600 hover:underline">Back to Categories</Link>
        </div>
        
        {gigs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No providers found for this {serviceName ? 'service' : 'category'}.</p>
            <p className="text-gray-400">Check back later or try another {serviceName ? 'service' : 'category'}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gigs.map(provider => (
              <Link 
                key={provider.id} 
                to={`/gig/${provider.id}`}
                className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img 
                  src={`https://placehold.co/100x100?text=${provider.name.split(' ')[0]}`} 
                  alt={provider.name} 
                  className="w-24 h-24 rounded-full border-2 border-blue-600 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-700">{provider.name}</h3>
                  <div className="text-gray-600 mb-1">{provider.businessName}</div>
                  <div className="text-gray-500 mb-2">{Array.isArray(provider.services) ? provider.services.join(', ') : provider.services}</div>
                  <div className="text-sm text-gray-500 mb-2">Experience: {provider.experience} years</div>
                  <div className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition">
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceGigList; 