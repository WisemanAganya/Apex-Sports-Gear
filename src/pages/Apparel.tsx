import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/home/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';

export default function Apparel() {
  const apparelProducts = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === 'apparel');
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'low' | 'high' | 'newest'>('newest');

  const subcategories = Array.from(new Set(apparelProducts.map(p => p.subcategory))).filter(Boolean);

  const filtered = apparelProducts
    .filter(p => !selectedSub || p.subcategory === selectedSub)
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-white pt-10 pb-24">
      <div className="bg-gray-50 py-24 mb-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">The Collection</p>
          <h1 className="text-6xl md:text-8xl font-serif italic mb-8">Performance Apparel</h1>
          <nav className="flex justify-center items-center space-x-2 text-[10px] uppercase tracking-widest font-black">
            <Link to="/" className="text-gray-400 hover:text-black transition-colors">Home</Link>
            <span className="text-gray-200">/</span>
            <span className="text-black">Apparel</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-12">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-black mb-8 border-b border-black pb-2">Apparel Categories</h4>
                <div className="space-y-4">
                  <button 
                    onClick={() => setSelectedSub(null)}
                    className={`block text-[11px] uppercase tracking-[0.2em] transition-all ${!selectedSub ? 'text-black font-black translate-x-2' : 'text-gray-400 hover:text-black'}`}
                  >
                    View All
                  </button>
                  {subcategories.map(sub => (
                    <button 
                      key={sub}
                      onClick={() => setSelectedSub(sub)}
                      className={`block text-[11px] uppercase tracking-[0.2em] transition-all ${selectedSub === sub ? 'text-black font-black translate-x-2' : 'text-gray-400 hover:text-black'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-8 bg-black text-white rounded-2xl">
                 <h5 className="font-serif italic text-2xl mb-4">Elite Membership</h5>
                 <p className="text-[10px] uppercase tracking-widest leading-relaxed mb-6 opacity-70">Join our community for exclusive access to drop events and performance tips.</p>
                 <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all">Join Now</button>
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-16 pb-8 border-b border-gray-100">
               <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                  {filtered.length} Elite Products found
               </p>
               <div className="flex items-center space-x-8">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="text-[10px] font-black uppercase tracking-widest border-none bg-transparent focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="low">Price: Ascending</option>
                    <option value="high">Price: Descending</option>
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
