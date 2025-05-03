import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">
            Your One-Stop Solution for All Home Services
          </h1>
          <p className="text-xl mb-8">
            Professional, reliable, and affordable services for your home and business needs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner; 