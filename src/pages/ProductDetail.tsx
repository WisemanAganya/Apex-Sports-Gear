import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/home/ProductCard';
import OptimizedImage from '../components/common/OptimizedImage';
import { Heart, ShoppingCart, Share2, ChevronRight, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Product Not Found</h2>
          <Link to="/shop" className="btn-fashion">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlistState.items.some(item => item.id === product.id);
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.sizing && !selectedSize) {
      alert('Please select a size');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      cartDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="bg-white pt-10 pb-24">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-8 mb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold">
            <Link to="/" className="text-gray-400 hover:text-black">Home</Link>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <Link to="/shop" className="text-gray-400 hover:text-black">Shop</Link>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <span className="text-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* Image Gallery */}
          <div className="lg:w-1/2 flex flex-col md:flex-row gap-4">
             {/* Thumbnails (Simulated) */}
             <div className="md:w-20 order-2 md:order-1 flex md:flex-col gap-4">
                {[0,1,2,3].map(i => (
                  <button 
                    key={i}
                    onClick={() => setMainImage(product.imageUrl)}
                    className={`aspect-square w-full border-2 ${mainImage === product.imageUrl && i === 0 ? 'border-black' : 'border-transparent'} overflow-hidden bg-gray-50`}
                  >
                    <OptimizedImage src={product.imageUrl} alt="Thumbnail" className="w-full h-full" />
                  </button>
                ))}
             </div>
             {/* Main Image */}
             <div className="flex-1 order-1 md:order-2 aspect-[3/4] bg-gray-50 overflow-hidden relative group">
                <OptimizedImage 
                  key={mainImage}
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
             </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
             <div className="mb-8 pb-8 border-b border-gray-100">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-serif italic mb-6">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">(24 Customer Reviews)</span>
                </div>
                <p className="text-2xl font-bold tracking-widest">${product.price.toFixed(2)}</p>
             </div>

             <div className="mb-10">
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {product.description}
                  Designed for peak performance and style, this piece from our latest collection offers unparalleled comfort and durability.
                </p>
                
                {/* Size Selection */}
                <div className="mb-8">
                   <div className="flex justify-between mb-4">
                     <h4 className="text-[11px] uppercase tracking-widest font-bold">Select Size</h4>
                     <button className="text-[10px] uppercase tracking-widest font-bold border-b border-black">Size Guide</button>
                   </div>
                   <div className="flex flex-wrap gap-3">
                      {sizes.map(size => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 border text-xs font-bold flex items-center justify-center transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-400 hover:border-black'}`}
                        >
                          {size}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Color Selection (Simulated) */}
                <div className="mb-10">
                   <h4 className="text-[11px] uppercase tracking-widest font-bold mb-4">Select Color</h4>
                   <div className="flex space-x-3">
                      {['#000000', '#CE1212', '#6C757D'].map(color => (
                        <button 
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                   </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                   <div className="flex items-center border border-gray-200 px-4 py-2">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-gray-400 hover:text-black">-</button>
                      <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-gray-400 hover:text-black">+</button>
                   </div>
                   <button 
                    onClick={handleAddToCart}
                    className="flex-1 btn-fashion flex items-center justify-center space-x-3 py-5"
                   >
                     <ShoppingCart className="h-4 w-4" />
                     <span>Add to Shopping Bag</span>
                   </button>
                   <button 
                    onClick={toggleWishlist}
                    className={`w-14 h-14 border flex items-center justify-center transition-all ${isWishlisted ? 'bg-accent border-accent text-white' : 'border-gray-200 text-black hover:border-black'}`}
                   >
                     <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                   </button>
                </div>

                {/* Extra Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                   <div className="flex items-center space-x-3">
                      <Truck className="h-5 w-5 text-gray-400" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Free Shipping</span>
                   </div>
                   <div className="flex items-center space-x-3">
                      <ShieldCheck className="h-5 w-5 text-gray-400" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">2 Year Warranty</span>
                   </div>
                   <div className="flex items-center space-x-3">
                      <RefreshCw className="h-5 w-5 text-gray-400" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">30 Days Return</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-24">
           <div className="flex justify-center border-b border-gray-100 mb-12">
              {['description', 'additional', 'reviews'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-10 py-6 text-[11px] uppercase tracking-[0.3em] font-bold transition-all relative ${activeTab === tab ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                </button>
              ))}
           </div>
           
           <div className="max-w-4xl mx-auto">
              {activeTab === 'description' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <h3 className="text-2xl font-serif italic mb-6">Uncompromising Quality</h3>
                   <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      Every stitch and seam is engineered with the athlete in mind. Our proprietary materials provide moisture-wicking technology while maintaining a soft, natural feel against the skin. 
                   </p>
                   <ul className="space-y-4">
                      {['Premium lightweight fabric', 'Ergonomic fit for maximum movement', 'Breathable mesh zones', 'Reflective details for visibility'].map((feat, i) => (
                        <li key={i} className="flex items-center space-x-4 text-xs uppercase tracking-widest font-medium text-gray-500">
                           <div className="w-1 h-1 bg-black rounded-full" />
                           <span>{feat}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              )}
           </div>
        </div>

        {/* Related Products */}
        <section>
          <div className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">Complete the Look</p>
            <h2 className="text-4xl font-serif italic">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
