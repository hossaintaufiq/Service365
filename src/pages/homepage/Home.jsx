import React, { useState, useEffect, useRef } from 'react'
import Banner from '../../components/Banner'
import Categories from '../../components/Categories'
import WhyChooseUs from '../../components/WhyChooseUs'
import Testimonials from '../../components/Testimonials'
import servicesData from '../../data/services.json'

const categories = servicesData.categories.slice(0, 6) // Show first 6 as tabs

const heroImages = [
  '/Homepage-Image/Makeup.jpg',
  // '/Homepage-Image/tutor.jpeg',
  '/public/Homepage-Image/nursing.jpg',
  '/public/Homepage-Image/Plumbing-Contractors.png'
]

// Custom scrollbar-hide utility
const scrollbarHide = 'scrollbar-hide';

const SectionCards = ({ title, data, viewAll }) => (
  <section className="mb-10">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h3>
      {viewAll && <a href="#" className="text-pink-600 font-medium text-xs sm:text-sm hover:underline">View All</a>}
    </div>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
      {data.map((item, idx) => (
        <div key={item.name + idx} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center p-3 sm:p-4 min-h-[140px] sm:min-h-[180px] border border-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-28 object-cover rounded-lg mb-2 sm:mb-3" />
          <span className="text-center text-gray-800 font-medium text-xs sm:text-base mt-1">{item.name}</span>
        </div>
      ))}
    </div>
  </section>
)

