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

const franchiseImages = [
  '/Homepage-Image/Makeup.jpg',
  '/Homepage-Image/nursing.jpg',
  '/Homepage-Image/Plumbing-Contractors.png',
];

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
  const [franchiseCurrent, setFranchiseCurrent] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Typewriter effect for hero headline
  const typewriterText = "Bangladesh's #1 Home Services & Job Platform";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    let timeout;
    function type() {
      setTyped(typewriterText.slice(0, i));
      if (i < typewriterText.length) {
        i++;
        timeout = setTimeout(type, 220);
      } else {
        timeout = setTimeout(() => {
          setTyped("");
          i = 0;
          setTimeout(type, 4500);
        }, 4500);
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

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
      <section className="relative w-full min-h-[420px] md:min-h-[520px] flex flex-col justify-center items-center bg-gradient-to-br from-[#0a3a5c] to-[#16507a] text-white overflow-hidden pb-24">
        {/* Headline */}
        <div className="flex flex-col items-center justify-center text-center z-10 mt-8">
          <span className="uppercase tracking-widest text-xs md:text-sm font-bold text-[#16507a] bg-white/90 px-4 py-1 rounded mb-4 shadow-sm">Let Your Home Shine</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-center text-white mb-2 leading-tight font-sans min-h-[2.5em]">
            {typed}
            <span className="inline-block w-2 h-6 align-middle bg-white ml-1" style={{borderRadius:'2px', opacity: 0.8, animation: 'none'}}></span>
          </h1>
          <p className="text-base md:text-lg text-center mb-6 z-10 font-normal text-white/90 max-w-2xl mx-auto leading-relaxed animate-fadeinup">
          Discover affordable home services from <span className='font-semibold text-white'>verified professionals</span>, or find your next <span className='font-semibold text-white'>job opportunity</span>! Book cleaning, repairs, beauty, and more—connect with top experts or start your career today. <span className='font-semibold text-white'>Fast, reliable, and available anywhere in Bangladesh.</span>
        </p>
          <div className="mt-8" />
        </div>
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-16 z-10 justify-center">
          <a href="/services" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold shadow transition">Book Services</a>
          <a href="/signup" className="bg-blue-100 hover:bg-blue-200 text-[#233a7a] px-6 py-3 rounded-full font-semibold shadow transition">Register Your Business</a>
        </div>
        {/* Curved white section at the bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M0,80 C480,160 960,0 1440,80 L1440,120 L0,120 Z"/></svg>
      </section>

      {/* Step Section - Horizontal Row Layout */}
      <section className="bg-white w-full py-20 px-4 border-none border-t-0" style={{borderTop: 'none'}}>
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">We're With You Every Step of The Way</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'PrePlanning', icon: '📝', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.' },
            { title: 'Arrangements', icon: '✅', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.' },
            { title: 'Burial & Cremation', icon: '⚰️', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.' },
            { title: 'Funeral Services', icon: '🕊️', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.' },
            { title: 'Grief Support', icon: '💖', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.' },
          ].map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-50 shadow-inner mb-4">
                <span className="text-3xl text-gray-400">{step.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-500 mb-4 text-sm">{step.desc}</p>
              <button className="bg-gray-100 hover:bg-gray-200 text-[#233a7a] px-5 py-2 rounded-full font-semibold text-sm transition shadow-sm">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* For Your Home Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">For Your Home</h2>
            <a href="/services" className="text-pink-600 font-semibold flex items-center gap-1 hover:underline text-base md:text-lg">View All <span>&#8250;</span></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {servicesData.forYourHome.map((item, idx) => (
              <div key={item.name + idx} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center p-3 border border-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                <span className="text-center text-gray-900 font-bold text-base mb-1">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending</h2>
            <a href="/services" className="text-pink-600 font-semibold flex items-center gap-1 hover:underline text-base md:text-lg">View All <span>&#8250;</span></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {servicesData.recommended.map((item, idx) => (
              <div key={item.name + idx} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center p-3 border border-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                <span className="text-center text-gray-900 font-bold text-base mb-1">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#233a7a]">How Fantastic Services works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-4">💰</span>
              <div className="text-2xl font-extrabold text-gray-300 mb-2">1.<span className="text-gray-700 font-bold ml-2">Show you reasonable price</span></div>
              <p className="text-gray-600">Just specify a few details, pick the date and time, and we'll show you the best price for your needs.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-4">📍</span>
              <div className="text-2xl font-extrabold text-gray-300 mb-2">2.<span className="text-gray-700 font-bold ml-2">Search your local area</span></div>
              <p className="text-gray-600">Find available services and professionals in your local area quickly and easily.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-4">🤝</span>
              <div className="text-2xl font-extrabold text-gray-300 mb-2">3.<span className="text-gray-700 font-bold ml-2">Contact with the verified providers</span></div>
              <p className="text-gray-600">Connect and communicate directly with verified, trusted service providers.</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-4">🚀</span>
              <div className="text-2xl font-extrabold text-gray-300 mb-2">4.<span className="text-gray-700 font-bold ml-2">Setup and market your business</span></div>
              <p className="text-gray-600">Get help setting up and marketing your business for maximum reach and success.</p>
            </div>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-md text-lg shadow transition">Book a service</button>
        </div>
      </section>

      {/* Franchise Business Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
          {/* Left: Text and CTA */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#233a7a]">Start your own franchise business<br />with Fantastic Services</h2>
            <p className="text-gray-600 mb-6 max-w-xl">Develop your own successful business by investing in a proven franchise model that takes all risks out and provides full support. A business of your own but not on your own.</p>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-md text-lg shadow transition">Become your own boss</button>
          </div>
          {/* Right: Image Slider with border effect */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
              <img
                src={franchiseImages[franchiseCurrent]}
                alt="Franchise Slide"
                className="rounded-lg shadow-lg object-cover w-full h-72 md:h-80"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
              />
              {/* Left Arrow */}
              <button
                onClick={() => setFranchiseCurrent((franchiseCurrent - 1 + franchiseImages.length) % franchiseImages.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-[#233a7a] rounded-full p-2 shadow transition"
                aria-label="Previous"
                style={{ zIndex: 2 }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              {/* Right Arrow */}
              <button
                onClick={() => setFranchiseCurrent((franchiseCurrent + 1) % franchiseImages.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-[#233a7a] rounded-full p-2 shadow transition"
                aria-label="Next"
                style={{ zIndex: 2 }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 gap-2">
              {franchiseImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setFranchiseCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${franchiseCurrent === idx ? 'bg-pink-600' : 'bg-gray-300'} transition`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#233a7a]">What clients are saying...</h2>
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-700">Excellent</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Trustpilot_Logo_2018.svg" alt="Trustpilot" className="h-6" />
              <span className="bg-[#00b67a] text-white font-bold px-2 rounded ml-1">★★★★★</span>
              <span className="text-gray-600 ml-2">over 40,000 reviews on</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Trustpilot_Logo_2018.svg" alt="Trustpilot" className="h-5 ml-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Testimonial 1 */}
            <div className="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Andrew Thorburn" className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow" />
              <h3 className="font-bold text-lg mb-2 text-gray-900">Amazing service, <br />above and beyond</h3>
              <p className="text-gray-600 mb-4">I used them for an end of tenancy clean, and they did a fantastic job. It turned out to be bigger than expected, but they remained professional, and bent over backwards to make sure I got what I wante ...</p>
              <a href="#" className="text-[#009fe3] font-bold mb-2">Read more</a>
              <div className="font-bold text-gray-800 mt-2">Andrew Thorburn</div>
              <div className="flex justify-center mt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/Trustpilot_ratings_5star.png" alt="5 stars" className="h-6" />
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jasmine Pengelly" className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow" />
              <h3 className="font-bold text-lg mb-2 text-gray-900">Far exceeded my<br />expectations</h3>
              <p className="text-gray-600 mb-4">Far exceeded my expectations - my gardeners were professional, friendly and found time to do my front garden as well as my back! I could not be more impressed with how they handled the job. I will cer ...</p>
              <a href="#" className="text-[#009fe3] font-bold mb-2">Read more</a>
              <div className="font-bold text-gray-800 mt-2">Jasmine Pengelly</div>
              <div className="flex justify-center mt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/Trustpilot_ratings_5star.png" alt="5 stars" className="h-6" />
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="flex flex-col items-center text-center">
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Diana Farragher" className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow" />
              <h3 className="font-bold text-lg mb-2 text-gray-900">Service with a smile</h3>
              <p className="text-gray-600 mb-4">Punctuality Phone call On arrival Cheerful welcome Very helpful and they did a very thorough job My carpets are cleaner than I thought possible so job exceeded expectations Thank You</p>
              <a href="#" className="text-[#009fe3] font-bold mb-2">Read more</a>
              <div className="font-bold text-gray-800 mt-2">Diana Farragher</div>
              <div className="flex justify-center mt-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/Trustpilot_ratings_5star.png" alt="5 stars" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Locations Section (Bangladesh) */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
          {/* Left: Text and Cities */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#233a7a]">Always at your service, right where you are</h2>
            <p className="text-gray-600 mb-6 max-w-xl">We won't let your cleaning and maintenance problems get to you. Besides providing quality home services in Bangladesh, our skilled pros can also tidy up your garden or clean your home or office anywhere in the country. Here are some of the main locations we serve:</p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[#1565c0] font-medium text-lg">
              <span>Dhaka</span>
              <span>Chittagong</span>
              <span>Khulna</span>
              <span>Rajshahi</span>
              <span>Sylhet</span>
              <span>Barisal</span>
              <span>Rangpur</span>
              <span>Mymensingh</span>
            </div>
          </div>
          {/* Right: Google Map */}
          <div className="flex-1 w-full h-80 md:h-96 rounded-xl shadow-lg overflow-hidden">
            <iframe
              title="Bangladesh Service Area"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689401.073964019!2d88.011876!3d23.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37543f2916e1e7b1%3A0x4b6c1b1b1b1b1b1b!2sBangladesh!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 