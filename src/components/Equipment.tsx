import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Filter, MapPin, Calendar, DollarSign, ChevronRight, Heart, ArrowLeft, ArrowRight, Wrench, Tractor, Droplet, Zap, Clock, Shield, Star } from 'lucide-react';

interface EquipmentListing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  state: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  condition: string;
  images: string[];
  owner: {
    _id: string;
    name: string;
    rating: number;
  };
  features: string[];
  availability: {
    startDate: string;
    endDate: string;
  };
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

const EQUIPMENT_CATEGORIES = [
  'Tractors', 'Harvesters', 'Plows', 'Seeders', 'Irrigation Systems', 
  'Sprayers', 'Threshers', 'Power Tillers', 'Cultivators', 'Other'
];

const EQUIPMENT_BRANDS = [
  'Mahindra', 'Tafe', 'Escorts', 'Sonalika', 'John Deere', 
  'New Holland', 'Kubota', 'VST Tillers', 'Force Motors', 'Other'
];

const EQUIPMENT_CONDITIONS = [
  'New', 'Like New', 'Good', 'Fair', 'Needs Repair'
];

const mockEquipmentListings: EquipmentListing[] = [
  {
    _id: '1',
    title: 'Mahindra 575 DI XP Plus Tractor',
    description: 'Powerful 45 HP tractor with power steering, perfect for medium to large farms. Well-maintained with regular service history.',
    price: 1200,
    location: 'Ludhiana',
    state: 'Punjab',
    category: 'Tractors',
    brand: 'Mahindra',
    model: '575 DI XP Plus',
    year: 2020,
    condition: 'Good',
    features: ['Power Steering', 'Dual Clutch', 'Power Take Off', 'Hydraulic System'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner1',
      name: 'Amarjit Singh',
      rating: 4.8
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-06-30'
    },
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    _id: '2',
    title: 'John Deere 5050E Tractor',
    description: '50 HP tractor with advanced technology features. Ideal for precision farming and heavy-duty operations.',
    price: 1500,
    location: 'Nagpur',
    state: 'Maharashtra',
    category: 'Tractors',
    brand: 'John Deere',
    model: '5050E',
    year: 2021,
    condition: 'Like New',
    features: ['GPS Ready', 'Power Reverser', 'AutoTrac', 'iTEC Pro'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner2',
      name: 'Rajesh Patil',
      rating: 4.9
    },
    availability: {
      startDate: '2024-04-15',
      endDate: '2024-07-15'
    },
    createdAt: '2024-03-10T14:45:00Z'
  },
  {
    _id: '3',
    title: 'VST Shakti Power Tiller',
    description: 'Efficient 8.5 HP power tiller for small to medium farms. Easy to operate and maintain.',
    price: 500,
    location: 'Coimbatore',
    state: 'Tamil Nadu',
    category: 'Power Tillers',
    brand: 'VST Tillers',
    model: 'Shakti 130',
    year: 2022,
    condition: 'New',
    features: ['Easy Start', 'Fuel Efficient', 'Low Maintenance', 'Compact Design'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner3',
      name: 'Kavitha Gowda',
      rating: 4.7
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    createdAt: '2024-03-05T09:15:00Z'
  },
  {
    _id: '4',
    title: 'Mahindra Novo 755 DI Tractor',
    description: '75 HP tractor with advanced features for large-scale farming. Excellent condition with full service history.',
    price: 1800,
    location: 'Ahmedabad',
    state: 'Gujarat',
    category: 'Tractors',
    brand: 'Mahindra',
    model: 'Novo 755 DI',
    year: 2019,
    condition: 'Good',
    features: ['Power Steering', 'Dual Clutch', 'Power Take Off', 'Advanced Hydraulics'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner4',
      name: 'Ramesh Patel',
      rating: 4.6
    },
    availability: {
      startDate: '2024-05-01',
      endDate: '2024-08-31'
    },
    createdAt: '2024-03-01T11:20:00Z'
  },
  {
    _id: '5',
    title: 'Sonalika DI 35 RX Tractor',
    description: '35 HP tractor perfect for small to medium farms. Fuel-efficient and easy to operate.',
    price: 900,
    location: 'Lucknow',
    state: 'Uttar Pradesh',
    category: 'Tractors',
    brand: 'Sonalika',
    model: 'DI 35 RX',
    year: 2021,
    condition: 'Like New',
    features: ['Power Steering', 'Oil Immersed Brakes', 'Dual Clutch', 'Eco Mode'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner5',
      name: 'Amit Sharma',
      rating: 4.5
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-09-30'
    },
    createdAt: '2024-02-28T16:40:00Z'
  },
  {
    _id: '6',
    title: 'New Holland 3630 TX Plus Tractor',
    description: '75 HP tractor with advanced technology for precision farming. Perfect for large farms and commercial operations.',
    price: 2000,
    location: 'Jaipur',
    state: 'Rajasthan',
    category: 'Tractors',
    brand: 'New Holland',
    model: '3630 TX Plus',
    year: 2020,
    condition: 'Good',
    features: ['Power Steering', 'Dual Clutch', 'Power Take Off', 'Advanced Hydraulics', 'GPS Ready'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner6',
      name: 'Vikram Singh',
      rating: 4.9
    },
    availability: {
      startDate: '2024-04-15',
      endDate: '2024-07-15'
    },
    createdAt: '2024-02-25T09:30:00Z'
  },
  {
    _id: '7',
    title: 'Kubota B2420 Tractor',
    description: '24 HP compact tractor ideal for small farms and orchards. Versatile and fuel-efficient.',
    price: 800,
    location: 'Dehradun',
    state: 'Uttarakhand',
    category: 'Tractors',
    brand: 'Kubota',
    model: 'B2420',
    year: 2022,
    condition: 'Like New',
    features: ['Power Steering', '4WD', 'Power Take Off', 'Compact Design'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner7',
      name: 'Priya Sharma',
      rating: 4.7
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-10-31'
    },
    createdAt: '2024-02-20T14:15:00Z'
  },
  {
    _id: '8',
    title: 'Escorts Farmtrac 60 PowerMax Tractor',
    description: '60 HP tractor with advanced features for medium to large farms. Well-maintained with regular service.',
    price: 1400,
    location: 'Bhopal',
    state: 'Madhya Pradesh',
    category: 'Tractors',
    brand: 'Escorts',
    model: 'Farmtrac 60 PowerMax',
    year: 2019,
    condition: 'Good',
    features: ['Power Steering', 'Dual Clutch', 'Power Take Off', 'Advanced Hydraulics'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner8',
      name: 'Rajendra Verma',
      rating: 4.6
    },
    availability: {
      startDate: '2024-05-01',
      endDate: '2024-08-31'
    },
    createdAt: '2024-02-15T11:45:00Z'
  },
  {
    _id: '9',
    title: 'Mahindra Jivo 245 DI Tractor',
    description: '24.5 HP tractor perfect for small farms and orchards. Fuel-efficient and easy to operate.',
    price: 700,
    location: 'Hyderabad',
    state: 'Telangana',
    category: 'Tractors',
    brand: 'Mahindra',
    model: 'Jivo 245 DI',
    year: 2021,
    condition: 'Like New',
    features: ['Power Steering', 'Oil Immersed Brakes', 'Dual Clutch', 'Eco Mode'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner9',
      name: 'Suresh Reddy',
      rating: 4.8
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-09-30'
    },
    createdAt: '2024-02-10T10:20:00Z'
  },
  {
    _id: '10',
    title: 'Force Motors Orchard Tractor',
    description: '20 HP compact tractor designed specifically for orchards and vineyards. Maneuverable in tight spaces.',
    price: 600,
    location: 'Nashik',
    state: 'Maharashtra',
    category: 'Tractors',
    brand: 'Force Motors',
    model: 'Orchard Tractor',
    year: 2022,
    condition: 'New',
    features: ['Power Steering', 'Compact Design', 'Low Ground Clearance', 'Easy Maneuverability'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner10',
      name: 'Anita Desai',
      rating: 4.7
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    createdAt: '2024-02-05T09:30:00Z'
  },
  {
    _id: '11',
    title: 'Mahindra Harvester',
    description: 'Advanced harvesting machine for wheat and rice. High efficiency with low grain loss.',
    price: 2500,
    location: 'Amritsar',
    state: 'Punjab',
    category: 'Harvesters',
    brand: 'Mahindra',
    model: 'Harvester Pro',
    year: 2020,
    condition: 'Good',
    features: ['High Efficiency', 'Low Grain Loss', 'Adjustable Cutting Height', 'Large Grain Tank'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner11',
      name: 'Gurpreet Singh',
      rating: 4.9
    },
    availability: {
      startDate: '2024-04-15',
      endDate: '2024-06-15'
    },
    createdAt: '2024-01-30T14:45:00Z'
  },
  {
    _id: '12',
    title: 'John Deere S680 Combine Harvester',
    description: 'High-capacity combine harvester for large farms. Advanced technology for maximum efficiency.',
    price: 3000,
    location: 'Indore',
    state: 'Madhya Pradesh',
    category: 'Harvesters',
    brand: 'John Deere',
    model: 'S680',
    year: 2019,
    condition: 'Good',
    features: ['High Capacity', 'Advanced Technology', 'GPS Guidance', 'AutoTrac', 'Large Grain Tank'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner12',
      name: 'Arun Kumar',
      rating: 4.8
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-06-30'
    },
    createdAt: '2024-01-25T11:20:00Z'
  },
  {
    _id: '13',
    title: 'Mahindra Plow',
    description: 'Heavy-duty plow for primary tillage. Compatible with most tractors.',
    price: 400,
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'Plows',
    brand: 'Mahindra',
    model: 'Heavy Duty Plow',
    year: 2021,
    condition: 'Like New',
    features: ['Heavy Duty', 'Adjustable Depth', 'Easy Attachment', 'Durable Construction'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner13',
      name: 'Ravi Shankar',
      rating: 4.5
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    _id: '14',
    title: 'Sonalika Seeder',
    description: 'Precision seeder for row crops. Ensures uniform seed placement and spacing.',
    price: 350,
    location: 'Patna',
    state: 'Bihar',
    category: 'Seeders',
    brand: 'Sonalika',
    model: 'Precision Seeder',
    year: 2022,
    condition: 'New',
    features: ['Precision Seeding', 'Adjustable Row Spacing', 'Seed Rate Control', 'Easy Calibration'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner14',
      name: 'Mohan Kumar',
      rating: 4.6
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-10-31'
    },
    createdAt: '2024-01-15T16:30:00Z'
  },
  {
    _id: '15',
    title: 'Mahindra Irrigation System',
    description: 'Complete irrigation system with pump, pipes, and sprinklers. Ideal for medium to large farms.',
    price: 800,
    location: 'Mysore',
    state: 'Karnataka',
    category: 'Irrigation Systems',
    brand: 'Mahindra',
    model: 'Irrigation Pro',
    year: 2021,
    condition: 'Good',
    features: ['High Flow Rate', 'Energy Efficient', 'Complete Setup', 'Easy Installation'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner15',
      name: 'Krishna Gowda',
      rating: 4.7
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    createdAt: '2024-01-10T13:45:00Z'
  },
  {
    _id: '16',
    title: 'John Deere Sprayer',
    description: 'High-capacity sprayer for crop protection. Uniform application with minimal drift.',
    price: 600,
    location: 'Chandigarh',
    state: 'Punjab',
    category: 'Sprayers',
    brand: 'John Deere',
    model: 'Spray Pro',
    year: 2020,
    condition: 'Good',
    features: ['High Capacity', 'Uniform Application', 'Minimal Drift', 'Easy Calibration'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner16',
      name: 'Harpreet Singh',
      rating: 4.8
    },
    availability: {
      startDate: '2024-04-15',
      endDate: '2024-09-15'
    },
    createdAt: '2024-01-05T10:20:00Z'
  },
  {
    _id: '17',
    title: 'Mahindra Thresher',
    description: 'Efficient thresher for wheat, rice, and other grains. High output with low grain damage.',
    price: 700,
    location: 'Bhubaneswar',
    state: 'Odisha',
    category: 'Threshers',
    brand: 'Mahindra',
    model: 'Thresher Pro',
    year: 2021,
    condition: 'Like New',
    features: ['High Output', 'Low Grain Damage', 'Easy Operation', 'Multiple Crop Compatibility'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner17',
      name: 'Prakash Das',
      rating: 4.6
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-10-31'
    },
    createdAt: '2023-12-30T15:30:00Z'
  },
  {
    _id: '18',
    title: 'VST Shakti Power Tiller Pro',
    description: 'Advanced 9 HP power tiller with enhanced features. Perfect for small to medium farms.',
    price: 550,
    location: 'Kochi',
    state: 'Kerala',
    category: 'Power Tillers',
    brand: 'VST Tillers',
    model: 'Shakti Pro',
    year: 2022,
    condition: 'New',
    features: ['Easy Start', 'Fuel Efficient', 'Low Maintenance', 'Enhanced Power'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner18',
      name: 'Thomas George',
      rating: 4.7
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    createdAt: '2023-12-25T11:45:00Z'
  },
  {
    _id: '19',
    title: 'Mahindra Cultivator',
    description: 'Heavy-duty cultivator for secondary tillage. Ensures proper soil preparation for planting.',
    price: 450,
    location: 'Guwahati',
    state: 'Assam',
    category: 'Cultivators',
    brand: 'Mahindra',
    model: 'Cultivator Pro',
    year: 2021,
    condition: 'Good',
    features: ['Heavy Duty', 'Adjustable Depth', 'Easy Attachment', 'Durable Construction'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner19',
      name: 'Rajib Gogoi',
      rating: 4.5
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-10-31'
    },
    createdAt: '2023-12-20T09:30:00Z'
  },
  {
    _id: '20',
    title: 'Custom Farm Equipment Trailer',
    description: 'Versatile trailer for transporting farm equipment and produce. Heavy-duty construction.',
    price: 300,
    location: 'Thiruvananthapuram',
    state: 'Kerala',
    category: 'Other',
    brand: 'Custom',
    model: 'Farm Trailer',
    year: 2020,
    condition: 'Good',
    features: ['Heavy Duty', 'Adjustable Height', 'Easy Loading', 'Durable Construction'],
    images: [
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    owner: {
      _id: 'owner20',
      name: 'Suresh Nair',
      rating: 4.6
    },
    availability: {
      startDate: '2024-04-01',
      endDate: '2024-12-31'
    },
    createdAt: '2023-12-15T14:20:00Z'
  }
];

const Equipment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'rating'>('date');
  const [listings, setListings] = useState<EquipmentListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // In a real app, this would fetch from an API
    setListings(mockEquipmentListings);
    setLoading(false);
  }, []);

  const filteredListings = listings
    .filter(listing => 
      (searchTerm === '' || 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedState === '' || listing.state === selectedState) &&
      (selectedCategory === '' || listing.category === selectedCategory) &&
      (selectedBrand === '' || listing.brand === selectedBrand) &&
      (selectedCondition === '' || listing.condition === selectedCondition) &&
      (minPrice === '' || listing.price >= Number(minPrice)) &&
      (maxPrice === '' || listing.price <= Number(maxPrice))
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'rating') {
        return b.owner.rating - a.owner.rating;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedCondition('');
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tractors':
        return <Tractor className="h-4 w-4 mr-1 text-green-600" />;
      case 'Power Tillers':
        return <Wrench className="h-4 w-4 mr-1 text-blue-600" />;
      case 'Irrigation Systems':
        return <Droplet className="h-4 w-4 mr-1 text-blue-400" />;
      default:
        return <Wrench className="h-4 w-4 mr-1 text-gray-600" />;
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
          <h1 className="text-3xl font-bold">Farm Equipment Rentals in India</h1>
          <p className="mt-2">Find and rent agricultural equipment from trusted owners across India</p>
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
                placeholder="Search by equipment name, brand, or location..."
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
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {EQUIPMENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {EQUIPMENT_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Conditions</option>
                {EQUIPMENT_CONDITIONS.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
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

            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'rating')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="date">Latest</option>
                <option value="price">Price (Low to High)</option>
                <option value="rating">Rating (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {filteredListings.length} {filteredListings.length === 1 ? 'Equipment' : 'Equipment'} Found
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
                        {listing.category}
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
                        {getCategoryIcon(listing.category)} {listing.brand}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                        <Shield className="h-4 w-4 mr-1" /> {listing.condition}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800">
                        <Star className="h-4 w-4 mr-1" /> {listing.owner.rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        <span>₹{listing.price}/day</span>
                      </div>
                      <button
                        onClick={() => navigate(`/equipment/${listing._id}`)}
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Equipment; 