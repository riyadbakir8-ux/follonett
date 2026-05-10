// app/shop/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  ChevronDownIcon, 
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  alt: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Oversized Black Logo Tee',
    price: 89,
    category: 'Oversized T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000',
    alt: 'Oversized black logo t-shirt'
  },
  {
    id: 2,
    name: 'Oversized Graphic Tee',
    price: 95,
    category: 'Oversized T-Shirts',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000',
    alt: 'Oversized graphic print t-shirt'
  },
  {
    id: 3,
    name: 'Premium White Tee',
    price: 85,
    category: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000',
    alt: 'Premium white t-shirt'
  },
  {
    id: 4,
    name: 'Black Oversized Hoodie',
    price: 165,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1000',
    alt: 'Black oversized hoodie'
  },
  {
    id: 5,
    name: 'Grey Premium Hoodie',
    price: 175,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000',
    alt: 'Grey premium hoodie'
  },
  {
    id: 6,
    name: 'Classic Black Sweatshirt',
    price: 120,
    category: 'Sweatshirts',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000',
    alt: 'Classic black sweatshirt'
  },
  {
    id: 7,
    name: 'Oversized Streetwear Sweatshirt',
    price: 135,
    category: 'Sweatshirts',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000',
    alt: 'Oversized streetwear sweatshirt'
  },
  {
    id: 8,
    name: 'Kids Oversized Tee',
    price: 65,
    category: 'Kids T-Shirts',
    image: 'https://images.unsplash.com/photo-1519238359922-989348752efb?q=80&w=1000',
    alt: 'Kids oversized t-shirt'
  },
  {
    id: 9,
    name: 'Kids Graphic Tee',
    price: 59,
    category: 'Kids T-Shirts',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000',
    alt: 'Kids graphic print t-shirt'
  },
  {
    id: 10,
    name: 'Kids Black Hoodie',
    price: 95,
    category: 'Kids Hoodies',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000',
    alt: 'Kids black hoodie'
  },
  {
    id: 11,
    name: 'Kids Oversized Hoodie',
    price: 105,
    category: 'Kids Hoodies',
    image: 'https://images.unsplash.com/photo-1519238359922-989348752efb?q=80&w=1000',
    alt: 'Kids oversized hoodie'
  },
  {
    id: 12,
    name: 'Kids Sweatshirt',
    price: 78,
    category: 'Kids Sweatshirts',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000',
    alt: 'Kids sweatshirt'
  }
];

const Navbar = ({ cartCount, toggleCart }: { cartCount: number; toggleCart: () => void }) => (
  <nav className="bg-gradient-to-r from-black/95 to-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            LUXE
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105">
              Home
            </a>
            <a href="/shop" className="text-white font-semibold border-b-2 border-gray-400 pb-1">
              Shop
            </a>
            <a href="#" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105">
              Contact
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full ring-2 ring-gray-800/50"></div>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gradient-to-t from-black to-gray-900/50 border-t border-gray-800/50">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            LUXE
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Timeless elegance in every stitch. Luxury black fashion for the modern gentleman.
          </p>
        </div>
        <div>
          <h3 className="text-gray-300 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">New Arrivals</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Best Sellers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sale</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-300 font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Shipping</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Returns</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Size Guide</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-300 font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110">
              <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110">
              <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19