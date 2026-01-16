'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ItemCard from '@/components/ItemCard';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api/items', {
          cache: 'no-store',
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch items');
        }
        
        const data = await res.json();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, []);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    
    if (category === 'All') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  const getButtonClass = (category) => {
    const baseClass = "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105";
    if (activeFilter === category) {
      return `${baseClass} bg-gradient-to-r from-primary-600 to-emerald-600 text-white shadow-lg`;
    }
    return `${baseClass} glass text-gray-700 hover:border-primary-400`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-emerald-600 to-teal-600">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-white">Verified Agricultural Inputs</h1>
            <p className="text-xl text-emerald-50">
              Browse our complete catalog of certified seeds, fertilizers, and pesticides
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="glass border-b border-white/20 py-6 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-gray-800">Filter by Category:</span>
              </div>
              <button 
                onClick={() => handleFilterClick('All')}
                className={getButtonClass('All')}
              >
                All
              </button>
              <button 
                onClick={() => handleFilterClick('Seed')}
                className={getButtonClass('Seed')}
              >
                🌾 Seeds
              </button>
              <button 
                onClick={() => handleFilterClick('Fertilizer')}
                className={getButtonClass('Fertilizer')}
              >
                🧪 Fertilizers
              </button>
              <button 
                onClick={() => handleFilterClick('Pesticide')}
                className={getButtonClass('Pesticide')}
              >
                🛡️ Pesticides
              </button>
              <div className="ml-auto text-sm font-semibold text-gray-700 glass px-4 py-2 rounded-full">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="glass rounded-3xl p-12 max-w-md mx-auto">
                <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">Try selecting a different category filter.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
