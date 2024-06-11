const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Comment = require('../models/comment');
const Club = require('../models/club');
const Notification = require('../models/notification');

router.post('/register', async (req, res) => {
  
  try {
    const user = new User(req.body);
    const existingUser = await User.findOne(user.username);
    if (existingUser) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
    }

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.status(201).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const login = req.body;

  try {
    let entity;
    
    if (userType === 'User') {
      entity = await User.findOne({ username });
    } else if (userType === 'Club') {
      entity = await Club.findOne({ username });
    } else {
      return res.status(400).json({ message: "Type d'utilisateur invalide" });
    }

    if (!entity) {
      return res.status(400).json({ message: "Nom d'utilisateur incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, entity.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const lastActivity = Math.floor(Date.now() / 1000);
    const expiration = lastActivity + (7 * 24 * 60 * 60);

    const token = jwt.sign({ userId: user._id, lastActivity }, 'votre_secret', { expiresIn: expiration });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: error.message});
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

/*router.get('/search/:searchingItem', async (req, res) => {
  const searchingItem = req.params.searchingItem;
  const regex = new RegExp(searchingItem, 'i');

  try {
    const results = await Promise.all([
      Club.find({ name: regex }),
      Club.events.find({ title: regex }),
      Notification.find({ body: regex }),
      User.find({ name: regex }),
      Comment.find({ body: regex }),
    ]);

    const mergedResults = results.flat();
    
    res.status(200).json(mergedResults);
  } catch (error) {
    res.status(500).json({ message: "Error searching database" });
  }
});*/

module.exports = router;
