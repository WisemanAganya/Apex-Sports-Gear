import React from 'react';
import { Play } from 'lucide-react';

export default function VideoHero() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">Elite Mechanics</h2>
          <p className="text-gray-500 font-medium">Experience the design and precision behind our performance gear.</p>
        </div>
        
        <div className="relative group aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920"
          >
            {/* Using a high-quality stock video source */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-dark-gym-4860-large.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="p-6 rounded-full bg-white text-black shadow-xl scale-125">
              <Play className="h-8 w-8 fill-current" />
            </div>
          </div>
          
          <div className="absolute bottom-8 left-8 text-left">
            <p className="text-white text-2xl font-black uppercase tracking-tighter">Precision in Motion</p>
            <p className="text-white/60 text-sm">Fall 2026 Collection • Showcase</p>
          </div>
        </div>
      </div>
    </section>
  );
}
