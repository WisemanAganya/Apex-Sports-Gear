import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Share2 } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  const isWishlisted = wishlistState.items.some(item => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartDispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9] mb-6">
        <Link to={`/product/${product.id}`}>
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8 }}
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Floating Icons */}
        <div className="absolute right-4 top-4 flex flex-col space-y-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={toggleWishlist}
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-all ${isWishlisted ? 'text-accent' : 'text-black'}`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-all text-black"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button 
             onClick={addToCart}
             className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-all text-black"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        {/* Labels */}
        {product.featured && (
          <div className="absolute left-0 top-6 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
            Featured
          </div>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute left-0 top-14 bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
            Low Stock
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-bold">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium hover:text-accent transition-colors mb-2">{product.name}</h3>
        </Link>
        <p className="text-sm font-bold tracking-wider">${product.price.toFixed(2)}</p>
      </div>

      {/* Quick Add Button (Bottom Hover) */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <button 
           onClick={addToCart}
           className="w-full border-b border-black text-[10px] font-bold uppercase tracking-[0.2em] py-2 hover:bg-black hover:text-white transition-all"
         >
           Quick Add to Cart
         </button>
      </div>
    </motion.div>
  );
}
