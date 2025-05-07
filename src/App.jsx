import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/homepage/Home'
import Category from './pages/services/Category'
import ServiceGigList from './pages/services/ServiceGigList'
import ServiceGigDetail from './pages/services/ServiceGigDetail'
import ServiceList from './pages/services/ServiceList'
import Login from './pages/auth/Login'
import Footer from './components/Footer'
import ProviderForm from './pages/providerpages/ProviderForm'
import ProviderGig from './pages/providerpages/ProviderGig'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  // This is a placeholder for authentication logic
  const isAuthenticated = false; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:categoryId" element={<ServiceGigList />} />
            <Route path="/category/:categoryId/:serviceName" element={<ServiceGigList />} />
            <Route path="/gig/:providerId" element={<ServiceGigDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/providerform" element={<ProviderForm />} />
            <Route path="/providergig" element={<ProviderGig />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div>Dashboard Page (Protected)</div>
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
