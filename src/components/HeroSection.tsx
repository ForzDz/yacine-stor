import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import photo5 from '../images/photo 6.png'; // Import the plant image

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    // Animation pour le titre principal
    gsap.from('.hero-title', {
      opacity: 0,
      y: 50, // Start 50 pixels down
      duration: 1,
      scrollTrigger: {
        trigger: '.hero-title',
        start: 'top 80%', // Animation starts when the top of the element is 80% in the viewport
        toggleActions: 'play none none none' // Play animation once
      }
    });

    // Animation pour le paragraphe
    gsap.from('.hero-paragraph', {
      opacity: 0,
      y: 50, // Start 50 pixels down
      duration: 1,
      delay: 0.3, // Delay slightly after the title
      scrollTrigger: {
        trigger: '.hero-paragraph',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Animation pour les boutons
    gsap.from('.hero-buttons > *', {
      opacity: 0,
      y: 50, // Start 50 pixels down
      duration: 1,
      delay: 0.6, // Delay after the paragraph
      stagger: 0.2, // Stagger the animation for each button
      scrollTrigger: {
        trigger: '.hero-buttons',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

     // Animation pour les statistiques
     gsap.from('.hero-stats > *', {
      opacity: 0,
      y: 50, // Start 50 pixels down
      duration: 1,
      delay: 0.9, // Delay after the buttons
      stagger: 0.2, // Stagger the animation for each stat
      scrollTrigger: {
        trigger: '.hero-stats',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

  }, []);

  return (
    <section className="pt-20 min-h-[70vh] flex items-center bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight hero-title">
              استفيد من عرض{' '}
                <span className="text-emerald-400">الخصم 30%</span>{' '}
                على جميع المنتجات
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed hero-paragraph">
              منتجات ذات جودة عالية  وفعالة لبشرتك، مشكورة من طرف الزبائن
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 hero-buttons">
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              اطلب الآن
              </button>
              <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-300 font-semibold text-lg">
              للمزيد من المعلومات
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-4 hero-stats">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10الف+</div>
                <div className="text-sm text-gray-300">المتابعين</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">+29الف</div>
                <div className="text-sm text-gray-300">طلبات مرسولة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99% </div>
                <div className="text-sm text-gray-300">من تقييم الزبائن</div>
              </div>
            </div>
          </div>

          {/* Plus d'image à droite */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
