import React, { useState, useEffect } from 'react';
import { X, Bell, Check, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

const NotificationPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For demo purposes, we'll use mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'नया संदेश',
          message: 'आपको राजिंदर सिंह से एक नया संदेश मिला है।',
          type: 'info',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
        },
        {
          id: '2',
          title: 'लिस्टिंग स्वीकृत',
          message: 'आपकी ट्रैक्टर लिस्टिंग स्वीकृत कर दी गई है और अब लाइव है।',
          type: 'success',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        },
        {
          id: '3',
          title: 'भुगतान आवश्यक',
          message: 'कृपया अपने हाल के बुकिंग के लिए भुगतान पूरा करें।',
          type: 'warning',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
          id: '4',
          title: 'खाता सत्यापन',
          message: 'आपका खाता सत्यापन लंबित है। कृपया प्रक्रिया पूरी करें।',
          type: 'error',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // In a real app, this would be an API call
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // In a real app, this would be an API call
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
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
                <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
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
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bell className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="ml-4 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => markAsRead(notification.id)}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Check className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel; 