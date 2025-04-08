import React, { useState, useEffect } from 'react';
import { X, User, Lock, Bell, Globe, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserSettings {
  name: string;
  email: string;
  phone: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'light' | 'dark' | 'system';
}

const SettingsPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');
  const [settings, setSettings] = useState<UserSettings>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    language: 'English',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    theme: 'light'
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchUserSettings();
    }
  }, [isOpen, user]);

  const fetchUserSettings = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For demo purposes, we'll use mock data
      const mockSettings: UserSettings = {
        name: user?.name || 'Rajinder Singh',
        email: user?.email || 'demo@example.com',
        phone: '+91 98765 43210',
        language: 'Hindi',
        notifications: {
          email: true,
          push: true,
          sms: true
        },
        theme: 'light'
      };
      
      setSettings(mockSettings);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      setErrorMessage('Failed to load settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const [category, setting] = name.split('.');
      
      if (category === 'notifications') {
        setSettings(prev => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [setting]: checkbox.checked
          }
        }));
      }
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('Settings updated successfully!');
      
      // Update the user in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.name = settings.name;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setErrorMessage('Failed to update settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="px-4 py-6 bg-green-50 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Settings</h2>
                <div className="ml-3 flex items-center">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {loading && activeTab === 'profile' ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div className="flex h-full">
                  {/* Sidebar */}
                  <div className="w-1/4 bg-gray-50 border-r border-gray-200">
                    <nav className="mt-5 px-2 space-y-1">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                          activeTab === 'profile'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <User className={`mr-3 h-5 w-5 ${
                          activeTab === 'profile' ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        Profile
                      </button>
                      <button
                        onClick={() => setActiveTab('security')}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                          activeTab === 'security'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Lock className={`mr-3 h-5 w-5 ${
                          activeTab === 'security' ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        Security
                      </button>
                      <button
                        onClick={() => setActiveTab('notifications')}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                          activeTab === 'notifications'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Bell className={`mr-3 h-5 w-5 ${
                          activeTab === 'notifications' ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        Notifications
                      </button>
                      <button
                        onClick={() => setActiveTab('preferences')}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                          activeTab === 'preferences'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Globe className={`mr-3 h-5 w-5 ${
                          activeTab === 'preferences' ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        Preferences
                      </button>
                    </nav>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    {successMessage && (
                      <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                        {successMessage}
                      </div>
                    )}
                    
                    {errorMessage && (
                      <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {errorMessage}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      {/* Profile Tab */}
                      {activeTab === 'profile' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Update your personal information.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  value={settings.name}
                                  onChange={handleChange}
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <div className="mt-1">
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  value={settings.email}
                                  onChange={handleChange}
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="sm:col-span-4">
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                              </label>
                              <div className="mt-1">
                                <input
                                  type="tel"
                                  name="phone"
                                  id="phone"
                                  value={settings.phone}
                                  onChange={handleChange}
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Security Tab */}
                      {activeTab === 'security' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Manage your password and account security.
                            </p>
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                                Current Password
                              </label>
                              <div className="mt-1">
                                <input
                                  type="password"
                                  name="current-password"
                                  id="current-password"
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                New Password
                              </label>
                              <div className="mt-1">
                                <input
                                  type="password"
                                  name="new-password"
                                  id="new-password"
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                              </label>
                              <div className="mt-1">
                                <input
                                  type="password"
                                  name="confirm-password"
                                  id="confirm-password"
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Notifications Tab */}
                      {activeTab === 'notifications' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Choose how you want to be notified.
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="notifications.email"
                                  name="notifications.email"
                                  type="checkbox"
                                  checked={settings.notifications.email}
                                  onChange={handleChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="notifications.email" className="font-medium text-gray-700">
                                  Email Notifications
                                </label>
                                <p className="text-gray-500">Receive notifications via email.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="notifications.push"
                                  name="notifications.push"
                                  type="checkbox"
                                  checked={settings.notifications.push}
                                  onChange={handleChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="notifications.push" className="font-medium text-gray-700">
                                  Push Notifications
                                </label>
                                <p className="text-gray-500">Receive push notifications in the app.</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="notifications.sms"
                                  name="notifications.sms"
                                  type="checkbox"
                                  checked={settings.notifications.sms}
                                  onChange={handleChange}
                                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="notifications.sms" className="font-medium text-gray-700">
                                  SMS Notifications
                                </label>
                                <p className="text-gray-500">Receive notifications via SMS.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Preferences Tab */}
                      {activeTab === 'preferences' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">App Preferences</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Customize your app experience.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                                Language
                              </label>
                              <div className="mt-1">
                                <select
                                  id="language"
                                  name="language"
                                  value={settings.language}
                                  onChange={handleChange}
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                  <option>English</option>
                                  <option>Hindi</option>
                                  <option>Gujarati</option>
                                  <option>Marathi</option>
                                  <option>Tamil</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="sm:col-span-4">
                              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                                Theme
                              </label>
                              <div className="mt-1">
                                <select
                                  id="theme"
                                  name="theme"
                                  value={settings.theme}
                                  onChange={handleChange}
                                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                  <option value="light">Light</option>
                                  <option value="dark">Dark</option>
                                  <option value="system">System</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                        
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : null}
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 