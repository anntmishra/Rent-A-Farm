import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, DollarSign, Calendar, Upload, X, Plus, ChevronLeft, Droplets, Sun, Cloud, Leaf } from 'lucide-react';

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

const COMMON_CROPS = [
  'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Tea', 'Coffee', 'Rubber', 
  'Maize', 'Millet', 'Pulses', 'Oilseeds', 'Fruits', 'Vegetables',
  'Spices', 'Coconut', 'Jute', 'Tobacco'
];

interface LandFormData {
  title: string;
  description: string;
  price: number;
  location: string;
  state: string;
  area: number;
  soilType: string;
  waterSource: string;
  climate: string;
  crops: string[];
  availability: {
    startDate: string;
    endDate: string;
  };
  images: File[];
}

const ListLand: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<LandFormData>({
    title: '',
    description: '',
    price: 0,
    location: '',
    state: '',
    area: 0,
    soilType: '',
    waterSource: '',
    climate: '',
    crops: [],
    availability: {
      startDate: '',
      endDate: ''
    },
    images: []
  });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cropInput, setCropInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'startDate' || name === 'endDate') {
      setFormData(prev => ({
        ...prev,
        availability: {
          ...prev.availability,
          [name]: value
        }
      }));
    } else if (name === 'area' || name === 'price') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...filesArray]
      }));

      // Create preview URLs
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addCrop = () => {
    if (!cropInput.trim()) return;
    if (formData.crops.includes(cropInput.trim())) return;
    
    setFormData(prev => ({
      ...prev,
      crops: [...prev.crops, cropInput.trim()]
    }));
    setCropInput('');
  };

  const addCommonCrop = (crop: string) => {
    if (formData.crops.includes(crop)) return;
    
    setFormData(prev => ({
      ...prev,
      crops: [...prev.crops, crop]
    }));
  };

  const removeCrop = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.filter(c => c !== crop)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (formData.area <= 0) {
      newErrors.area = 'Area must be greater than 0';
    }
    
    if (!formData.soilType) {
      newErrors.soilType = 'Soil type is required';
    }
    
    if (!formData.waterSource) {
      newErrors.waterSource = 'Water source is required';
    }
    
    if (formData.availability.startDate && formData.availability.endDate) {
      const startDate = new Date(formData.availability.startDate);
      const endDate = new Date(formData.availability.endDate);
      
      if (startDate >= endDate) {
        newErrors.availability = 'End date must be after start date';
      }
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the listing
      // For now, we'll just simulate a successful submission
      console.log('Form data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate back to dashboard on success
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating listing:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to create listing. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">List Your Agricultural Land</h1>
              <p className="mt-1">Rent out your land to farmers across India</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center px-4 py-2 border border-white rounded-md text-sm font-medium text-white bg-transparent hover:bg-white hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g. 10 Acre Fertile Land in Punjab"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe your land, its features, nearby facilities, etc."
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                    Area (acres)
                  </label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area || ''}
                    onChange={handleInputChange}
                    min="0.1"
                    step="0.1"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.area ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 10"
                  />
                  {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area}</p>}
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Rent Price (₹ per day)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price || ''}
                      onChange={handleInputChange}
                      min="0"
                      className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. 5000"
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location (City/District)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. Ludhiana"
                    />
                  </div>
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a state</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>
              </div>
            </div>
          </div>
          
          {/* Land Characteristics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Land Characteristics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="inline-flex items-center">
                    <Leaf className="h-5 w-5 mr-1 text-green-600" />
                    Soil Type
                  </span>
                </label>
                <select
                  id="soilType"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.soilType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select soil type</option>
                  {SOIL_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.soilType && <p className="mt-1 text-sm text-red-600">{errors.soilType}</p>}
              </div>
              
              <div>
                <label htmlFor="waterSource" className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="inline-flex items-center">
                    <Droplets className="h-5 w-5 mr-1 text-blue-600" />
                    Water Source
                  </span>
                </label>
                <select
                  id="waterSource"
                  name="waterSource"
                  value={formData.waterSource}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.waterSource ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select water source</option>
                  {WATER_SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
                {errors.waterSource && <p className="mt-1 text-sm text-red-600">{errors.waterSource}</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="climate" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="inline-flex items-center">
                  <Sun className="h-5 w-5 mr-1 text-yellow-500" />
                  Climate
                </span>
              </label>
              <select
                id="climate"
                name="climate"
                value={formData.climate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select climate type</option>
                {CLIMATE_TYPES.map((climate) => (
                  <option key={climate} value={climate}>
                    {climate}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suitable Crops
              </label>
              <div className="mb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.crops.map((crop) => (
                    <span 
                      key={crop} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {crop}
                      <button 
                        type="button" 
                        onClick={() => removeCrop(crop)}
                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:text-green-500 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    value={cropInput}
                    onChange={(e) => setCropInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Add crop"
                  />
                  <button
                    type="button"
                    onClick={addCrop}
                    className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Common crops:</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_CROPS.slice(0, 8).map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => addCommonCrop(crop)}
                      disabled={formData.crops.includes(crop)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        formData.crops.includes(crop)
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Availability */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.availability.startDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.availability.endDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            {errors.availability && <p className="mt-1 text-sm text-red-600">{errors.availability}</p>}
          </div>
          
          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Images of Your Land
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Include clear images of your land from different angles
                  </p>
                </div>
              </div>
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
            </div>
            
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {errors.submit}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Listing...' : 'List Your Land'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ListLand; 