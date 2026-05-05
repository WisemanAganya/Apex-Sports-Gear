import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/home/HeroSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductCard from '../components/home/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured);
  const newArrivals = MOCK_PRODUCTS.slice(0, 4);

  const services = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $150' },
    { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure payment' },
    { icon: RefreshCw, title: 'Easy Returns', desc: '30 days return policy' },
    { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team' },
  ];

  return (
    <div className="bg-white">
      <HeroSlider />
      
      {/* Services Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="flex items-center space-x-4 p-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full">
                  <service.icon className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">{service.title}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />
      
      {/* Trending Section */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">Trending Now</p>
              <h2 className="text-4xl md:text-5xl font-serif italic">The Elite Selection</h2>
            </div>
            <Link to="/shop" className="btn-fashion-outline">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Banner */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Banner"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-6">Sustainable Performance</p>
          <h2 className="text-5xl md:text-7xl font-serif italic mb-10 max-w-3xl mx-auto leading-tight">Crafted for the future of sport.</h2>
          <button className="btn-fashion bg-white text-black hover:bg-black hover:text-white px-12">
            Read Our Story
          </button>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">Just Landed</p>
            <h2 className="text-4xl md:text-5xl font-serif italic">New Arrivals</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed / Brands */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-12">Follow Our Journey @APEXSPORTS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="aspect-square bg-gray-100 overflow-hidden relative group cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&q=80&w=600`} 
                    alt="Social" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="text-white h-6 w-6" />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { Instagram } from 'lucide-react';
