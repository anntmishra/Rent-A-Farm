import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Search, Filter, MapPin, Calendar, ChevronRight, User, LogOut, Settings, Bell, Heart } from 'lucide-react';

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
  };
  createdAt: string;
}

const equipmentImages = {
  tractor: [
    'https://images.unsplash.com/photo-1605488686070-b8f4642c3f82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',  // Red modern tractor
    'https://images.unsplash.com/photo-1530267981375-f08d153d5d36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',  // Blue tractor in field
    'https://images.unsplash.com/photo-1592543196050-95756fc0e9c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',  // Green tractor at work
    'https://images.unsplash.com/photo-1599034289392-9e1e6d2f6dec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',  // Yellow tractor
    'https://images.unsplash.com/photo-1568668392383-c422136cbf3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'   // Modern farming tractor
  ],
  harvester: [
    'https://images.unsplash.com/photo-1591086559154-a5f0f2298690?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1591086559154-a5f0f2298691?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ],
  irrigation: [
    'https://images.unsplash.com/photo-1560693225-b8507d6f3aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1560693225-b8507d6f3aa8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ],
  powerTiller: [
    'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1605000797499-95a51c5269af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ]
};

const landImages = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1439728375832-e7c4628e6979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1570882194983-935331f6df3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'land' | 'equipment'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'date'>('date');
  const [activeTab, setActiveTab] = useState<'browse' | 'my-listings' | 'favorites'>('browse');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      // Check if user is demo account
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      
      if (user && user.email === 'demo@example.com') {
        // Mock listings for demo account
        const mockListings: Listing[] = [
          {
            _id: 'demo1',
            title: 'Mahindra 575 DI XP Plus Tractor',
            description: 'Powerful 45 HP tractor with power steering, perfect for medium to large farms. Well-maintained with regular service history.',
            price: 1200,
            location: 'Ludhiana, Punjab',
            type: 'equipment',
            images: [equipmentImages.tractor[0], equipmentImages.tractor[1]],
            owner: {
              _id: 'demo-user-id',
              name: 'Rajinder Singh'
            },
            createdAt: '2024-03-15T10:30:00Z'
          },
          {
            _id: 'demo2',
            title: '10 Acre Fertile Land in Punjab',
            description: 'Prime agricultural land with alluvial soil perfect for wheat, rice, and cotton cultivation. Access to canal irrigation and close to main highway.',
            price: 5000,
            location: 'Amritsar, Punjab',
            type: 'land',
            images: [landImages[0], landImages[1]],
            owner: {
              _id: 'demo-user-id',
              name: 'Harpreet Kaur'
            },
            createdAt: '2024-03-10T14:45:00Z'
          },
          {
            _id: 'demo3',
            title: 'John Deere 5050E Tractor',
            description: '50 HP tractor with advanced technology features. Ideal for precision farming and heavy-duty operations.',
            price: 1500,
            location: 'Jalandhar, Punjab',
            type: 'equipment',
            images: [equipmentImages.tractor[2], equipmentImages.tractor[3]],
            owner: {
              _id: 'demo-user-id',
              name: 'Gurpreet Singh'
            },
            createdAt: '2024-03-05T09:15:00Z'
          },
          {
            _id: 'demo4',
            title: '5 Acre Coastal Land in Kerala',
            description: 'Beautiful coastal land suitable for coconut, banana and spice cultivation. Rich in laterite soil with good drainage.',
            price: 7500,
            location: 'Kochi, Kerala',
            type: 'land',
            images: [landImages[2], landImages[3]],
            owner: {
              _id: 'demo-user-id',
              name: 'Arun Nair'
            },
            createdAt: '2024-03-01T11:20:00Z'
          },
          {
            _id: 'demo5',
            title: 'Mahindra Novo 755 DI Tractor',
            description: '75 HP tractor with advanced features for large-scale farming. Excellent condition with full service history.',
            price: 1800,
            location: 'Ahmedabad, Gujarat',
            type: 'equipment',
            images: [equipmentImages.tractor[3], equipmentImages.tractor[4]],
            owner: {
              _id: 'demo-user-id',
              name: 'Nitin Patel'
            },
            createdAt: '2024-02-28T16:40:00Z'
          },
          {
            _id: 'demo6',
            title: '15 Acre Black Soil Land in Maharashtra',
            description: 'Large agricultural plot with rich black cotton soil ideal for cotton and soybean cultivation. Borewell water available year-round.',
            price: 4500,
            location: 'Nagpur, Maharashtra',
            type: 'land',
            images: [landImages[1], landImages[0]],
            owner: {
              _id: 'demo-user-id',
              name: 'Suresh Patil'
            },
            createdAt: '2024-02-25T13:15:00Z'
          },
          {
            _id: 'demo7',
            title: 'VST Shakti Power Tiller',
            description: 'Efficient 8.5 HP power tiller for small to medium farms. Easy to operate and maintain.',
            price: 500,
            location: 'Coimbatore, Tamil Nadu',
            type: 'equipment',
            images: equipmentImages.powerTiller,
            owner: {
              _id: 'demo-user-id',
              name: 'Senthil Kumar'
            },
            createdAt: '2024-02-20T10:30:00Z'
          },
          {
            _id: 'demo8',
            title: '7 Acre Red Soil Land in Karnataka',
            description: 'Well-maintained agricultural land suitable for millet, groundnut and pulses. Equipped with drip irrigation system.',
            price: 6000,
            location: 'Mysuru, Karnataka',
            type: 'land',
            images: [landImages[3], landImages[2]],
            owner: {
              _id: 'demo-user-id',
              name: 'Ramesh Gowda'
            },
            createdAt: '2024-02-15T09:45:00Z'
          },
          {
            _id: 'demo9',
            title: 'Sonalika DI 35 RX Tractor',
            description: '35 HP tractor perfect for small to medium farms. Fuel-efficient and easy to operate.',
            price: 900,
            location: 'Lucknow, Uttar Pradesh',
            type: 'equipment',
            images: [equipmentImages.tractor[1], equipmentImages.tractor[2]],
            owner: {
              _id: 'demo-user-id',
              name: 'Rakesh Yadav'
            },
            createdAt: '2024-02-10T14:20:00Z'
          },
          {
            _id: 'demo10',
            title: '20 Acre Agricultural Land in UP',
            description: 'Large fertile farmland in the Gangetic plain perfect for sugarcane and rice farming. Excellent canal irrigation facility.',
            price: 4000,
            location: 'Meerut, Uttar Pradesh',
            type: 'land',
            images: [landImages[0], landImages[3]],
            owner: {
              _id: 'demo-user-id',
              name: 'Amit Sharma'
            },
            createdAt: '2024-02-05T11:30:00Z'
          },
          {
            _id: 'demo11',
            title: 'Mahindra Harvester',
            description: 'High-capacity harvester for wheat, rice, and other grains. Excellent condition with low hours.',
            price: 2500,
            location: 'Amritsar, Punjab',
            type: 'equipment',
            images: equipmentImages.harvester,
            owner: {
              _id: 'demo-user-id',
              name: 'Gurpreet Singh'
            },
            createdAt: '2024-02-01T09:15:00Z'
          },
          {
            _id: 'demo12',
            title: 'John Deere S680 Combine Harvester',
            description: 'Advanced combine harvester with precision technology. Ideal for large-scale grain harvesting.',
            price: 3000,
            location: 'Indore, Madhya Pradesh',
            type: 'equipment',
            images: equipmentImages.harvester,
            owner: {
              _id: 'demo-user-id',
              name: 'Dinesh Patidar'
            },
            createdAt: '2024-01-28T16:40:00Z'
          },
          {
            _id: 'demo13',
            title: 'Mahindra Plow',
            description: 'Heavy-duty plow for primary tillage. Compatible with most tractors.',
            price: 400,
            location: 'Varanasi, Uttar Pradesh',
            type: 'equipment',
            images: equipmentImages.powerTiller,
            owner: {
              _id: 'demo-user-id',
              name: 'Sanjay Mishra'
            },
            createdAt: '2024-01-25T11:20:00Z'
          },
          {
            _id: 'demo14',
            title: 'Sonalika Seeder',
            description: 'Precision seeder for row crops. Ensures uniform seed placement and spacing.',
            price: 350,
            location: 'Patna, Bihar',
            type: 'equipment',
            images: equipmentImages.powerTiller,
            owner: {
              _id: 'demo-user-id',
              name: 'Rajiv Kumar'
            },
            createdAt: '2024-01-20T09:15:00Z'
          },
          {
            _id: 'demo15',
            title: 'Mahindra Irrigation System',
            description: 'Complete irrigation system with pump, pipes, and sprinklers. Ideal for medium to large farms.',
            price: 800,
            location: 'Mysore, Karnataka',
            type: 'equipment',
            images: equipmentImages.irrigation,
            owner: {
              _id: 'demo-user-id',
              name: 'Venkatesh Rao'
            },
            createdAt: '2024-01-15T16:30:00Z'
          },
          {
            _id: 'demo16',
            title: 'John Deere Sprayer',
            description: 'High-capacity sprayer for crop protection. Uniform application with minimal drift.',
            price: 600,
            location: 'Chandigarh, Punjab',
            type: 'equipment',
            images: equipmentImages.irrigation,
            owner: {
              _id: 'demo-user-id',
              name: 'Manpreet Singh'
            },
            createdAt: '2024-01-10T13:45:00Z'
          },
          {
            _id: 'demo17',
            title: 'Mahindra Thresher',
            description: 'Efficient thresher for wheat, rice, and other grains. High output with low grain damage.',
            price: 700,
            location: 'Bhubaneswar, Odisha',
            type: 'equipment',
            images: equipmentImages.harvester,
            owner: {
              _id: 'demo-user-id',
              name: 'Ankit Mohanty'
            },
            createdAt: '2024-01-05T10:20:00Z'
          },
          {
            _id: 'demo18',
            title: 'VST Shakti Power Tiller Pro',
            description: 'Advanced 9 HP power tiller with enhanced features. Perfect for small to medium farms.',
            price: 550,
            location: 'Kochi, Kerala',
            type: 'equipment',
            images: equipmentImages.powerTiller,
            owner: {
              _id: 'demo-user-id',
              name: 'Thomas Kurian'
            },
            createdAt: '2024-01-01T09:30:00Z'
          },
          {
            _id: 'demo19',
            title: 'Mahindra Cultivator',
            description: 'Heavy-duty cultivator for secondary tillage. Ensures proper soil preparation for planting.',
            price: 450,
            location: 'Guwahati, Assam',
            type: 'equipment',
            images: equipmentImages.powerTiller,
            owner: {
              _id: 'demo-user-id',
              name: 'Deepak Baruah'
            },
            createdAt: '2023-12-28T14:15:00Z'
          }
        ];
        setListings(mockListings);
      } else {
        // In a real app, this would fetch from an API
        const response = await fetch('/api/listings');
        const data = await response.json();
        setListings(data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings
    .filter(listing => {
      // First apply the search and type filters
      const matchesSearchAndType = 
        (filterType === 'all' || listing.type === filterType) &&
        (searchTerm === '' || 
          listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Then apply the active tab filter
      if (activeTab === 'my-listings') {
        // For demo account, show empty list in "My Listings" tab
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (user && user.email === 'demo@example.com') {
          return false; // Return empty list for demo account
        }
        return matchesSearchAndType && listing.owner._id === user?._id;
      } else if (activeTab === 'favorites') {
        // For demo account, show empty list in "Favorites" tab
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (user && user.email === 'demo@example.com') {
          return false; // Return empty list for demo account
        }
        // In a real app, this would check if the listing is in the user's favorites
        return matchesSearchAndType;
      }
      
      return matchesSearchAndType;
    })
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FarmRental</h1>
              <div className="ml-10 flex space-x-8">
                <button 
                  onClick={() => setActiveTab('browse')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'browse' 
                      ? 'text-green-700 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Browse
                </button>
                <button 
                  onClick={() => setActiveTab('my-listings')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'my-listings' 
                      ? 'text-green-700 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  My Listings
                </button>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'favorites' 
                      ? 'text-green-700 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Favorites
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'land' | 'equipment')}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="land">Land Only</option>
              <option value="equipment">Equipment Only</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'date')}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => navigate('/listings/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Listing
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={listing.images[0] || '/placeholder.jpg'}
                  alt={listing.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    listing.type === 'land' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {listing.type === 'land' ? 'Land' : 'Equipment'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{listing.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <span>₹{listing.price}/day</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => navigate(`/listings/${listing._id}`)}
                    className="flex-1 mr-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;