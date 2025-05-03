import React from 'react';
import providers from '../../data/providers.json';

const provider = providers[0]; // For demo, show the first provider

const InfoRow = ({ label, value }) => (
  <div className="flex mb-2">
    <div className="w-48 font-semibold text-gray-700">{label}:</div>
    <div className="flex-1 text-gray-800">{value || <span className="text-gray-400">N/A</span>}</div>
  </div>
);

const ProviderGig = () => {
  if (!provider) return <div className="p-8 text-center">Provider not found.</div>;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <img src={`https://placehold.co/120x120?text=${provider.name.split(' ')[0]}`} alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover" />
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
      </div>
    </div>
  );
};

export default ProviderGig; 