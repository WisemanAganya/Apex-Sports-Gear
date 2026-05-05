import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    shop: [
      { name: 'New Arrivals', path: '/shop?sort=newest' },
      { name: 'Best Sellers', path: '/shop?sort=popular' },
      { name: 'Men\'s Collection', path: '/category/men' },
      { name: 'Women\'s Collection', path: '/category/women' },
      { name: 'Accessories', path: '/category/accessories' },
      { name: 'Sale', path: '/shop?onSale=true' },
    ],
    support: [
      { name: 'Customer Service', path: '/contact' },
      { name: 'Shipping & Returns', path: '/shipping' },
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Track Order', path: '/profile' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    company: [
      { name: 'Our Story', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Sustainability', path: '/sustainability' },
      { name: 'Press', path: '/press' },
      { name: 'Store Locator', path: '/stores' },
    ]
  };

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-gray-100 mb-16">
          <div>
            <h3 className="font-serif text-2xl mb-4">JOIN THE ELITE</h3>
            <p className="text-gray-500 text-sm max-w-md">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals. Plus, get 10% off your first order.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="flex-1 bg-gray-50 border-none px-6 py-4 text-xs tracking-widest focus:ring-1 focus:ring-black outline-none"
              required
            />
            <button type="submit" className="btn-fashion py-4">Subscribe</button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8">
              <span className="font-serif text-3xl tracking-[0.3em] uppercase">Apex</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
              Redefining athletic performance with premium materials and timeless design. Join the movement of athletes who demand more from their gear.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Shop</h4>
            <ul className="space-y-4">
              {footerLinks.shop.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 text-xs hover:text-black transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 text-xs hover:text-black transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 text-xs hover:text-black transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest order-2 md:order-1">
            © 2026 APEX SPORTS & GEAR. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center space-x-6 order-1 md:order-2 grayscale opacity-50">
             <CreditCard className="h-6 w-6" />
             <span className="text-[10px] font-bold tracking-tighter italic">VISA</span>
             <span className="text-[10px] font-bold tracking-tighter italic">MASTERCARD</span>
             <span className="text-[10px] font-bold tracking-tighter italic">MPESA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
