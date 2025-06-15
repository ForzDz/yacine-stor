import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Boutique Column */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Boutique</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Soins de la peau</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Maquillage</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Soins capillaires</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Soins corporels</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Parfum</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Meilleures Ventes</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Nouveautés</a></li>
            </ul>
          </div>

          {/* À Propos Column */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">À Propos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Notre Histoire</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Durabilité</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Ingrédients</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Carrières</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Presse</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Nous Contacter</a></li>
            </ul>
          </div>

          {/* Service Client Column */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Livraison et Retours</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Termes et Conditions</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Programme de Fidélité</a></li>
              <li><a href="#" className="text-white hover:text-emerald-400 transition-colors">Suivre Votre Commande</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/30">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.facebook.com/yacine.ar.1/" target="_blank" className="text-white hover:text-emerald-400 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/yaacine_off/" target="_blank" className="text-white hover:text-emerald-400 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            {/* TikTok icon */}
            <a href="https://www.tiktok.com/@yacine.dev" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M16.5 3A4.5 4.5 0 0 0 21 7.5v1.25a6.25 6.25 0 0 1-6.25-6.25H12v15.25a2.25 2.25 0 1 1-2.25-2.25H10V12H9.75A4.75 4.75 0 1 0 14.5 16.75V7.5A6.25 6.25 0 0 0 21 13.75V7.5A4.5 4.5 0 0 0 16.5 3z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="flex justify-center">
            <p className="text-white text-center">
              © {currentYear} Yacine Shop. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
