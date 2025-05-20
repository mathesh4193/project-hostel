import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, Bell, User, LogOut, X, BarChart, Users, Home } from 'lucide-react';
import { notifications } from '../../data/mockData';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const userNotifications = notifications.filter(
    notif => notif.userId === currentUser?.id
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">VCET</span>
              <span className="text-gray-700 font-medium text-lg ml-1">Hostel</span>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <BarChart className="h-5 w-5 mr-1" />
                Dashboard
              </button>
            )}
            
            {currentUser?.role === 'warden' && (
              <button 
                onClick={() => navigate('/warden/dashboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Users className="h-5 w-5 mr-1" />
                Dashboard
              </button>
            )}
            
            {currentUser?.role === 'student' && (
              <button 
                onClick={() => navigate('/student/dashboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Home className="h-5 w-5 mr-1" />
                Dashboard
              </button>
            )}
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                {userNotifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {userNotifications.length > 0 ? (
                      userNotifications.map((notif) => (
                        <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 border-l-4 ${
                          notif.type === 'success' ? 'border-green-500' : 
                          notif.type === 'warning' ? 'border-yellow-500' : 
                          notif.type === 'error' ? 'border-red-500' : 'border-blue-500'
                        } ${notif.read ? 'opacity-60' : ''}`}>
                          <p className="text-sm text-gray-700">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-700">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => navigate('/profile')}
                    className="p-1 rounded-full text-gray-600 hover:text-gray-900 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => {
                  navigate('/admin/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                <BarChart className="h-5 w-5 mr-2 inline" />
                Dashboard
              </button>
            )}
            
            {currentUser?.role === 'warden' && (
              <button 
                onClick={() => {
                  navigate('/warden/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                <Users className="h-5 w-5 mr-2 inline" />
                Dashboard
              </button>
            )}
            
            {currentUser?.role === 'student' && (
              <button 
                onClick={() => {
                  navigate('/student/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                <Home className="h-5 w-5 mr-2 inline" />
                Dashboard
              </button>
            )}
            
            <button 
              onClick={() => {
                navigate('/profile');
                setMobileMenuOpen(false);
              }}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              <User className="h-5 w-5 mr-2 inline" />
              Profile
            </button>
            
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              <LogOut className="h-5 w-5 mr-2 inline" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;