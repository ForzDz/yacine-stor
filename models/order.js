const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true // Ce champ est obligatoire
  },
  lastName: {
    type: String,
    required: false // Ce champ n'est pas obligatoire si vous n'en avez pas besoin
  },
  wilaya: {
    type: String,
    required: true
  },
  communes: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cartItems: [ // Ceci est un tableau d'objets pour les produits
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: false }, // L'image n'est peut-être pas essentielle dans le backend
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now // Enregistre la date et l'heure de la commande par défaut
  },
  status: {
    type: String,
    default: 'Pending' // Statut initial de la commande
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; // Exporter le modèle pour l'utiliser ailleurs