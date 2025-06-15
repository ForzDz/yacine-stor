import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductCatalog = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const products = [
    {
      id: 1,
      name: " Modéle simple ",
      price: 1900,
      originalPrice: 2300,
      
      image: "/images/photo 7.jpg",
      rating: 5,
      reviews: 101,
      category: "earbuds",
      isNew: true
    },
    {
      id: 2,
      name: "Modéle 3D miroir",
      price: 1600,
      originalPrice: 2000,
      image: "/images/photo 11.jpg",
      rating: 4.8,
      reviews: 213,

    },
    {
      id: 3,
      name: "Demi miroir",
      price: 2100,
      originalPrice: 2500,
      image: "/images/photo 9.jpg", 
      rating: 5,
      reviews: 156,
    },
    {
      id: 4,
      name: "3 Plaque",
      price: 1700,
      originalPrice: 2100,
      image: "/images/photo 10.jpg", 
      rating: 4.2,
      reviews: 89,
    },

  ];

  useEffect(() => {
    // Animation for the section header
    gsap.from('.catalog-header-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.catalog-header-title',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from('.catalog-header-paragraph', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.catalog-header-paragraph',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Animation for each product card
    gsap.from('.product-card', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15, // Stagger the animation for each card
      scrollTrigger: {
        trigger: '.product-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

  }, []);

  const filters = [
    { id: 'all', name: 'منتجاتنا الاكثر طلبا' },
  ];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  return (
    <section id="categories" className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 catalog-header-title">
          !احصل على الطلب الآن   
          </h2>
          <p className="text-xl text-gray-300 catalog-header-paragraph">
          الكمية محدودة سارع الطلب و التوصيل جميع الولايات في اقل من 24 ساعة
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-center items-center mb-8 space-y-4 lg:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Sort and Filter Controls */}
          
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More Button */}
        
      </div>
    </section>
  );
};

export default ProductCatalog;
