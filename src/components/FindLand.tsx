import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Filter, MapPin, Calendar, DollarSign, ChevronRight, Heart, ArrowLeft, ArrowRight, Leaf, Cloud, Sun, Droplets } from 'lucide-react';

interface LandListing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  state: string;
  area: number; // in acres
  soilType: string;
  waterSource: string;
  images: string[];
  owner: {
    _id: string;
    name: string;
  };
  climate: string;
  crops: string[];
  createdAt: string;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const SOIL_TYPES = [
  'Alluvial Soil', 'Black Soil', 'Red Soil', 'Laterite Soil', 
  'Arid Soil', 'Saline Soil', 'Peaty Soil', 'Forest Soil'
];

const WATER_SOURCES = [
  'River', 'Well', 'Borewell', 'Canal', 'Rainwater Harvesting', 
  'Dam', 'Lake', 'Pond', 'No water source'
];

const CLIMATE_TYPES = [
  'Tropical', 'Subtropical', 'Semi-arid', 'Humid', 'Temperate', 'Monsoon'
];

const mockLandListings: LandListing[] = [
  {
    _id: '1',
    title: '10 Acre Fertile Land in Punjab',
    description: 'Prime agricultural land with alluvial soil perfect for wheat, rice, and cotton cultivation. Access to canal irrigation and close to main highway for easy transport.',
    price: 5000,
    location: 'Ludhiana',
    state: 'Punjab',
    area: 10,
    soilType: 'Alluvial Soil',
    waterSource: 'Canal',
    climate: 'Subtropical',
    crops: ['Wheat', 'Rice', 'Cotton'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1439728375832-e7c4628e6979?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner1',
      name: 'Amarjit Singh'
    },
    createdAt: '2023-04-15T10:30:00Z'
  },
  {
    _id: '2',
    title: '5 Acre Coastal Land in Kerala',
    description: 'Beautiful coastal land suitable for coconut, banana and spice cultivation. Rich in laterite soil with good drainage. Natural water source from nearby river.',
    price: 7500,
    location: 'Kochi',
    state: 'Kerala',
    area: 5,
    soilType: 'Laterite Soil',
    waterSource: 'River',
    climate: 'Tropical',
    crops: ['Coconut', 'Banana', 'Spices'],
    images: [
      'https://images.unsplash.com/photo-1570882194983-935331f6df3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1572731410001-adbd1d8d7684?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner2',
      name: 'Thomas Mathew'
    },
    createdAt: '2023-05-02T14:45:00Z'
  },
  {
    _id: '3',
    title: '15 Acre Black Soil Land in Maharashtra',
    description: 'Large agricultural plot with rich black cotton soil ideal for cotton and soybean cultivation. Borewell water available year-round with electricity connection.',
    price: 4500,
    location: 'Nagpur',
    state: 'Maharashtra',
    area: 15,
    soilType: 'Black Soil',
    waterSource: 'Borewell',
    climate: 'Semi-arid',
    crops: ['Cotton', 'Soybean', 'Pulses'],
    images: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner3',
      name: 'Rajesh Patil'
    },
    createdAt: '2023-03-22T09:15:00Z'
  },
  {
    _id: '4',
    title: '7 Acre Red Soil Land in Karnataka',
    description: 'Well-maintained agricultural land suitable for millet, groundnut and pulses. Equipped with drip irrigation system and solar-powered water pump.',
    price: 6000,
    location: 'Mysuru',
    state: 'Karnataka',
    area: 7,
    soilType: 'Red Soil',
    waterSource: 'Well',
    climate: 'Temperate',
    crops: ['Millet', 'Groundnut', 'Pulses'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1489657780376-e0d8630c4bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner4',
      name: 'Kavitha Gowda'
    },
    createdAt: '2023-06-10T11:20:00Z'
  },
  {
    _id: '5',
    title: '20 Acre Agricultural Land in UP',
    description: 'Large fertile farmland in the Gangetic plain perfect for sugarcane and rice farming. Excellent canal irrigation facility with all-weather road access.',
    price: 4000,
    location: 'Meerut',
    state: 'Uttar Pradesh',
    area: 20,
    soilType: 'Alluvial Soil',
    waterSource: 'Canal',
    climate: 'Humid',
    crops: ['Sugarcane', 'Rice', 'Wheat'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1595356700395-6f14b5ea4fce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner5',
      name: 'Rakesh Sharma'
    },
    createdAt: '2023-02-18T16:40:00Z'
  }
];

