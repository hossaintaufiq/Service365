import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../../data/services.json';

const Category = () => {
  // For smooth scrolling to category sections
  const sectionRefs = useRef({});

  const handleCategoryClick = (id) => {
    if (sectionRefs.current[id]) {
      sectionRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r p-6 sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">All Categories</h2>
        <ul className="space-y-3">
          {servicesData.categories.map((cat) => (
            <li key={cat.id}>
              <button
                className="text-left w-full text-gray-700 hover:text-blue-600 focus:outline-none"
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        {servicesData.categories.map((category) => (
          <section
            key={category.id}
            ref={el => (sectionRefs.current[category.id] = el)}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-3">
              {category.image && (
                <img src={category.image} alt={category.title} className="w-10 h-10 object-cover rounded-lg border border-gray-200" />
              )}
              {category.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {category.services.map((service, idx) => (
                <Link
                  key={service.name + idx}
                  to={`/category/${category.id}/${encodeURIComponent(service.name)}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center p-4 min-h-[180px] border border-gray-100 cursor-pointer"
                >
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-20 h-20 object-cover rounded-lg mb-3 border border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 border border-gray-200">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  )}
                  <span className="text-center text-gray-800 font-medium text-base mt-1">{service.name}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Category; 