import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/home/ProductCard';
import { MOCK_PRODUCTS, FOOTWEAR_SIZING } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Ruler, ChevronDown } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';

export default function Footwear() {
  const footwearProducts = MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === 'footwear');
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'low' | 'high' | 'newest'>('newest');
  const [showSizeChart, setShowSizeChart] = useState(false);

  const subcategories = Array.from(new Set(footwearProducts.map(p => p.subcategory))).filter(Boolean);

  const filtered = footwearProducts
    .filter(p => !selectedSub || p.subcategory === selectedSub)
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-white pt-10 pb-24">
      <div className="bg-[#0f0f0f] py-24 mb-12 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-20">
           <OptimizedImage src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1920" className="w-full h-full" alt="Footwear Background" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4">Apex Elite</p>
          <h1 className="text-6xl md:text-8xl font-serif italic mb-8">Elite Footwear</h1>
          <nav className="flex justify-center items-center space-x-2 text-[10px] uppercase tracking-widest font-black">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">Footwear</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-12">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-black mb-8 border-b border-black pb-2">Footwear Types</h4>
                <div className="space-y-4">
                  <button 
                    onClick={() => setSelectedSub(null)}
                    className={`block text-[11px] uppercase tracking-[0.2em] transition-all ${!selectedSub ? 'text-black font-black translate-x-2' : 'text-gray-400 hover:text-black'}`}
                  >
                    All Performance
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

              <div className="p-8 border-2 border-black rounded-2xl">
                 <div className="flex items-center space-x-3 mb-4">
                    <Ruler className="h-5 w-5" />
                    <h5 className="font-serif italic text-xl">Sizing Guide</h5>
                 </div>
                 <p className="text-[10px] uppercase tracking-widest leading-relaxed mb-6 opacity-70">Find your perfect fit with our comprehensive footwear sizing standards.</p>
                 <button 
                  onClick={() => setShowSizeChart(true)}
                  className="w-full py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all"
                 >
                   Open Chart
                 </button>
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-16 pb-8 border-b border-gray-100">
               <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                  {filtered.length} Technical Models found
               </p>
               <div className="flex items-center space-x-8">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="text-[10px] font-black uppercase tracking-widest border-none bg-transparent focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="newest">Featured First</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
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

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl p-12 rounded-3xl relative"
            >
              <button 
                onClick={() => setShowSizeChart(false)}
                className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
              <h2 className="text-4xl font-serif italic mb-8">Footwear Sizing Chart</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-black text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="py-4">US Size</th>
                      <th className="py-4">EU Size</th>
                      <th className="py-4">CM Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {FOOTWEAR_SIZING.map(s => (
                      <tr key={s.size} className="text-xs">
                        <td className="py-4 font-black">{s.size}</td>
                        <td className="py-4 text-gray-500">{s.eu}</td>
                        <td className="py-4 text-gray-500">{s.cm} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
