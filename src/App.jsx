import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/homepage/Home'
import Category from './pages/services/Category'
import ServiceGigList from './pages/services/ServiceGigList'
import ServiceGigDetail from './pages/services/ServiceGigDetail'
import ServiceList from './pages/services/ServiceList'
import ServiceDetail from './pages/services/ServiceDetail'
import Login from './pages/auth/Login'
import Footer from './components/Footer'
import ProviderForm from './pages/providerpages/ProviderForm'
import ProviderGig from './pages/providerpages/ProviderGig'
import Signup from './pages/auth/Signup'
import Profile from './pages/Profile'
import ProviderProfile from './pages/ProviderProfile'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

// Role-based route component
const RoleBasedRoute = ({ children }) => {
  const { currentUser, userData } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If user is a provider, show provider profile
  if (userData?.role === 'provider') {
    return <ProviderProfile />;
  }

  // If user is a regular user, show user profile
  return <Profile />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServiceList />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/:categoryId" element={<ServiceGigList />} />
              <Route path="/category/:categoryId/:serviceName" element={<ServiceGigList />} />
              <Route path="/gig/:providerId" element={<ServiceGigDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/providerform" element={<ProviderForm />} />
              <Route path="/providergig" element={<ProviderGig />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <RoleBasedRoute />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
