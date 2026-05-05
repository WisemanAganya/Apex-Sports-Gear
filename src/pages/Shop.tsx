import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/home/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, X, ChevronDown, LayoutGrid, List } from 'lucide-react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'low' | 'high' | 'newest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    const search = searchParams.get('search');
    const cat = searchParams.get('category');
    if (search) setSearchQuery(search);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredProducts = MOCK_PRODUCTS
    .filter(p => !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase())
    .filter(p => !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => selectedSizes.length === 0 || (p.sizing && selectedSizes.some(s => p.sizing?.includes(s))))
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="bg-white pt-10 pb-24">
      {/* Page Header */}
      <div className="bg-gray-50 py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">The Collection</h1>
          <nav className="flex justify-center items-center space-x-2 text-[10px] uppercase tracking-widest font-bold">
            <Link to="/" className="text-gray-400 hover:text-black">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-black">Shop</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-32 space-y-12">
              
              {/* Search */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6 flex justify-between items-center">
                  Search
                  <ChevronDown className="h-3 w-3" />
                </h4>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..."
                    className="w-full bg-gray-50 border-none px-4 py-3 text-xs focus:ring-1 focus:ring-black outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6">Categories</h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className={`block text-xs uppercase tracking-widest hover:text-accent transition-colors ${!selectedCategory ? 'text-black font-bold' : 'text-gray-400'}`}
                  >
                    All Items
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`block text-xs uppercase tracking-widest hover:text-accent transition-colors ${selectedCategory === cat.name ? 'text-black font-bold' : 'text-gray-400'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6">Price Range</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-black mb-4"
                />
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>$0</span>
                  <span>Up to ${priceRange[1]}</span>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-6">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 border text-[10px] font-bold flex items-center justify-center transition-all ${selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-400 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear All */}
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setPriceRange([0, 500]);
                  setSelectedSizes([]);
                }}
                className="w-full border border-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:w-3/4">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 pb-6 border-b border-gray-100 gap-6">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Showing {filteredProducts.length} of {MOCK_PRODUCTS.length} products
                </p>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <LayoutGrid className="h-4 w-4 cursor-pointer" />
                  <List className="h-4 w-4 cursor-pointer text-gray-300" />
                </div>
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="text-[10px] font-bold uppercase tracking-widest border-none bg-transparent focus:ring-0 outline-none cursor-pointer"
                >
                  <option value="newest">Sort By: Newest</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-gray-400 font-serif italic text-2xl">No products found for this selection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
