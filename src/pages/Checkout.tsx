import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, CreditCard, ShieldCheck, Smartphone, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

export default function Checkout() {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('card');
  const [mpesaOption, setMpesaOption] = useState<'stkpush' | 'paybill' | 'buygoods'>('stkpush');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [tillNumber, setTillNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    country: 'Kenya',
    zipCode: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-24 px-6 text-center">
        <h2 className="text-4xl font-serif italic mb-6">Your bag is empty</h2>
        <p className="text-gray-400 mb-12 uppercase tracking-widest text-xs">Equip yourself with the best gear to get started.</p>
        <Link to="/shop" className="btn-fashion px-12 py-5">Start Shopping</Link>
      </div>
    );
  }

  const handlePayment = async () => {
    setProcessing(true);

    try {
      // Create order
      const orderData: Omit<Order, 'id'> = {
        userId: user?.uid || 'guest',
        items: state.items,
        total: state.total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`,
        paymentMethod: paymentMethod === 'mpesa' ? `M-Pesa (${mpesaOption})` : 'Credit Card',
      };

      // Simulating order placement (since supabase might not be configured)
      console.log('Order Data:', orderData);

      if (paymentMethod === 'mpesa') {
        let paymentData: any = { amount: state.total, orderId: 'TEMP_ID' };
        if (mpesaOption === 'stkpush') paymentData.phoneNumber = phoneNumber;
        else if (mpesaOption === 'paybill') paymentData.accountNumber = accountNumber;
        else paymentData.tillNumber = tillNumber;

        // Simulate API call to backend
        const response = await fetch(`http://localhost:3001/api/mpesa/${mpesaOption}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData),
        }).catch(err => ({ ok: false, json: () => Promise.resolve({ error: 'Server not running' }) }));

        const result = await (response as any).json();

        if (result.success || result.error === 'Server not running') {
          if (result.error === 'Server not running') {
             alert('Demo: M-Pesa request simulated. In production, this would trigger an STK push.');
          }
          setOrderPlaced(true);
          dispatch({ type: 'CLEAR_CART' });
        }
      } else {
        // Card mock
        setTimeout(() => {
          setOrderPlaced(true);
          dispatch({ type: 'CLEAR_CART' });
        }, 1500);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Order placement failed. Please try again.');
    } finally {
      if (paymentMethod === 'card') setProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white pt-40 pb-24 px-6 text-center">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
           <Check className="h-10 w-10" />
        </div>
        <h2 className="text-4xl font-serif italic mb-6">Order Placed Successfully!</h2>
        <p className="text-gray-400 mb-12 uppercase tracking-widest text-xs max-w-md mx-auto leading-relaxed">
          Thank you for your purchase. We've sent a confirmation email to {shippingInfo.email}. Your gear will be on its way soon.
        </p>
        <Link to="/shop" className="btn-fashion px-12 py-5">Continue Shopping</Link>
      </div>
    );
  }

  const subtotal = state.total;
  const shipping = subtotal > 150 ? 0 : 25;
  const total = subtotal + shipping;

  const steps = ['Shipping', 'Payment', 'Review'];

  return (
    <div className="bg-white pt-10 pb-24">
      {/* Breadcrumbs / Steps */}
      <div className="bg-gray-50 py-20 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center relative z-10">
           <h1 className="text-6xl font-serif italic mb-12">Secure Checkout</h1>
           <div className="flex justify-center items-center space-x-6 md:space-x-12">
              {steps.map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${step > i + 1 ? 'bg-black text-white' : step === i + 1 ? 'border-2 border-black text-black scale-110 shadow-lg' : 'border border-gray-200 text-gray-300'}`}>
                       {step > i + 1 ? <Check className="h-5 w-5" /> : i + 1}
                    </div>
                    <span className={`text-[10px] uppercase tracking-[0.3em] font-black ${step >= i + 1 ? 'text-black' : 'text-gray-300'}`}>{s}</span>
                  </div>
                  {i < steps.length - 1 && <div className={`w-12 h-[2px] mb-6 transition-colors duration-500 ${step > i + 1 ? 'bg-black' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-serif italic mb-8">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">First Name</label>
                      <input name="firstName" value={shippingInfo.firstName} onChange={handleInputChange} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Last Name</label>
                      <input name="lastName" value={shippingInfo.lastName} onChange={handleInputChange} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Email Address</label>
                      <input name="email" type="email" value={shippingInfo.email} onChange={handleInputChange} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Street Address</label>
                      <input name="address" value={shippingInfo.address} onChange={handleInputChange} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">City</label>
                      <input name="city" value={shippingInfo.city} onChange={handleInputChange} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Zip / Postal Code</label>
                      <input name="zipCode" value={shippingInfo.zipCode} onChange={handleInputChange} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="btn-fashion w-full py-5 flex items-center justify-center space-x-3 mt-8">
                    <span>Continue to Payment</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <button onClick={() => setStep(1)} className="flex items-center space-x-2 text-gray-400 hover:text-black transition-colors mb-6 uppercase text-[10px] font-bold tracking-widest">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Shipping</span>
                  </button>
                  <h3 className="text-2xl font-serif italic mb-8">Payment Method</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`group p-8 border-2 flex flex-col items-center gap-6 transition-all duration-300 rounded-2xl ${paymentMethod === 'card' ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-gray-100 hover:border-gray-300 bg-white'}`}
                    >
                      <div className={`p-4 rounded-full transition-colors ${paymentMethod === 'card' ? 'bg-white/10' : 'bg-gray-50'}`}>
                        <CreditCard className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <span className="text-xs uppercase tracking-[0.2em] font-black block mb-1">Credit Card</span>
                        <span className={`text-[9px] uppercase tracking-widest ${paymentMethod === 'card' ? 'text-gray-400' : 'text-gray-400'}`}>Visa, Mastercard, Amex</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`group p-8 border-2 flex flex-col items-center gap-6 transition-all duration-300 rounded-2xl ${paymentMethod === 'mpesa' ? 'border-black bg-black text-white shadow-2xl scale-[1.02]' : 'border-gray-100 hover:border-gray-300 bg-white'}`}
                    >
                      <div className={`p-4 rounded-full transition-colors ${paymentMethod === 'mpesa' ? 'bg-white/10' : 'bg-gray-50'}`}>
                        <Smartphone className="h-8 w-8" />
                      </div>
                      <div className="text-center">
                        <span className="text-xs uppercase tracking-[0.2em] font-black block mb-1">M-Pesa</span>
                        <span className={`text-[9px] uppercase tracking-widest ${paymentMethod === 'mpesa' ? 'text-gray-400' : 'text-gray-400'}`}>Lipa na M-Pesa Online</span>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'mpesa' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                       <div className="flex gap-4">
                          {['stkpush', 'paybill', 'buygoods'].map(opt => (
                            <button 
                              key={opt}
                              onClick={() => setMpesaOption(opt as any)}
                              className={`flex-1 py-3 text-[9px] font-bold uppercase tracking-widest border ${mpesaOption === opt ? 'bg-black text-white border-black' : 'border-gray-200'}`}
                            >
                              {opt === 'stkpush' ? 'STK Push' : opt === 'paybill' ? 'PayBill' : 'Buy Goods'}
                            </button>
                          ))}
                       </div>
                       {mpesaOption === 'stkpush' && (
                         <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">M-Pesa Phone Number</label>
                            <input placeholder="254XXXXXXXXX" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" />
                         </div>
                       )}
                       {mpesaOption === 'paybill' && (
                         <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">M-Pesa Account Number</label>
                            <input placeholder="Account name/number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" />
                         </div>
                       )}
                       {mpesaOption === 'buygoods' && (
                         <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">M-Pesa Till Number</label>
                            <input placeholder="Till number" value={tillNumber} onChange={e => setTillNumber(e.target.value)} className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" />
                         </div>
                       )}
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="col-span-2">
                             <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Card Number</label>
                             <input placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" />
                           </div>
                           <div>
                             <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">Expiry Date</label>
                             <input placeholder="MM/YY" className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" />
                           </div>
                           <div>
                             <label className="text-[10px] uppercase tracking-widest font-bold mb-2 block">CVV</label>
                             <input placeholder="123" className="w-full bg-gray-50 border-none px-4 py-4 text-xs focus:ring-1 focus:ring-black outline-none" />
                           </div>
                        </div>
                     </div>
                  )}

                  <button onClick={() => setStep(3)} className="btn-fashion w-full py-5 flex items-center justify-center space-x-3 mt-8">
                    <span>Review Order</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <button onClick={() => setStep(2)} className="flex items-center space-x-2 text-gray-400 hover:text-black transition-colors mb-6 uppercase text-[10px] font-bold tracking-widest">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Payment</span>
                  </button>
                  <h3 className="text-2xl font-serif italic mb-8">Review Your Order</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-gray-100">
                     <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-bold mb-4 border-b border-black pb-2 inline-block">Shipping Address</h4>
                        <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">
                           {shippingInfo.firstName} {shippingInfo.lastName}<br />
                           {shippingInfo.address}<br />
                           {shippingInfo.city}, {shippingInfo.country}<br />
                           {shippingInfo.email}
                        </p>
                     </div>
                     <div>
                        <h4 className="text-[11px] uppercase tracking-widest font-bold mb-4 border-b border-black pb-2 inline-block">Payment Method</h4>
                        <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">
                           {paymentMethod === 'mpesa' ? `M-PESA (${mpesaOption.toUpperCase()})` : 'CREDIT CARD (VISA/MASTERCARD)'}<br />
                           {paymentMethod === 'mpesa' && (phoneNumber || accountNumber || tillNumber)}
                        </p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h4 className="text-[11px] uppercase tracking-widest font-bold">Order Items</h4>
                     {state.items.map(item => (
                       <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50">
                          <div className="flex items-center space-x-4">
                             <div className="w-12 h-16 bg-gray-50 overflow-hidden">
                                <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />
                             </div>
                             <div>
                                <h5 className="text-[10px] font-bold uppercase tracking-tight">{item.name}</h5>
                                <p className="text-[9px] text-gray-400">QTY: {item.quantity}</p>
                             </div>
                          </div>
                          <p className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                       </div>
                     ))}
                  </div>

                  <button 
                    onClick={handlePayment} 
                    disabled={processing}
                    className="btn-fashion w-full py-5 flex items-center justify-center space-x-3 mt-12 bg-accent hover:bg-black"
                  >
                    {processing ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        <span>Confirm & Place Order</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 lg:p-12 sticky top-32">
               <h3 className="text-2xl font-serif italic mb-8 text-center">Summary</h3>
               
               <div className="space-y-6 pb-8 border-b border-gray-200 mb-8">
                  <div className="flex justify-between text-xs uppercase tracking-widest font-medium">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-widest font-medium">
                    <span className="text-gray-400">Shipping</span>
                    <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
               </div>

               <div className="flex justify-between items-center mb-8">
                  <span className="text-sm uppercase tracking-[0.2em] font-bold">Total</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)}</span>
               </div>

               <div className="pt-8 border-t border-gray-200">
                  <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest leading-relaxed mb-4">
                     Your order will be processed securely. By placing this order, you agree to our terms and conditions.
                  </p>
                  <div className="flex justify-center items-center space-x-2 text-[8px] font-bold text-gray-300">
                     <ShieldCheck className="h-3 w-3" />
                     <span>SECURE SSL CHECKOUT</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
