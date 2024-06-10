const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Comment = require('../models/comment');
const Club = require('../models/club');
const Notification = require('../models/notification');

router.post('/register', async (req, res) => {
  const { name, lastName, email, password, profile, phone, class: userClass, admin } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, lastName, email, password: hashedPassword, profile, phone, class: userClass, admin });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription de l'utilisateur" });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Nom d'utilisateur incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, 'votre_secret', { expiresIn: '24h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion de l'utilisateur" });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

router.get('/search/:searchingItem', async (req, res) => {
  const searchingItem = req.params.searchingItem;
  const regex = new RegExp(searchingItem, 'i'); // Case-insensitive regex pattern

  try {
    const results = await Promise.all([
      // Replace these with your actual mongoose models and fields
      Club.find({ name: regex }),
      Club.events.find({ title: regex }),
      Notification.find({ body: regex }),
      User.find({ name: regex }),
      Comment.find({ body: regex }),
      // Add more models as needed
    ]);

    const mergedResults = results.flat(); // Flatten the array of arrays
    
    res.status(200).json(mergedResults);
  } catch (error) {
    res.status(500).json({ message: "Error searching database" });
  }
});

module.exports = router;
