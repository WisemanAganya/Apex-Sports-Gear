import { Product } from './types';

export const CATEGORIES = [
  { 
    id: 'apparel', 
    name: 'Apparel', 
    icon: 'Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    id: 'footwear', 
    name: 'Footwear', 
    icon: 'Footprints',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    id: 'equipment', 
    name: 'Equipment', 
    icon: 'Dumbbell',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    icon: 'ShoppingBag',
    imageUrl: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    id: 'bags', 
    name: 'Bags', 
    icon: 'Backpack',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    id: 'memorabilia', 
    name: 'Trophies', 
    icon: 'Trophy',
    imageUrl: 'https://images.unsplash.com/photo-1579913741637-33610996c141?auto=format&fit=crop&q=80&w=1200' 
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pro Performance Compression Tee',
    description: 'Highly breathable, sweat-wicking fabric for intense gym sessions.',
    price: 45,
    category: 'Apparel',
    subcategory: 'Gym Clothes',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    material: '88% Polyester, 12% Spandex',
    stock: 100,
    featured: true,
  },
  {
    id: '2',
    name: 'Apex Speed Running Shoes',
    description: 'Lightweight cushioning for maximum energy return and speed.',
    price: 120,
    category: 'Footwear',
    subcategory: 'Sports Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    material: 'Engineered Mesh Upper, Rubber Sole',
    sizing: 'True to size. Available in US 7-13.',
    stock: 50,
    featured: true,
  },
  {
    id: '3',
    name: 'Elite Cast Iron Dumbbell Set',
    description: 'Versatile dumbbells for strength training at home or in the gym.',
    price: 85,
    category: 'Equipment',
    subcategory: 'Gym Essentials',
    imageUrl: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&q=80&w=800',
    stock: 30,
    featured: true,
  },
  {
    id: '4',
    name: 'Vanguard Expedition Backpack',
    description: 'Large capacity camping bag with waterproof coating.',
    price: 150,
    category: 'Bags',
    subcategory: 'Camping Gear',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    material: '600D Oxford Fabric',
    stock: 25,
  },
  {
    id: '5',
    name: 'Champions Gold Trophy',
    description: 'Premium metallic trophy for sports tournaments and awards.',
    price: 75,
    category: 'Memorabilia',
    subcategory: 'Trophies',
    imageUrl: 'https://images.unsplash.com/photo-1579913741637-33610996c141?auto=format&fit=crop&q=80&w=800',
    stock: 15,
  }
];

export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920',
];

export const SOCIAL_IMAGES = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=600',
];

export const FOOTWEAR_SIZING = [
  { size: 'US 7', eu: '40', cm: '25' },
  { size: 'US 8', eu: '41', cm: '26' },
  { size: 'US 9', eu: '42', cm: '27' },
  { size: 'US 10', eu: '43', cm: '28' },
  { size: 'US 11', eu: '44', cm: '29' },
  { size: 'US 12', eu: '45', cm: '30' },
];
