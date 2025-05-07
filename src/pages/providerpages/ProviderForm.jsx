import React, { useState } from 'react';
import { db, realtimeDb } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import servicesData from '../../data/services.json';

const initialState = {
  // Step 1
  category: '',
  services: [],
  name: '',
  businessName: '',
  phone: '',
  email: '',
  address: '',
  govId: '',
  license: '',
  social: '',
  website: '',
  // Step 2
  experience: '',
  certifications: '',
  portfolio: [],
  references: '',
  serviceArea: '',
  availability: '',
  scheduling: '',
  pricing: '',
  payment: '',
  cancellation: '',
  discounts: '',
  // Step 3
  insurance: '',
  contract: '',
  profilePhoto: '',
  bio: '',
  keywords: '',
  portalAccess: '',
  tools: '',
  equipment: '',
  backgroundCheck: '',
  emergencyContact: '',
  languages: '',
  qualityAssurance: '',
  feedback: '',
  renewal: '',
  updateCommitment: '',
  taxForm: '',
  dataPrivacy: '',
  dispute: '',
};

const steps = [
  'Basic Information',
  'Professional & Operational',
  'Legal, Branding & Safety',
];

const ProviderForm = () => {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type, options } = e.target;
    if (files) {
      setForm({ ...form, [name]: Array.from(files).map(f => f.name) });
    } else if (type === 'select-multiple') {
      const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
      setForm({ ...form, [name]: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const handleBack = (e) => {
    e.preventDefault();
    setStep((s) => Math.max(s - 1, 0));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const providerData = {
        ...form,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      // Debug: Log the data you are about to send
      console.log('Submitting provider data:', providerData);

      const docRef = await addDoc(collection(db, 'providers'), providerData);
      console.log('Provider added to Firestore with ID:', docRef.id);

      // Add to Realtime Database with the same ID
      const providerRef = ref(realtimeDb, 'providers/' + docRef.id);
      await set(providerRef, {
        ...providerData,
        id: docRef.id
      });
      console.log('Provider added to Realtime Database');

      // Reset form and show success message
      setForm(initialState);
      setStep(0);
      setSubmitted(true);
      setLoading(false);

      // Optional: Show success message for 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Error adding provider:', error);
      setError('Failed to submit provider information. Please try again.');
      setLoading(false);
    }
  };

  // Get services for selected category
  const selectedCategory = servicesData.categories.find(cat => cat.id === form.category);
  const availableServices = selectedCategory ? selectedCategory.services : [];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Service Provider Registration</h2>
        {/* Progress Bar */}
        <div className="flex items-center mb-8">
          {steps.map((label, idx) => (
            <div key={label} className="flex-1 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step === idx ? 'bg-blue-600' : 'bg-blue-300'}`}>{idx + 1}</div>
              {idx < steps.length - 1 && <div className={`flex-1 h-1 ${step > idx ? 'bg-blue-600' : 'bg-blue-200'}`}></div>}
            </div>
          ))}
        </div>
        <div className="text-center font-semibold mb-6 text-blue-700">{steps[step]}</div>
        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {submitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Provider registration successful! We will review your application shortly.
          </div>
        )}
        <form onSubmit={step === steps.length - 1 ? handleSubmit : handleNext} className="space-y-4">
          {/* Step 1 */}
          {step === 0 && (
            <>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                >
                  <option value="">Select a category</option>
                  {servicesData.categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>
              {form.category && (
                <div>
                  <label className="block mb-1 font-medium">Services (Select all that apply)</label>
                  <select
                    name="services"
                    multiple
                    value={form.services}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none h-32"
                  >
                    {availableServices.map(service => (
                      <option key={service.name} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                  <div className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</div>
                </div>
              )}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Business Name</label>
                  <input name="businessName" value={form.businessName} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Physical Address</label>
                <input name="address" value={form.address} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Government ID / Tax ID</label>
                  <input name="govId" value={form.govId} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Business License</label>
                  <input name="license" value={form.license} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Social Media Link</label>
                  <input name="social" value={form.social} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="Facebook, Instagram, etc." />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Website</label>
                  <input name="website" value={form.website} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
            </>
          )}
          {/* Step 2 */}
          {step === 1 && (
            <>
              <div>
                <label className="block mb-1 font-medium">Experience (years)</label>
                <input name="experience" value={form.experience} onChange={handleChange} required className="w-full px-3 py-2 border rounded focus:outline-none" type="number" min="0" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Areas of Expertise</label>
                  <input name="references" value={form.references} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="e.g. AC, Carpentry, etc." />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Certifications/Licenses</label>
                  <input name="certifications" value={form.certifications} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="e.g. HVAC, Contractor's License" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Portfolio/Work Samples (file names only for demo)</label>
                <input name="portfolio" type="file" multiple onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                {form.portfolio && form.portfolio.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">{form.portfolio.join(', ')}</div>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Service Area</label>
                <input name="serviceArea" value={form.serviceArea} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="Cities, neighborhoods, or radius" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Availability</label>
                  <input name="availability" value={form.availability} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="e.g. 9am-6pm, weekends, emergencies" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Scheduling Preferences</label>
                  <input name="scheduling" value={form.scheduling} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="App, phone, calendar sync" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Rate Structure</label>
                  <input name="pricing" value={form.pricing} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="Hourly, flat fee, project-based" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Payment Methods</label>
                  <input name="payment" value={form.payment} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="Cash, credit, digital wallets" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Cancellation/Refund Policy</label>
                  <input name="cancellation" value={form.cancellation} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Discounts/Promotions</label>
                  <input name="discounts" value={form.discounts} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
            </>
          )}
          {/* Step 3 */}
          {step === 2 && (
            <>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Insurance Coverage</label>
                  <input name="insurance" value={form.insurance} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Contract/Terms of Service (file name only for demo)</label>
                  <input name="contract" type="file" onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                  {form.contract && <div className="text-xs text-gray-500 mt-1">{form.contract}</div>}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Profile Photo/Logo (file name only for demo)</label>
                  <input name="profilePhoto" type="file" onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                  {form.profilePhoto && <div className="text-xs text-gray-500 mt-1">{form.profilePhoto}</div>}
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Bio/Description</label>
                  <textarea name="bio" value={form.bio} onChange={handleChange} rows={2} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="Brief professional summary" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Service-Specific Keywords</label>
                <input name="keywords" value={form.keywords} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="e.g. AC, plumbing, cleaning" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Vendor Portal Access</label>
                  <input name="portalAccess" value={form.portalAccess} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Software/Tools Used</label>
                  <input name="tools" value={form.tools} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Equipment/Supplies</label>
                  <input name="equipment" value={form.equipment} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Background Check Consent</label>
                  <input name="backgroundCheck" value={form.backgroundCheck} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="Yes/No" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Emergency Contact</label>
                  <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Language Proficiency</label>
                  <input name="languages" value={form.languages} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" placeholder="e.g. English, Bangla" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Quality Assurance Agreement</label>
                  <input name="qualityAssurance" value={form.qualityAssurance} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Feedback Mechanism</label>
                  <input name="feedback" value={form.feedback} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Renewal Dates</label>
                  <input name="renewal" value={form.renewal} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Update Commitments</label>
                  <input name="updateCommitment" value={form.updateCommitment} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Tax Form (file name only for demo)</label>
                  <input name="taxForm" type="file" onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                  {form.taxForm && <div className="text-xs text-gray-500 mt-1">{form.taxForm}</div>}
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Data Privacy Compliance</label>
                  <input name="dataPrivacy" value={form.dataPrivacy} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Dispute Resolution Process</label>
                <input name="dispute" value={form.dispute} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" />
              </div>
            </>
          )}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button 
                type="button"
                onClick={handleBack} 
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-300 transition"
                disabled={loading}
              >
                Back
              </button>
            )}
            {step < steps.length - 1 && (
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition ml-auto"
                disabled={loading}
              >
                Next
              </button>
            )}
            {step === steps.length - 1 && (
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition ml-auto"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderForm; 