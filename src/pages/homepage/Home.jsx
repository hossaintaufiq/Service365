import React from 'react'
import Banner from '../../components/Banner'
import Categories from '../../components/Categories'
import WhyChooseUs from '../../components/WhyChooseUs'
import Testimonials from '../../components/Testimonials'
import servicesData from '../../data/services.json'

const categories = servicesData.categories.slice(0, 6) // Show first 6 as tabs

const SectionCards = ({ title, data, viewAll }) => (
  <section className="mb-10">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {viewAll && <a href="#" className="text-pink-600 font-medium text-sm hover:underline">View All</a>}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {data.map((item, idx) => (
        <div key={item.name + idx} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center p-4 min-h-[180px] border border-gray-100">
          <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mb-3 border border-gray-200" />
          <span className="text-center text-gray-800 font-medium text-base mt-1">{item.name}</span>
        </div>
      ))}
    </div>
  </section>
)

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Banner */}
      <section className="relative h-[420px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow">Your Personal Assistant</h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow">One-stop solution for your services. Order any service, anytime.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <select className="rounded-l-md px-4 py-2 text-gray-700 focus:outline-none min-w-[120px]">
              <option>Gulshan</option>
              <option>Banani</option>
              <option>Dhanmondi</option>
            </select>
            <input type="text" className="flex-1 px-4 py-2 rounded-r-md md:rounded-none md:rounded-r-md text-gray-700 focus:outline-none min-w-[200px]" placeholder="Find your service here e.g. AC, Car, Facial..." />
            <button className="bg-pink-600 text-white px-6 py-2 rounded-md mt-2 md:mt-0 md:ml-2 font-semibold min-w-[100px]">Search</button>
          </div>
          {/* Category Tabs */}
          <div className="mt-8 flex justify-center gap-6 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col items-center min-w-[100px]">
                <img src={cat.image} alt={cat.title} className="w-14 h-14 object-cover rounded-full border-2 border-pink-500 mb-1 bg-white" />
                <span className="text-sm text-white font-medium whitespace-nowrap drop-shadow">{cat.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI/Promo Banner */}
      <div className="bg-orange-100 text-orange-800 text-center py-4 font-semibold text-lg mb-8 rounded-b-xl shadow-sm">
        EMI Available &mdash; Buy now, pay later in installments
      </div>

      {/* For Your Home */}
      <div className="max-w-7xl mx-auto px-4">
        <SectionCards title="For Your Home" data={servicesData.forYourHome} viewAll />
        <SectionCards title="Recommended" data={servicesData.recommended} viewAll />
        <SectionCards title="Trending" data={servicesData.trending} viewAll />
      </div>

      {/* Why Choose Us */}
      <section className="bg-green-50 py-12 mt-12 rounded-xl">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Because we care about your safety..</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
      <section className="py-12 bg-gray-50">
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
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Real Happy Customers, Real Stories</h3>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow">
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Any Service, Any Time, Anywhere.</h3>
          <p className="mb-6 text-gray-600">Give us your mobile number. You'll get an SMS with the app download link.</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center mb-6">
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