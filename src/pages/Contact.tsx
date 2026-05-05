import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Contact Us</h1>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">We'd love to hear from you</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Info */}
          <div className="lg:w-1/3 space-y-12">
             <div>
                <h3 className="text-2xl font-serif italic mb-8">Get In Touch</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                   Whether you have a question about our products, shipping, or anything else, our team is ready to answer all your questions.
                </p>
             </div>

             <div className="space-y-8">
                <div className="flex items-start space-x-6">
                   <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full flex-shrink-0">
                      <MapPin className="h-4 w-4" />
                   </div>
                   <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Our HQ</h4>
                      <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-wider">
                         Apex Tower, 88 Performance Dr<br />
                         Nairobi, Kenya
                      </p>
                   </div>
                </div>

                <div className="flex items-start space-x-6">
                   <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full flex-shrink-0">
                      <Mail className="h-4 w-4" />
                   </div>
                   <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Email Us</h4>
                      <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-wider">
                         support@apexsports.com<br />
                         sales@apexsports.com
                      </p>
                   </div>
                </div>

                <div className="flex items-start space-x-6">
                   <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full flex-shrink-0">
                      <Phone className="h-4 w-4" />
                   </div>
                   <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Call Us</h4>
                      <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-wider">
                         +254 700 000 000<br />
                         Mon - Fri: 9:00 AM - 6:00 PM
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 bg-gray-50 p-8 md:p-16">
             <h3 className="text-2xl font-serif italic mb-10">Send a Message</h3>
             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">Full Name</label>
                      <input type="text" placeholder="Your Name" className="w-full bg-white border-none px-6 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                   </div>
                   <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">Email Address</label>
                      <input type="email" placeholder="Your Email" className="w-full bg-white border-none px-6 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                   </div>
                   <div className="md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">Subject</label>
                      <input type="text" placeholder="Topic of conversation" className="w-full bg-white border-none px-6 py-4 text-xs focus:ring-1 focus:ring-black outline-none" required />
                   </div>
                   <div className="md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block">Message</label>
                      <textarea rows={6} placeholder="Tell us more about how we can help..." className="w-full bg-white border-none px-6 py-4 text-xs focus:ring-1 focus:ring-black outline-none resize-none" required />
                   </div>
                </div>
                <button type="submit" className="btn-fashion w-full py-5 flex items-center justify-center space-x-3 group">
                   <span>Send Message</span>
                   <Send className="h-4 w-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
             </form>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-gray-100 relative overflow-hidden grayscale brightness-75">
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
               <MapPin className="h-12 w-12 text-black mx-auto mb-4" />
               <p className="text-[10px] uppercase tracking-widest font-bold">Map Integration Point</p>
            </div>
         </div>
      </section>
    </div>
  );
}
