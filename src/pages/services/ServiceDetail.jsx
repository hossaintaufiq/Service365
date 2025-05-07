import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import BookingModal from '../../components/BookingModal';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    message: ''
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const serviceRef = doc(db, 'providers', serviceId);
        const serviceSnap = await getDoc(serviceRef);

        if (serviceSnap.exists()) {
          setService({ id: serviceSnap.id, ...serviceSnap.data() });
        } else {
          setError('Service not found');
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to load service details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the booking submission
    console.log('Booking submitted:', bookingData);
    setShowBookingModal(false);
    // Show success message or redirect
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
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/services')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Services
      </button>

      {/* Service Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <img
            src={`https://placehold.co/100x100?text=${service.name?.charAt(0) || '?'}`}
            alt={service.name}
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{service.name}</h1>
            <p className="text-xl text-gray-600">{service.businessName}</p>
          </div>
        </div>

        {/* Service Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(service.services) ? (
                  service.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))
                ) : (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {service.services}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Experience & Location</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Experience:</span> {service.experience || '0'} years
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Service Area:</span> {service.serviceArea || 'Not specified'}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Availability:</span> {service.availability || 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Pricing & Payment</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Pricing:</span> {service.pricing || 'Contact for pricing'}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Payment Methods:</span> {service.payment || 'Not specified'}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {service.email || 'Not provided'}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {service.phone || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-8">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-lg font-semibold"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Book Now
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={service}
      />
    </div>
  );
};

export default ServiceDetail; 