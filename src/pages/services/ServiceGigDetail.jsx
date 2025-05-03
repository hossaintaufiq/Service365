import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import providers from '../../data/providers.json';

const InfoRow = ({ label, value }) => (
  <div className="flex mb-2">
    <div className="w-48 font-semibold text-gray-700">{label}:</div>
    <div className="flex-1 text-gray-800">{value || <span className="text-gray-400">N/A</span>}</div>
  </div>
);

const getReviews = (providerId) => {
  return JSON.parse(localStorage.getItem(`reviews_${providerId}`) || '[]');
};

const ServiceGigDetail = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const provider = providers.find(p => String(p.id) === String(providerId));
  const [reviews, setReviews] = useState(getReviews(providerId));
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [booking, setBooking] = useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    service: provider.services && Array.isArray(provider.services) && provider.services.length > 0 ? provider.services[0] : '',
    date: '',
    time: '',
    notes: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Provider Not Found</h2>
          <p className="text-gray-600 mb-4">The provider you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!review.trim() || !name.trim()) return;
    const newReviews = [...reviews, { name, text: review, date: new Date().toLocaleString() }];
    setReviews(newReviews);
    localStorage.setItem(`reviews_${providerId}`, JSON.stringify(newReviews));
    setReview('');
    setName('');
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingError('');
    // Validation
    if (!booking.userName.trim() || !booking.userPhone.trim() || !booking.userEmail.trim() || !booking.date || !booking.time || !booking.service) {
      setBookingError('Please fill in all required fields.');
      return;
    }
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    if (isNaN(bookingDateTime.getTime()) || bookingDateTime < new Date()) {
      setBookingError('Please select a valid future date and time.');
      return;
    }
    // Save booking to localStorage (demo)
    const bookings = JSON.parse(localStorage.getItem(`bookings_${providerId}`) || '[]');
    bookings.push({ ...booking, dateTime: bookingDateTime.toISOString(), created: new Date().toISOString() });
    localStorage.setItem(`bookings_${providerId}`, JSON.stringify(bookings));
    setBookingSuccess(true);
    setBooking({
      userName: '',
      userPhone: '',
      userEmail: '',
      service: provider.services && Array.isArray(provider.services) && provider.services.length > 0 ? provider.services[0] : '',
      date: '',
      time: '',
      notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-blue-600 hover:underline flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Providers
        </button>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <img 
              src={`https://placehold.co/120x120?text=${provider.name.split(' ')[0]}`} 
              alt={provider.name} 
              className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-1">{provider.name}</h2>
              <div className="text-gray-600 mb-2">{provider.businessName}</div>
              <div className="text-sm text-gray-500">{provider.bio}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-2">Contact & Basic Info</h3>
              <InfoRow label="Phone" value={provider.phone} />
              <InfoRow label="Email" value={provider.email} />
              <InfoRow label="Address" value={provider.address} />
              <InfoRow label="Government ID" value={provider.govId} />
              <InfoRow label="Business License" value={provider.license} />
              <InfoRow label="Social Media" value={<a href={provider.social} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{provider.social}</a>} />
              <InfoRow label="Website" value={<a href={provider.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{provider.website}</a>} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-2">Professional Details</h3>
              <InfoRow label="Services Offered" value={provider.services} />
              <InfoRow label="Experience" value={provider.experience + ' years'} />
              <InfoRow label="Certifications" value={provider.certifications} />
              <InfoRow label="References" value={provider.references} />
              <InfoRow label="Service Area" value={provider.serviceArea} />
              <InfoRow label="Availability" value={provider.availability} />
              <InfoRow label="Scheduling" value={provider.scheduling} />
              <InfoRow label="Pricing" value={provider.pricing} />
              <InfoRow label="Payment Methods" value={provider.payment} />
              <InfoRow label="Discounts" value={provider.discounts} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-2">Legal & Safety</h3>
              <InfoRow label="Insurance" value={provider.insurance} />
              <InfoRow label="Contract" value={provider.contract} />
              <InfoRow label="Background Check" value={provider.backgroundCheck} />
              <InfoRow label="Emergency Contact" value={provider.emergencyContact} />
              <InfoRow label="Languages" value={provider.languages} />
              <InfoRow label="Quality Assurance" value={provider.qualityAssurance} />
              <InfoRow label="Feedback" value={provider.feedback} />
              <InfoRow label="Renewal Dates" value={provider.renewal} />
              <InfoRow label="Update Commitments" value={provider.updateCommitment} />
              <InfoRow label="Tax Form" value={provider.taxForm} />
              <InfoRow label="Data Privacy" value={provider.dataPrivacy} />
              <InfoRow label="Dispute Resolution" value={provider.dispute} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-600 mb-2">Portfolio & Branding</h3>
              <InfoRow label="Profile Photo/Logo" value={provider.profilePhoto} />
              <InfoRow label="Keywords" value={provider.keywords} />
              <InfoRow label="Portal Access" value={provider.portalAccess} />
              <InfoRow label="Tools" value={provider.tools} />
              <InfoRow label="Equipment" value={provider.equipment} />
              <div className="mb-2">
                <div className="w-48 font-semibold text-gray-700">Portfolio:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {provider.portfolio && provider.portfolio.length > 0 ? provider.portfolio.map((file, idx) => (
                    <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">{file}</span>
                  )) : <span className="text-gray-400">N/A</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-blue-700 mb-4">User Reviews</h3>
            {reviews.length === 0 && <div className="text-gray-500 mb-4">No reviews yet. Be the first to review!</div>}
            <div className="space-y-4 mb-6">
              {reviews.map((r, idx) => (
                <div key={idx} className="bg-gray-100 rounded p-4">
                  <div className="font-semibold text-blue-600">{r.name}</div>
                  <div className="text-gray-700 mb-1">{r.text}</div>
                  <div className="text-xs text-gray-400">{r.date}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleReviewSubmit} className="bg-white border rounded p-4 flex flex-col gap-2 mb-12">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none"
                required
              />
              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={e => setReview(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none"
                rows={3}
                required
              />
              <button type="submit" className="self-end bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition mt-2">Submit Review</button>
            </form>

            {/* Booking Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Book This Provider</h3>
              {bookingSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Booking successful! The provider will contact you soon.</div>
              )}
              {bookingError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{bookingError}</div>
              )}
              <form onSubmit={handleBookingSubmit} className="bg-white border rounded p-4 flex flex-col gap-3">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Your Name</label>
                    <input name="userName" value={booking.userName} onChange={handleBookingChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Phone</label>
                    <input name="userPhone" value={booking.userPhone} onChange={handleBookingChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Email</label>
                    <input name="userEmail" type="email" value={booking.userEmail} onChange={handleBookingChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Service</label>
                    <select name="service" value={booking.service} onChange={handleBookingChange} required className="w-full px-3 py-2 border rounded focus:outline-none">
                      <option value="">Select a service</option>
                      {Array.isArray(provider.services) ? provider.services.map(s => (
                        <option key={s} value={s}>{s}</option>
                      )) : (
                        <option value={provider.services}>{provider.services}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Preferred Date</label>
                    <input name="date" type="date" value={booking.date} onChange={handleBookingChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Preferred Time</label>
                    <input name="time" type="time" value={booking.time} onChange={handleBookingChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Additional Notes (optional)</label>
                  <textarea name="notes" value={booking.notes} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded focus:outline-none" rows={2} />
                </div>
                <button type="submit" className="self-end bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition mt-2">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceGigDetail; 