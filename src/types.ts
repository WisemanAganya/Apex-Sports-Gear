export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Apparel' | 'Footwear' | 'Equipment' | 'Accessories' | 'Memorabilia' | 'Bags';
  subcategory: string;
  imageUrl: string;
  material?: string;
  sizing?: string;
  stock: number;
  featured?: boolean;
  cost?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  address?: string;
  orderHistory?: string[];
  role?: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  paymentId?: string;
}

export interface Content {
  id: string;
  type: 'hero' | 'about' | 'contact' | 'footer';
  title?: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  type: 'sales' | 'inventory' | 'user';
  data: any;
  generatedAt: string;
}
