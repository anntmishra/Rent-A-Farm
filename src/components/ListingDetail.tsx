import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, Calendar, ChevronLeft, Heart, Share2, MessageCircle, Star, Clock, User } from 'lucide-react';

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'land' | 'equipment';
  images: string[];
  owner: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
  features?: string[];
  availability?: {
    startDate: string;
    endDate: string;
  };
  reviews?: {
    _id: string;
    user: {
      _id: string;
      name: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchListingDetails();
  }, [id]);

  const fetchListingDetails = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate with mock data
      const mockListing: Listing = {
        _id: id || '1',
        title: 'Fertile Farmland in Rural Area',
        description: 'Beautiful 10-acre farmland with rich soil perfect for growing various crops. The land has been well-maintained and includes irrigation systems. Located in a peaceful rural area with easy access to main roads.',
        price: 150,
        location: 'Rural County, State',
        type: 'land',
        images: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        ],
        owner: {
          _id: 'owner1',
          name: 'Vikram Patel',
          email: 'vikram@example.com',
          phone: '(555) 123-4567'
        },
        createdAt: new Date().toISOString(),
        features: [
          '10 acres of fertile land',
          'Irrigation system',
          'Storage shed',
          'Easy access to main roads',
          'Electricity available'
        ],
        availability: {
          startDate: '2023-05-01',
          endDate: '2023-10-31'
        },
        reviews: [
          {
            _id: 'review1',
            user: {
              _id: 'user1',
              name: 'Priya Sharma'
            },
            rating: 5,
            comment: 'Great land with excellent soil quality. The owner was very helpful and professional.',
            createdAt: '2023-04-15T10:30:00Z'
          },
          {
            _id: 'review2',
            user: {
              _id: 'user2',
              name: 'Rahul Verma'
            },
            rating: 4,
            comment: 'Good location and well-maintained. Would rent again.',
            createdAt: '2023-03-20T14:45:00Z'
          }
        ]
      };
      
      setListing(mockListing);
    } catch (error) {
      console.error('Error fetching listing details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send a message to the owner
    console.log('Message sent:', message);
    setShowContactForm(false);
    setMessage('');
    alert('Message sent successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-4">The listing you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full ${
                  isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                } hover:bg-gray-100`}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={listing.images[activeImageIndex]}
                  alt={listing.title}
                  className="object-cover w-full h-96"
                />
              </div>
              {listing.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                        activeImageIndex === index ? 'ring-2 ring-green-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Listing Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  listing.type === 'land' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {listing.type === 'land' ? 'Land' : 'Equipment'}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{listing.location}</span>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{listing.description}</p>
              </div>
              
              {listing.features && listing.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {listing.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {listing.availability && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability</h3>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-1" />
                    <span>
                      {new Date(listing.availability.startDate).toLocaleDateString()} - {new Date(listing.availability.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Reviews */}
              {listing.reviews && listing.reviews.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Reviews</h3>
                  <div className="space-y-4">
                    {listing.reviews.map((review) => (
                      <div key={review._id} className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2">
                              {review.user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-900">{review.user.name}</span>
                          </div>
                          <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-green-600 font-semibold text-xl">
                  <span>₹{listing.price}</span>
                </div>
                <span className="text-gray-500 text-sm">per day</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Owner</h3>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium mr-3">
                    {listing.owner.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{listing.owner.name}</div>
                    <div className="text-sm text-gray-500">Member since 2022</div>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700 mb-2">
                  <User className="h-5 w-5 mr-2" />
                  <span>{listing.owner.email}</span>
                </div>
                
                {listing.owner.phone && (
                  <div className="flex items-center text-gray-700">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span>{listing.owner.phone}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Owner
                </button>
                
                <button
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Check Availability
                </button>
              </div>
              
              {showContactForm && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Send Message</h3>
                  <form onSubmit={handleContactSubmit}>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      required
                    ></textarea>
                    <div className="mt-3 flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Send
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetail; 