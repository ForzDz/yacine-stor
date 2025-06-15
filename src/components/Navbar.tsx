import React, { useState } from 'react';
import { User, ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/images/logo final.png" 
              alt="Rayan Shop Logo" 
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-white">Yacine cosmétique</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200 relative"
              onClick={() => navigate('/order')}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
