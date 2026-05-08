import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Users, Zap } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';

export default function About() {
  const stats = [
    { label: 'Founded', value: '2018' },
    { label: 'Active Athletes', value: '50K+' },
    { label: 'Store Locations', value: '12' },
    { label: 'Premium Products', value: '500+' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920" 
          alt="About Hero" 
          className="absolute inset-0 w-full h-full opacity-50 grayscale"
        />
        <div className="relative z-10 text-center text-white px-6">
           <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Our Journey</p>
           <h1 className="text-5xl md:text-7xl font-serif italic mb-6">Born for Performance</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
             <div className="lg:w-1/2">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-6">The APEX Story</p>
                <h2 className="text-4xl font-serif italic mb-8">Redefining the standard of athletic gear since 2018.</h2>
                <div className="space-y-6 text-gray-500 text-sm leading-relaxed">
                   <p>
                      Apex Sports & Gear was founded with a simple mission: to provide athletes with equipment that matches their ambition. We believe that premium performance shouldn't come at the cost of style, and style shouldn't sacrifice functionality.
                   </p>
                   <p>
                      What started as a small collection of specialized gym apparel in Nairobi has grown into a global movement of professionals and enthusiasts who demand more from their gear.
                   </p>
                </div>
             </div>
             <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                   <OptimizedImage src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Athletic performance" className="w-full h-full" />
                </div>
                <div className="aspect-[3/4] bg-gray-50 overflow-hidden mt-12">
                   <OptimizedImage src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800" alt="Gym training" className="w-full h-full" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
           <div className="text-center mb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">Core Principles</p>
              <h2 className="text-4xl font-serif italic">What We Stand For</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Shield, title: 'Quality First', desc: 'Every product undergoes rigorous stress testing in real-world athletic conditions.' },
                { icon: Zap, title: 'Innovation', desc: 'We utilize the latest in fabric technology and ergonomic design to give you the edge.' },
                { icon: Target, title: 'Precision', desc: 'Detailed craftsmanship in every stitch, ensuring longevity and comfort.' },
                { icon: Users, title: 'Community', desc: 'Supporting athletes at every level, from beginners to world-class champions.' },
              ].map((val, i) => (
                <div key={i} className="text-center p-8 bg-white shadow-sm border border-gray-100">
                   <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-6">
                      <val.icon className="h-5 w-5" />
                   </div>
                   <h4 className="text-[11px] uppercase tracking-widest font-bold mb-4">{val.title}</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {stats.map((s, i) => (
                <div key={i}>
                   <h3 className="text-5xl font-serif italic mb-2">{s.value}</h3>
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">{s.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
