import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isNew
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const discountPercentage = 30; // Display 30% discount as requested

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    navigate('/order');
  };

  return (
    <div 
      className="bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isNew && (
            <span className="bg-emerald-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
              NOUVEAU
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
          onClick={() => {
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add to Cart (toujours visible) */}
        <div className="absolute bottom-3 left-3 right-3 transition-all duration-300 translate-y-0 opacity-100">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>تقديم طلبية</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-white text-lg line-clamp-2 group-hover:text-emerald-400 transition-colors duration-200">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-500'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">{price} د.ج</span>
          {originalPrice && (
            <span className="text-lg text-gray-400 line-through">{originalPrice} د.ج</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
