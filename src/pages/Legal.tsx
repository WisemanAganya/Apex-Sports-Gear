import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, Scale, Truck, RotateCcw } from 'lucide-react';

export function FAQ() {
  const faqs = [
    { q: 'What is your shipping policy?', a: 'We offer free standard shipping on all orders over $150. For orders under $150, a flat rate of $25 applies. Delivery typically takes 3-5 business days.' },
    { q: 'How do I return an item?', a: 'You can return any unworn item within 30 days of purchase. Simply visit your profile, select the order, and click "Initiate Return".' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International shipping rates and times vary by location.' },
    { q: 'Are your products sustainable?', a: 'We are committed to sustainability. Currently, 40% of our collection uses recycled materials, and we aim for 100% by 2030.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, AMEX) and M-Pesa (STK Push, PayBill, Buy Goods).' },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="bg-white">
      <div className="bg-gray-50 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-4">FAQ</h1>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Common Questions & Answers</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 pb-4">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex justify-between items-center py-4 text-left group"
              >
                <span className={`text-sm uppercase tracking-widest font-bold transition-colors ${openIdx === i ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>{faq.q}</span>
                {openIdx === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 text-gray-300" />}
              </button>
              {openIdx === i && (
                <div className="pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="bg-white">
      <div className="bg-gray-50 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Privacy Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">How we protect your data</p>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-24 prose prose-sm prose-gray uppercase tracking-wider leading-relaxed">
         <p className="mb-8 font-bold">Effective Date: May 05, 2026</p>
         <h3 className="text-lg font-serif italic mb-6">1. Information We Collect</h3>
         <p className="mb-8">We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This may include your name, email, phone number, and shipping address.</p>
         <h3 className="text-lg font-serif italic mb-6">2. How We Use Information</h3>
         <p className="mb-8">We use your information to process orders, improve our products, and communicate with you about promotions or updates. We do not sell your personal data to third parties.</p>
         <h3 className="text-lg font-serif italic mb-6">3. Security</h3>
         <p className="mb-8">We implement industry-standard security measures, including SSL encryption, to protect your sensitive data during transmission and storage.</p>
      </div>
    </div>
  );
}
