import React, { useState, useEffect } from 'react';
import { db, realtimeDb } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';

const ServiceGigList = () => {
  const [services, setServices] = useState([]);
  const [realtimeServices, setRealtimeServices] = useState([]);

  useEffect(() => {
    // Fetch from Firestore
    const fetchFirestoreServices = async () => {
      const querySnapshot = await getDocs(collection(db, 'providers'));
      const serviceList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(serviceList);
    };

    // Fetch from Realtime Database
    const providersRef = ref(realtimeDb, 'providers');
    const unsubscribe = onValue(providersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const serviceList = Object.values(data);
        setRealtimeServices(serviceList);
      }
    });

    fetchFirestoreServices();

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Combine both data sources
  const allServices = [...services, ...realtimeServices];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Service List</h2>
      <ul className="space-y-4">
        {allServices.map((service) => (
          <li key={service.id} className="border p-4 rounded">
            <h3 className="font-bold">{service.name}</h3>
            <p>Business: {service.businessName}</p>
            <p>Services: {service.services?.join(', ')}</p>
            <p>Location: {service.address}</p>
            <p>Contact: {service.phone}</p>
            <p>Email: {service.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceGigList; 