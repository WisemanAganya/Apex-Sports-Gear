import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Evolution of High-Performance Footwear',
    excerpt: 'Discover how modern technology is reshaping the way we think about running shoes and athletic support.',
    date: 'May 12, 2026',
    author: 'Admin',
    category: 'Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: '5 Essential Gym Accessories for Every Athlete',
    excerpt: 'From grip pads to heavy-duty bags, these are the items you shouldn\'t leave home without.',
    date: 'May 10, 2026',
    author: 'Sarah J.',
    category: 'Guide',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Nairobi\'s Growing Fitness Culture',
    excerpt: 'Exploring the vibrant community of athletes pushing boundaries in the heart of Kenya.',
    date: 'May 08, 2026',
    author: 'David K.',
    category: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Sustainable Materials in Sports Gear',
    excerpt: 'Why we are shifting towards eco-friendly fabrics without compromising on performance.',
    date: 'May 05, 2026',
    author: 'Admin',
    category: 'Sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Blog() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-4">The Journal</h1>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Stories of Sport, Style, and Ambition</p>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="group">
              <div className="aspect-[16/9] overflow-hidden bg-gray-50 mb-8 relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                   <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                   </div>
                   <div className="flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                   </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-serif italic group-hover:text-accent transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
                
                <Link to={`/blog/${post.id}`} className="inline-flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-accent hover:border-accent transition-all group/btn">
                  <span>Read Full Story</span>
                  <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-20 flex justify-center space-x-4">
           <button className="w-12 h-12 flex items-center justify-center border-2 border-black bg-black text-white text-xs font-bold transition-all">1</button>
           <button className="w-12 h-12 flex items-center justify-center border border-gray-100 hover:border-black text-xs font-bold transition-all">2</button>
           <button className="w-12 h-12 flex items-center justify-center border border-gray-100 hover:border-black text-xs font-bold transition-all">3</button>
        </div>
      </div>
    </div>
  );
}
