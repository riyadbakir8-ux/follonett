'use client';
import { useState } from 'react';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Obsidian Leather Jacket',
    price: '$1,250',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500',
  },
  {
    id: 2,
    name: 'Midnight Wool Coat',
    price: '$2,800',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500',
  },
  {
    id: 3,
    name: 'Shadow Cashmere Sweater',
    price: '$890',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500',
  },
  {
    id: 4,
    name: 'Ebony Tailored Pants',
    price: '$650',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop',
  },
];

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Shop', href: '#featured' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-x-hidden">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              FolloNett
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 md:pt-32 md:pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent mb-8 leading-tight">
              LUXURY IN
              <br />
              <span className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent bg-white px-8 py-4 rounded-full shadow-2xl inline-block mt-4 border-4 border-gray-700 hover:border-gray-500 transition-all duration-500 hover:scale-105">
                BLACK
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Timeless elegance crafted for the modern elite. Discover our exclusive collection of black luxury fashion.
            </p>
            <a
              href="#featured"
              className="inline-block bg-gray-900 hover:bg-gray-800 border-2 border-gray-700 hover:border-gray-600 text-xl font-bold px-12 py-6 rounded-full uppercase tracking-wider transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/50"
            >
              Shop Collection
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-32 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent mb-6">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our most exclusive pieces, crafted with unparalleled precision and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 rounded-2xl p-8 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/50 transition-all duration-700 overflow-hidden cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative h-80 mb-8 overflow-hidden rounded-xl group-hover:rounded-lg transition-all duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-3xl font-black text-gray-300">{product.price}</p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                  <button className="w-full bg-white text-black font-bold py-4 px-8 rounded-xl uppercase tracking-wider hover:bg-gray-100 transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mb-6">
            FolloNett
          </div>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            © 2024 FolloNett. All rights reserved. Luxury redefined in black.
          </p>
          <div className="flex justify-center space-x-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}