'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by checking cookies
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('agri_auth='));
      setIsAuthenticated(authCookie?.includes('agri_auth=1') || false);
    };
    
    checkAuth();
    // Re-check on focus (in case user logged in from another tab)
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  const handleLogout = () => {
    document.cookie = 'agri_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'agri_email=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="glass rounded-full px-6 sm:px-8 border border-white/20 shadow-2xl backdrop-blur-xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary-600 to-emerald-600 p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-glow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-700 to-emerald-700 bg-clip-text text-transparent hidden sm:block">AgriInput Ledger</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110">
              Home
            </Link>
            <Link href="/items" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110">
              Browse Inputs
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/add-item" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110">
                  Add Item
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/add-item" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110">
                  Add Item
                </Link>
                <Link href="/login" className="btn-primary">
                  Admin Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
