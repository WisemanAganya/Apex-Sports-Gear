import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_IMAGES } from '../../constants';

const HERO_CONTENT = [
  {
    title: 'THE NEW STANDARD',
    subtitle: 'Fall/Winter Collection 2026',
    description: 'Experience the perfect blend of high-fashion and elite performance gear.',
    btnText: 'Discover Collection',
    link: '/shop?collection=winter'
  },
  {
    title: 'PEAK PERFORMANCE',
    subtitle: 'Elite Footwear Series',
    description: 'Precision engineered for athletes who demand the absolute best.',
    btnText: 'Shop Footwear',
    link: '/category/footwear'
  },
  {
    title: 'URBAN EXPLORER',
    subtitle: 'Limited Edition Bags',
    description: 'Carry your ambition with our waterproof, durable expedition series.',
    btnText: 'Explore Gear',
    link: '/category/bags'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-gray-50">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image with Zoom Animation */}
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
            src={HERO_IMAGES[current]}
            alt={`Hero ${current + 1}`}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="max-w-4xl">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-[10px] md:text-xs text-white font-bold uppercase tracking-[0.5em] mb-4"
              >
                {HERO_CONTENT[current].subtitle}
              </motion.p>
              
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-5xl md:text-8xl font-serif text-white italic mb-6 leading-tight"
              >
                {HERO_CONTENT[current].title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-sm md:text-base text-white/90 max-w-xl mx-auto mb-10 font-light"
              >
                {HERO_CONTENT[current].description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <button className="btn-fashion bg-white text-black hover:bg-black hover:text-white px-12 py-5 text-sm">
                  {HERO_CONTENT[current].btnText}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-12 right-12 flex space-x-4 z-10">
        <button
          onClick={prev}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-12 flex flex-col space-y-4 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1 transition-all duration-700 ${current === i ? 'h-12 bg-white' : 'h-4 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
