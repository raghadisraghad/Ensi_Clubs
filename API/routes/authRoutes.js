const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Club = require('../models/club');

router.post('/registerClub', async (req, res) => {
  try {
    const club = new Club(req.body);
    const existingClub = await Club.findOne({ name: club.name });
    if (existingClub) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
    }

    club.password = await bcrypt.hash(club.password, 10);
    await club.save();

    res.status(201).json({ message: "Registered Club Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
    }

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.status(201).json({ message: "Registered User Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/login', async (req, res) => {
  const login = req.body;

  try {
    let entity;

    entity = await User.findOne({ username: login.username });

    if (!entity) {
      entity = await Club.findOne({ name: login.name });
      if (!entity) {
        return res.status(400).json({ message: "Nom d'utilisateur incorrect" });
      }
    }
    const isPasswordValid = await bcrypt.compare(login.password, entity.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
    
    const lastActivity = Math.floor(Date.now() / 1000);
    const expiration = lastActivity + (7 * 24 * 60 * 60);
    
    const token = jwt.sign({ userId: entity._id, lastActivity }, 'votre_secret', { expiresIn: expiration });
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

router.get('/search/:searchingItem', async (req, res) => {
  const searchingItem = req.params.searchingItem;

  try {
    const [clubs, users, events] = await Promise.all([
      Club.find({ $or: [{ name: searchingItem }, { abrv: searchingItem }] }),
      User.find({ $or: [{ username: searchingItem }, { firstName: searchingItem }, { lastName: searchingItem }] }),
      Club.find({ 'events.title': searchingItem })
    ]);

    const searchResults = {
      clubs,
      users,
      events
    };

    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ message: "Error searching database", error: error.message });
  }
});

module.exports = router;