const FindLand: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedSoilType, setSelectedSoilType] = useState<string>('');
  const [selectedWaterSource, setSelectedWaterSource] = useState<string>('');
  const [minArea, setMinArea] = useState<string>('');
  const [maxArea, setMaxArea] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'area'>('date');
  const [listings, setListings] = useState<LandListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // In a real app, this would fetch from an API
    setListings(mockLandListings);
    setLoading(false);
  }, []);

  const filteredListings = listings
    .filter(listing => 
      (searchTerm === '' || 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedState === '' || listing.state === selectedState) &&
      (selectedSoilType === '' || listing.soilType === selectedSoilType) &&
      (selectedWaterSource === '' || listing.waterSource === selectedWaterSource) &&
      (minArea === '' || listing.area >= Number(minArea)) &&
      (maxArea === '' || listing.area <= Number(maxArea)) &&
      (minPrice === '' || listing.price >= Number(minPrice)) &&
      (maxPrice === '' || listing.price <= Number(maxPrice))
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'area') {
        return b.area - a.area;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedSoilType('');
    setSelectedWaterSource('');
    setMinArea('');
    setMaxArea('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('date');
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getSoilTypeIcon = (soilType: string) => {
    switch (soilType) {
      case 'Alluvial Soil':
      case 'Black Soil':
        return <Leaf className="h-4 w-4 mr-1 text-green-600" />;
      case 'Red Soil':
      case 'Laterite Soil':
        return <Leaf className="h-4 w-4 mr-1 text-yellow-600" />;
      default:
        return <Leaf className="h-4 w-4 mr-1 text-gray-600" />;
    }
  };

  const getWaterSourceIcon = (waterSource: string) => {
    switch (waterSource) {
      case 'River':
      case 'Canal':
      case 'Lake':
      case 'Pond':
        return <Droplets className="h-4 w-4 mr-1 text-blue-600" />;
      case 'Well':
      case 'Borewell':
        return <Droplets className="h-4 w-4 mr-1 text-blue-400" />;
      case 'Rainwater Harvesting':
        return <Cloud className="h-4 w-4 mr-1 text-blue-300" />;
      default:
        return <Droplets className="h-4 w-4 mr-1 text-gray-400" />;
    }
  };

  const getClimateIcon = (climate: string) => {
    switch (climate) {
      case 'Tropical':
      case 'Subtropical':
        return <Sun className="h-4 w-4 mr-1 text-yellow-500" />;
      case 'Monsoon':
      case 'Humid':
        return <Cloud className="h-4 w-4 mr-1 text-blue-400" />;
      default:
        return <Sun className="h-4 w-4 mr-1 text-gray-500" />;
    }
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
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Find Agricultural Land in India</h1>
          <p className="mt-2">Discover the perfect farming land across India's diverse regions</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        {/* Search and Filter Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by location, title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All States</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
                Soil Type
              </label>
              <select
                id="soilType"
                value={selectedSoilType}
                onChange={(e) => setSelectedSoilType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Soil Types</option>
                {SOIL_TYPES.map((soilType) => (
                  <option key={soilType} value={soilType}>
                    {soilType}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="waterSource" className="block text-sm font-medium text-gray-700 mb-1">
                Water Source
              </label>
              <select
                id="waterSource"
                value={selectedWaterSource}
                onChange={(e) => setSelectedWaterSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Water Sources</option>
                {WATER_SOURCES.map((waterSource) => (
                  <option key={waterSource} value={waterSource}>
                    {waterSource}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Size (acres)
              </label>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (₹ per day)
              </label>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between">
            <div className="mb-2 sm:mb-0">
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'area')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="date">Latest</option>
                <option value="price">Price (Low to High)</option>
                <option value="area">Area (High to Low)</option>
              </select>
            </div>

            <div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {filteredListings.length} {filteredListings.length === 1 ? 'Result' : 'Results'} Found
          </h2>
        </div>

        {filteredListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="object-cover w-full h-48"
                    />
                    <div className="absolute top-2 right-2">
                      <button className="p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {listing.area} acres
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {listing.location}, {listing.state}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{listing.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getSoilTypeIcon(listing.soilType)} {listing.soilType}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                        {getWaterSourceIcon(listing.waterSource)} {listing.waterSource}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800">
                        {getClimateIcon(listing.climate)} {listing.climate}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        <span>₹{listing.price}/day</span>
                      </div>
                      <button
                        onClick={() => navigate(`/listings/${listing._id}`)}
                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mb-8">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-green-50 border-green-500 text-green-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindLand; 