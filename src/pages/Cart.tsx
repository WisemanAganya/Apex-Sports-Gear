import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-24 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="h-10 w-10 text-gray-300" />
          </div>
          <h1 className="text-4xl font-serif italic mb-6">Your bag is empty</h1>
          <p className="text-gray-400 text-sm mb-12 uppercase tracking-widest">Looks like you haven't added anything to your bag yet.</p>
          <Link to="/shop" className="btn-fashion px-12 py-5">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = state.total;
  const shipping = subtotal > 150 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="bg-white pt-10 pb-24">
      {/* Page Header */}
      <div className="bg-gray-50 py-16 mb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Shopping Bag</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
            {state.items.length} {state.items.length === 1 ? 'Item' : 'Items'} in your bag
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="hidden md:grid grid-cols-6 pb-6 border-b border-gray-100 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <div className="col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {state.items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 grid grid-cols-1 md:grid-cols-6 items-center gap-8 group"
                  >
                    <div className="col-span-3 flex items-center space-x-8">
                      <div className="w-28 h-36 bg-gray-50 flex-shrink-0 overflow-hidden rounded-lg relative">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <Link to={`/product/${item.id}`} className="text-base font-bold uppercase tracking-tight hover:text-accent transition-colors block mb-2">{item.name}</Link>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                          <span className="w-2 h-2 bg-accent rounded-full mr-2" />
                          Category: {item.category}
                        </p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] uppercase tracking-widest font-black text-gray-300 hover:text-red-500 flex items-center space-x-2 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove Item</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Unit Price</p>
                      <div className="text-sm font-black">${item.price.toFixed(2)}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Quantity</p>
                      <div className="flex items-center border-2 border-gray-100 rounded-full overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-400 hover:bg-gray-100 hover:text-black transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-400 hover:bg-gray-100 hover:text-black transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Total</p>
                      <div className="text-base font-black text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 p-6 bg-gray-50 rounded-xl">
               <Link to="/shop" className="text-[11px] uppercase tracking-[0.2em] font-bold border-b-2 border-black pb-1 hover:text-accent hover:border-accent transition-all">
                 ← Continue Shopping
               </Link>
               <button 
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-red-600 transition-all"
               >
                 Clear Shopping Bag
               </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 lg:p-12 sticky top-32">
               <h3 className="text-2xl font-serif italic mb-8">Order Summary</h3>
               
               <div className="space-y-6 pb-8 border-b border-gray-200 mb-8">
                  <div className="flex justify-between text-xs uppercase tracking-widest font-medium">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-widest font-medium">
                    <span className="text-gray-400">Shipping</span>
                    <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
                      Free shipping on orders over $150. Add ${(150 - subtotal).toFixed(2)} more to qualify.
                    </p>
                  )}
               </div>

               <div className="flex justify-between items-center mb-10">
                  <span className="text-sm uppercase tracking-[0.2em] font-bold">Total</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)}</span>
               </div>

               <Link to="/checkout" className="btn-fashion w-full flex items-center justify-center space-x-3 py-5 group">
                  <span>Secure Checkout</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
               </Link>

               <div className="mt-8 space-y-4">
                  <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest">Complimentary returns on all orders</p>
                  <div className="flex justify-center space-x-4 grayscale opacity-30">
                     <span className="text-[10px] font-bold italic">VISA</span>
                     <span className="text-[10px] font-bold italic">MASTERCARD</span>
                     <span className="text-[10px] font-bold italic">MPESA</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