const Home = () => {
  const [current, setCurrent] = useState(0)
  const desktopCatRef = useRef(null)
  const mobileCatRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Scroll functions
  const scrollCategories = (ref, dir) => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#eaf6fb] to-[#cbe7f7] min-h-screen">
      {/* Hero Banner with Image Slider */}
      <section
        className="relative h-[320px] md:h-[520px] flex items-center justify-center bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${heroImages[current]})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40 transition-all duration-700"></div>
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center text-white px-2 sm:px-0">
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4 drop-shadow break-words">Your Personal Assistant</h1>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg mb-4 sm:mb-6 drop-shadow break-words">One-stop solution for your services. Order any service, anytime.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-lg mx-auto">
            <select className="rounded-l-md px-4 py-2 text-gray-700 focus:outline-none min-w-[100px] sm:min-w-[120px] w-full md:w-auto text-xs sm:text-base">
              <option>Gulshan</option>
              <option>Banani</option>
              <option>Dhanmondi</option>
            </select>
            <input type="text" className="flex-1 px-4 py-2 rounded-r-md md:rounded-none md:rounded-r-md text-gray-700 focus:outline-none min-w-[120px] sm:min-w-[200px] w-full md:w-auto text-xs sm:text-base" placeholder="Find your service here e.g. AC, Car, Facial..." />
            <button className="bg-pink-600 text-white px-4 sm:px-6 py-2 rounded-md mt-2 md:mt-0 md:ml-2 font-semibold min-w-[80px] sm:min-w-[100px] w-full md:w-auto text-xs sm:text-base">Search</button>
          </div>
        </div>
        {/* Category Tabs Floating Overlap - Desktop */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl items-center" style={{ bottom: '-56px' }}>
          <button onClick={() => scrollCategories(desktopCatRef, -1)} className="w-10 h-10 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center mr-2 hover:bg-pink-100 transition-colors">
            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div ref={desktopCatRef} className={`flex items-center w-full bg-white rounded-2xl shadow-md px-4 py-6 gap-2 sm:gap-6 overflow-x-auto ${scrollbarHide}`} style={{ scrollBehavior: 'smooth' }}>
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center min-w-[120px] sm:min-w-[160px] mx-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-pink-50 mb-2 border-2 border-pink-100">
                  <img src={cat.image} alt={cat.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-gray-800 text-center whitespace-nowrap truncate max-w-[100px] sm:max-w-[140px]">{cat.title}</span>
              </div>
            ))}
          </div>
          <button onClick={() => scrollCategories(desktopCatRef, 1)} className="w-10 h-10 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center ml-2 hover:bg-pink-100 transition-colors">
            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Mobile: static below hero */}
      </section>
      {/* Mobile Category Tabs */}
      <div className="block md:hidden w-full px-2 mt-4">
        <div className="flex items-center w-full bg-white rounded-2xl shadow-md px-2 py-4 gap-2 overflow-x-auto scrollbar-hide" ref={mobileCatRef} style={{ scrollBehavior: 'smooth' }}>
          <button onClick={() => scrollCategories(mobileCatRef, -1)} className="w-8 h-8 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center mr-1 hover:bg-pink-100 transition-colors">
            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center min-w-[90px] mx-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 mb-1 border-2 border-pink-100">
                <img src={cat.image} alt={cat.title} className="w-6 h-6 object-contain" />
              </div>
              <span className="text-xs font-semibold text-gray-800 text-center whitespace-nowrap truncate max-w-[60px]">{cat.title}</span>
            </div>
          ))}
          <button onClick={() => scrollCategories(mobileCatRef, 1)} className="w-8 h-8 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center ml-1 hover:bg-pink-100 transition-colors">
            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* EMI/Promo Banner */}
      <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-200 via-orange-100 to-yellow-100 text-orange-900 py-3 px-4 rounded-2xl shadow-md max-w-xl mx-auto my-8 mt-20">
        <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="10" rx="2" fill="#FDBA74" />
          <rect x="6" y="11" width="4" height="2" rx="1" fill="#F59E42" />
          <rect x="12" y="11" width="6" height="2" rx="1" fill="#F59E42" />
        </svg>
        <span className="font-semibold text-base sm:text-lg">
          <span className="font-bold">EMI Available</span> &mdash; Buy now, pay later in installments
        </span>
      </div>

      {/* For Your Home */}
      <div className="max-w-7xl mx-auto px-4">
        <SectionCards title="For Your Home" data={servicesData.forYourHome} viewAll />
        <SectionCards title="Recommended" data={servicesData.recommended} viewAll />
        <SectionCards title="Trending" data={servicesData.trending} viewAll />
      </div>

      {/* Why Choose Us */}
      <section className="bg-white py-12 mt-12 rounded-xl shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Because we care about your safety..</h3>
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">😷</span>
              <span className="font-medium text-gray-700">Ensuring Masks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">⏰</span>
              <span className="font-medium text-gray-700">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">🧴</span>
              <span className="font-medium text-gray-700">Sanitizing Hands & Equipment</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">🧤</span>
              <span className="font-medium text-gray-700">Ensuring Gloves</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <img src="https://images.unsplash.com/photo-1588776814546-ec7e5b1c7b7b?auto=format&fit=crop&w=400&q=80" alt="Safety" className="w-40 h-32 object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1581093588401-22b8d33c1e66?auto=format&fit=crop&w=400&q=80" alt="Safety" className="w-40 h-32 object-cover rounded-lg" />
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="Safety" className="w-40 h-32 object-cover rounded-lg" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">15,000 +</div>
            <div className="text-gray-700">Service Providers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">2,00,000 +</div>
            <div className="text-gray-700">Order Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">1,00,000 +</div>
            <div className="text-gray-700">5 Star Received</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-white rounded-xl shadow-md mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Easiest way to get a service</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <button className="bg-pink-100 text-pink-600 rounded-full w-20 h-20 flex items-center justify-center text-3xl mb-4 md:mb-0">
              <span>&#9658;</span>
            </button>
            <ol className="flex-1 space-y-4">
              <li><span className="font-bold text-pink-600 mr-2">1</span>Select the Service</li>
              <li><span className="font-bold text-pink-600 mr-2">2</span>Pick your schedule</li>
              <li><span className="font-bold text-pink-600 mr-2">3</span>Place Your Order & Relax</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white rounded-xl shadow-md mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Real Happy Customers, Real Stories</h3>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
              <p className="italic text-gray-700 mb-4">"Such service platforms are available in other countries. I've personally used these when I was abroad. I'm very pleased that such a portal is available here in Bangladesh as well. Thank you Sheba.xyz."</p>
              <div className="font-bold text-pink-600">Zabeen Yusuf Nur</div>
              <div className="text-gray-500 text-sm">IT Consultant, Australia</div>
            </div>
            <div className="flex-1 flex justify-center">
              <button className="bg-pink-100 text-pink-600 rounded-full w-20 h-20 flex items-center justify-center text-3xl">
                <span>&#9658;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* App Download & Contact */}
      <section className="py-12 bg-white rounded-xl shadow-md mt-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Any Service, Any Time, Anywhere.</h3>
          <p className="mb-6 text-gray-600">Give us your mobile number. You'll get an SMS with the app download link.</p>
          <div className="flex flex-col xs:flex-row gap-2 justify-center mb-6">
            <input type="text" placeholder="Type your mobile number" className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none" />
            <button className="bg-pink-600 text-white px-6 py-2 rounded-md font-semibold">Get the app</button>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
          </div>
        </div>
      </section>

      {/* Request a Service */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-4 text-gray-700">Can't find your desired service? Let us know 24/7 in 16516.</p>
          <button className="bg-pink-600 text-white px-6 py-2 rounded-md font-semibold mr-2">Request a service</button>
          <span className="text-pink-600 font-bold">16516</span>
        </div>
      </section>
    </div>
  )
}

export default Home 