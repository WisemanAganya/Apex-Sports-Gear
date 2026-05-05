import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Wishlist() {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const removeFromWishlist = (id: string) => {
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const moveToCart = (product: any) => {
    cartDispatch({ type: 'ADD_ITEM', payload: product });
    removeFromWishlist(product.id);
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-24 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="h-10 w-10 text-gray-300" />
          </div>
          <h1 className="text-4xl font-serif italic mb-6">Your wishlist is empty</h1>
          <p className="text-gray-400 text-sm mb-12 uppercase tracking-widest">Save items you love here to find them later.</p>
          <Link to="/shop" className="btn-fashion px-12 py-5">
            Discover Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-10 pb-24">
      {/* Page Header */}
      <div className="bg-gray-50 py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">My Wishlist</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
            {wishlistState.items.length} {wishlistState.items.length === 1 ? 'Saved Item' : 'Saved Items'}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence>
            {wishlistState.items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-bold">{item.category}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-sm font-medium mb-2 hover:text-accent transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-sm font-bold tracking-widest mb-6">${item.price.toFixed(2)}</p>
                  
                  <button 
                    onClick={() => moveToCart(item)}
                    className="w-full btn-fashion py-4 flex items-center justify-center space-x-3 group"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 text-center">
          <Link to="/shop" className="text-[11px] uppercase tracking-[0.3em] font-bold border-b-2 border-black pb-2 hover:text-gray-400 hover:border-gray-400 transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
