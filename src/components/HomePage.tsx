import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Tractor, MapPin, Users, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sprout className="w-8 h-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-green-800">FarmRental</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/equipment" className="text-gray-600 hover:text-green-700 font-medium">Equipment</Link>
              <a href="#features" className="text-gray-600 hover:text-green-700 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-700 font-medium">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-700 font-medium">Testimonials</a>
            </div>
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-green-700 hover:text-green-900 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
                Your One-Stop Platform for Agricultural Land & Equipment
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Connect with farmers, expand your operations, and grow your business with our comprehensive rental platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
                alt="Farm landscape"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Our Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FarmRental provides everything you need to manage agricultural land and equipment rentals efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Land Rental</h3>
              <p className="text-gray-600 mb-4">
                Find and rent agricultural land that matches your farming needs. Browse through verified listings and connect with landowners.
              </p>
              <Link
                to="/register"
                className="text-green-700 font-medium flex items-center hover:text-green-900"
              >
                Explore Land
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Tractor className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Equipment Rental</h3>
              <p className="text-gray-600 mb-4">
                Access a wide range of farming equipment. From tractors to harvesters, find what you need to optimize your farming operations.
              </p>
              <Link
                to="/register"
                className="text-green-700 font-medium flex items-center hover:text-green-900"
              >
                Browse Equipment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="bg-green-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with other farmers, share experiences, and build a network within the agricultural community.
              </p>
              <Link
                to="/register"
                className="text-green-700 font-medium flex items-center hover:text-green-900"
              >
                Join Community
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with FarmRental is simple. Follow these steps to begin renting land or equipment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">1</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Create Account</h3>
              <p className="text-gray-600">
                Sign up for a free account to access all features of the platform.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Browse Listings</h3>
              <p className="text-gray-600">
                Search for available land or equipment that meets your requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Connect</h3>
              <p className="text-gray-600">
                Contact landowners or equipment owners to discuss rental terms.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">4</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Rent & Grow</h3>
              <p className="text-gray-600">
                Complete the rental process and start growing your agricultural business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from farmers who have successfully used our platform to grow their operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-bold">RS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Rajinder Singh</h4>
                  <p className="text-gray-600">Wheat & Rice Farmer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "FarmRental helped me find the perfect piece of land for expanding my wheat farm. The process was smooth and the landowner was professional."
              </p>
              <div className="flex text-yellow-400">
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-bold">HK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Harpreet Kaur</h4>
                  <p className="text-gray-600">Equipment Owner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I've been able to rent out my unused equipment and generate additional income. The platform makes it easy to connect with farmers in need."
              </p>
              <div className="flex text-yellow-400">
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-bold">SP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Suresh Patil</h4>
                  <p className="text-gray-600">Landowner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a landowner, I've found reliable tenants through FarmRental. The platform's verification process gives me confidence in the renters."
              </p>
              <div className="flex text-yellow-400">
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of farmers and landowners who are already using FarmRental to grow their agricultural businesses.
          </p>
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center font-medium text-lg"
          >
            Create Your Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Sprout className="w-8 h-8 text-green-400 mr-2" />
                <h3 className="text-xl font-bold">FarmRental</h3>
              </div>
              <p className="text-green-200 mb-4">
                Your one-stop platform for agricultural land and equipment rentals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-green-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-green-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-green-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-white">Home</a></li>
                <li><a href="#features" className="text-green-200 hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="text-green-200 hover:text-white">How It Works</a></li>
                <li><a href="#testimonials" className="text-green-200 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-200 hover:text-white">Land Rental</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Equipment Rental</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Community</a></li>
                <li><a href="#" className="text-green-200 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-green-400 mr-2 mt-1" />
                  <span className="text-green-200">123 Farm Road, Agriculture City, AC 12345</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-green-200">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-green-200">info@farmrental.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-300">
            <p>&copy; {new Date().getFullYear()} FarmRental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 