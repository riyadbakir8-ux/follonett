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
    name: 'Oversized Premium White Tee',
    price: 85,
    category: 'Oversized T-Shirts',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1000',
    alt: 'Oversized premium white t-shirt'
  },
  // Hoodies
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
    name: 'Logo Beanie',
    price: 52,
    category: 'Beanies',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000',
    alt: 'Logo beanie'
  },
  // Kids T-Shirts
  {
    id: 7,
    name: 'Kids Oversized Tee',
    price: 65,
    category: 'Kids T-Shirts',
    image: 'https://images.unsplash.com/photo-1519238359922-989348752efb?q=80&w=1000',
    alt: 'Kids oversized t-shirt'
  },
  {
    id: 8,
    name: 'Kids Graphic Tee',
    price: 59,
    category: 'Kids T-Shirts',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000',
    alt: 'Kids graphic print t-shirt'
  },
  // Kids Hoodies
  {
    id: 9,
    name: 'Kids Black Hoodie',
    price: 95,
    category: 'Kids Hoodies',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000',
    alt: 'Kids black hoodie'
  },
  {
    id: 10,
    name: 'Kids Oversized Hoodie',
    price: 105,
    category: 'Kids Hoodies',
    image: 'https://images.unsplash.com/photo-1519238359922-989348752efb?q=80&w=1000',
    alt: 'Kids oversized hoodie'
  },
  // Caps
  {
    id: 11,
    name: 'Black Logo Cap',
    price: 55,
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1517941823-815bea90d291?q=80&w=1000',
    alt: 'Black logo baseball cap'
  },
  {
    id: 12,
    name: 'Premium Dad Hat',
    price: 49,
    category: 'Caps',
    image: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?q=80&w=1000',
    alt: 'Premium dad hat'
  },
  // Beanies
  {
    id: 13,
    name: 'Black Cuff Beanie',
    price: 45,
    category: 'Beanies',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000',
    alt: 'Black cuff beanie'
  },
  {
    id: 14,
    name: 'Logo Beanie',
    price: 52,
    category: 'Beanies',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    alt: 'Black winter beanie'
  },
  // Phone Cases
  {
    id: 15,
    name: 'iPhone Matte Black Case',
    price: 39,
    category: 'Phone Cases',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=1000',
    alt: 'Matte black iPhone case'
  },
  {
    id: 16,
    name: 'Clear Logo Phone Case',
    price: 45,
    category: 'Phone Cases',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000',
    alt: 'Clear logo phone case'
  },
  // Tech Accessories
  {
    id: 17,
    name: 'Wireless Earbuds Case',
    price: 69,
    category: 'Tech Accessories',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1000',
    alt: 'Wireless earbuds protective case'
  },
  {
    id: 18,
    name: 'Premium Laptop Sleeve',
    price: 79,
    category: 'Tech Accessories',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000',
    alt: 'Premium laptop sleeve'
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
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center">
        <p className="text-gray-500 text-sm">
          © 2024 LUXE. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const CartSidebar = ({ 
  cartItems, 
  cartTotal, 
  isOpen, 
  toggleCart, 
  updateQuantity, 
  removeItem 
}: {
  cartItems: CartItem[];
  cartTotal: number;
  isOpen: boolean;
  toggleCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Mobile Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleCart}
        />
        
        {/* Sidebar */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900/95 to-black/90 backdrop-blur-xl border-l border-gray-800/50 z-50 lg:w-96 p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Shopping Cart
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCartIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Your cart is empty</h3>
              <p className="text-gray-500">Add some luxury items to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8 max-h-[60vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                  >
                    <div className="relative w-20 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                      <p className="text-lg font-bold text-gray-200">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-gray-700/50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <MinusIcon className="h-4 w-4 text-gray-400" />
                        </button>
                        <span className="px-4 py-1.5 font-semibold text-gray-200 min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-600 rounded-md transition-colors"
                        >
                          <PlusIcon className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-600/20 hover:text-red-400 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800/50">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300 font-medium">Subtotal:</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl border border-gray-600/50 shadow-xl hover:shadow-2xl hover:shadow-gray-900/50 transition-all duration-300 uppercase tracking-wide text-sm"
                >
                  Proceed to Checkout
                </motion.button>
                <button className="w-full text-gray-400 hover:text-gray-200 font-medium py-3 px-6 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 text-sm">
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default function Shop() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1 
      }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />
      
      <CartSidebar
        cartItems={cartItems}
        cartTotal={cartTotal}
        isOpen={isCartOpen}
        toggleCart={toggleCart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

      <main className="pt-24 pb-24">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/50 to-black/50 py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-transparent to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent mb-6"
            >
              THE COLLECTION
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Premium Streetwear For The New Generation
            </motion.p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700/70 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 group-hover:bg-gray-900/70">
                  <div className="relative overflow-hidden aspect-[4/5] p-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-xl flex items-center justify-center backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-110">
                        <HeartIcon className="h-5 w-5 text-gray-300" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                        ${product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="group/cart flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border border-gray-700/50 backdrop-blur-sm rounded-xl font-medium text-gray-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-black/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Add to Cart</span>
                        <ShoppingCartIcon className="h-5 w-5 group-hover/cart:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}