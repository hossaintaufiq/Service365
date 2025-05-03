import React from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../data/services.json';

const Categories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <ul className="space-y-2">
                  {category.services.map((service, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="mr-2">•</span>
                      {service.name}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/category/${category.id}`}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 