import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '../../constants';

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">Explore Our World</p>
          <h2 className="text-4xl md:text-5xl font-serif italic">The Collections</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className={`group relative overflow-hidden h-[500px] ${
                idx === 0 || idx === 3 ? 'lg:col-span-1' : ''
              }`}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="h-full w-full"
              >
                <img 
                  src={(cat as any).imageUrl} 
                  alt={cat.name} 
                  className="h-full w-full object-cover"
                />
              </motion.div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Shop Now
                </p>
                <h3 className="text-3xl font-serif italic mb-4">{cat.name}</h3>
                <div className="w-12 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>

              {/* Border Detail */}
              <div className="absolute inset-6 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
