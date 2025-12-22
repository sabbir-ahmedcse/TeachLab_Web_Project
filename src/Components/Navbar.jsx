import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../Hook/useAuth';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logOut, signInUser } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle user dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      setUserDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    // { to: '/courses', label: 'Courses', icon: '📚' },
    { to: '/gallery', label: 'Gallery', icon: '🖼️' },
    { to: '/create', label: 'Create', icon: '✏️' },
    // { to: '/community', label: 'Community', icon: '👥' },
    { to: '/about', label: 'About', icon: 'ℹ️' },
  ];

  // User menu items (only show when logged in)
  const userMenuItems = [
    { label: 'Profile', icon: '👤', path: '/profile' },
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { label: 'Settings', icon: '⚙️', path: '/settings' },
    { label: 'Logout', icon: '🚪', action: handleLogout },
  ];

  // Admin menu items
  const adminMenuItems = [
    { label: 'Admin Panel', icon: '👑', path: '/admin' },
    { label: 'Manage Users', icon: '👥', path: '/admin/users' },
    { label: 'Manage Courses', icon: '📚', path: '/admin/courses' },
    ...userMenuItems
  ];

  const link = (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => 
            `flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${isActive 
              ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="text-xl">{link.icon}</span>
          <span>{link.label}</span>
        </NavLink>
      ))}
    </>
  );

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.displayName) return 'U';
    const names = user.displayName.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Get current user menu items based on role
  const getCurrentUserMenuItems = () => {
    // Check if user is admin (you need to implement your own admin check logic)
    const isAdmin = user?.email === 'admin@teachlab.com' || user?.uid === 'admin-id';
    return isAdmin ? adminMenuItems : userMenuItems;
  };

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' 
        : 'bg-gradient-to-r from-blue-50 to-teal-50 shadow-md py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="text-2xl font-bold text-white">TL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  TeachLab
                </span>
                <span className="text-xs text-gray-500 font-medium">Learning Platform</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {link}
          </div>

          {/* User Actions & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            
            {/* Search Button */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Notification Bell (only for logged in users) */}
            {user && (
              <div className="relative hidden md:block">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
            )}
            
            {/* User Profile Section */}
            {user ? (
              // Logged In User
              <div className="hidden md:block relative user-dropdown">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">{getUserInitials()}</span>
                  </div>
                  <span className="font-medium">
                    {user.displayName?.split(' ')[0] || 'User'}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-teal-50">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      {user.email === 'admin@teachlab.com' && (
                        <span className="inline-block mt-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    <div className="py-2">
                      {getCurrentUserMenuItems().map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (item.action) {
                              item.action();
                            } else if (item.path) {
                              navigate(item.path);
                              setUserDropdownOpen(false);
                            }
                          }}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          <span className="mr-3 text-lg">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not Logged In - Show Login Button
              <div className="hidden md:flex items-center space-x-3">
                <NavLink
                  to="/login"
                  className="px-6 py-2.5 bg-purple-300  text-blue-600 hover:text-blue-700 font-medium rounded-lg transition-colors duration-300"
                >
                  Log In
                </NavLink>
                {/* <NavLink
                  to="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Sign Up Free
                </NavLink> */}
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
          <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' 
                      : 'text-gray-700 hover:bg-blue-50'}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              ))}
              
              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  // Logged In User Mobile View
                  <>
                    <div className="flex items-center space-x-4 px-4 py-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {user.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <NavLink
                        to="/profile"
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-2xl mb-1">👤</span>
                        <span className="text-xs font-medium">Profile</span>
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-600 transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-2xl mb-1">📊</span>
                        <span className="text-xs font-medium">Dashboard</span>
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-2xl mb-1">⚙️</span>
                        <span className="text-xs font-medium">Settings</span>
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-300"
                      >
                        <span className="text-2xl mb-1">🚪</span>
                        <span className="text-xs font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  // Not Logged In Mobile View
                  <div className="space-y-3">
                    <NavLink
                      to="/login"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl font-semibold hover:shadow-md transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>🔑</span>
                      Log In
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>✨</span>
                      Sign Up Free
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;