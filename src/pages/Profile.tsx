import React from 'react';
import { motion } from 'motion/react';
import { Package, MapPin, Settings, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  const mockOrders = [
    { id: 'ORD-7721', date: '2026-04-15', total: 165.00, status: 'Delivered', items: 2 },
    { id: 'ORD-8942', date: '2026-03-28', total: 85.00, status: 'Shipped', items: 1 },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-4">
            <div className="bg-white p-8 shadow-sm border border-gray-100 text-center">
              <div className="h-24 w-24 bg-black rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black">
                {user?.email?.[0].toUpperCase() || 'A'}
              </div>
              <h2 className="text-lg font-black uppercase tracking-tighter">{user?.email || 'Elite Athlete'}</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Apex Member since 2026</p>
            </div>

            <nav className="bg-white overflow-hidden shadow-sm border border-gray-100 font-bold uppercase text-[10px] tracking-widest">
              <button className="w-full text-left px-8 py-4 bg-black text-white flex items-center space-x-3">
                <Package className="h-4 w-4" />
                <span>Order History</span>
              </button>
              <button className="w-full text-left px-8 py-4 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b border-gray-50">
                <Heart className="h-4 w-4 text-gray-400" />
                <span>Wishlist</span>
              </button>
              <button className="w-full text-left px-8 py-4 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b border-gray-50">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Addresses</span>
              </button>
              <button className="w-full text-left px-8 py-4 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b border-gray-50">
                <Settings className="h-4 w-4 text-gray-400" />
                <span>Preferences</span>
              </button>
              <button className="w-full text-left px-8 py-4 hover:bg-red-50 text-red-500 flex items-center space-x-3 transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white p-8 shadow-sm border border-gray-100 flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Order History</h3>
              <span className="bg-gray-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">2 Orders</span>
            </div>

            <div className="space-y-6">
              {mockOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{order.id}</p>
                    <p className="text-sm font-black uppercase tracking-tight">Ordered on {order.date}</p>
                    <p className="text-xs text-gray-500">{order.items} {order.items === 1 ? 'Item' : 'Items'}</p>
                  </div>
                  
                  <div className="flex flex-col md:items-end space-y-4">
                    <div className="flex items-center space-x-6">
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-lg font-black tracking-tight">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-70">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
