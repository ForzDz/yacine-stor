const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/order'); // Importez le modèle Order

const app = express();
const port = 3000; // Vous pouvez choisir un autre port si nécessaire

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/yacineshop', { // Remplacez 'yacineshop' par le nom de votre base de données
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connecté à MongoDB');
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
    });

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Définir la route POST pour recevoir les commandes
app.post('/api/orders', async (req, res) => {
    try {
        // Extraire les données de la requête
        const orderData = req.body;

        // Créer une nouvelle instance de commande
        const newOrder = new Order(orderData);

        // Enregistrer la commande dans la base de données
        await newOrder.save();

        // Envoyer une réponse de succès
        res.status(201).json({ message: 'Commande enregistrée avec succès !', orderId: newOrder._id });

    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de l\'enregistrement de la commande :', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la commande.', error: error.message });
    }
});

// Démarrez le serveur
app.listen(port, () => {
    console.log(`Serveur backend en cours d'exécution sur http://localhost:${port}`);
});