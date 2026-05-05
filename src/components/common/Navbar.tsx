import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search, Heart, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const navigate = useNavigate();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cartState.items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistState.items.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Apparel', path: '/apparel' },
    { name: 'Footwear', path: '/footwear' },
    { name: 'Equipment', path: '/shop?category=Equipment' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 text-center text-[10px] uppercase tracking-[0.2em] font-medium">
        Free shipping on orders over $150. Shop now.
      </div>

      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.slice(0, 4).map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-[11px] uppercase tracking-widest font-bold hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.3em] uppercase leading-none">Apex</span>
              <span className="text-[8px] tracking-[0.5em] uppercase mt-1 font-bold">Sports & Gear</span>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={() => setShowSearch(true)}
                className="p-2 hover:text-accent transition-colors hidden sm:block"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <Link to="/profile" className="p-2 hover:text-accent transition-colors hidden sm:block">
                <User className="h-5 w-5" />
              </Link>

              <Link to="/wishlist" className="p-2 hover:text-accent transition-colors relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[8px] h-3.5 w-3.5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="p-2 hover:text-accent transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[8px] h-3.5 w-3.5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Secondary Nav (Desktop) */}
          <div className="hidden lg:flex justify-center mt-4 border-t border-gray-100 pt-4 space-x-10">
             {navLinks.slice(4).map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-[10px] uppercase tracking-widest font-medium text-gray-500 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
          </div>
        </div>
      </nav>

      {/* Full Screen Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setShowSearch(false)}
              className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform duration-300"
            >
              <X className="h-8 w-8" />
            </button>
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="SEARCH FOR PRODUCTS..."
                className="w-full bg-transparent border-b-2 border-black py-4 text-2xl md:text-4xl font-serif focus:outline-none placeholder:text-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <p className="mt-4 text-xs text-gray-400 uppercase tracking-widest">Press enter to search or esc to close</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-full max-w-[300px] bg-white p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-xl tracking-widest uppercase">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] font-bold border-b border-gray-100 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 flex flex-col space-y-4">
                 <Link to="/profile" className="flex items-center space-x-4 text-sm font-medium">
                   <User className="h-5 w-5" />
                   <span>My Account</span>
                 </Link>
                 <Link to="/wishlist" className="flex items-center space-x-4 text-sm font-medium">
                   <Heart className="h-5 w-5" />
                   <span>Wishlist</span>
                 </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
