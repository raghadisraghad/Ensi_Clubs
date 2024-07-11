const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Club = require("../models/club");
const dotenv = require("dotenv");
dotenv.config();
const secret_Key = process.env.SECRET_KEY;

router.post('/registerClub', async (req, res) => {
  try {
    const club = new Club(req.body);
    const existingClub = await Club.findOne({ name: club.name });
    if (existingClub) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
    }

    club.password = await bcrypt.hash(club.password, 10);
    
    const payload = {
      userId: club._id,
      name: club.name,
      Acronym: club.abrv,
    };
    const token = jwt.sign(payload, secret_Key,);
    club.token = token;
    await club.save();
    const type = "club"

    res.status(201).json({club,type:type});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
    }

    user.password = await bcrypt.hash(user.password, 10);
    const payload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = jwt.sign(payload, secret_Key, { expiresIn: "1h" });
    user.token = token;
    await user.save();
    const type = "user"

    res.status(201).json({ user,type:type });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const login = req.body;
  
  try {
    let entity;

    entity = await User.findOne({ username: login.username });
    const type="user";

    if (!entity) {
      entity = await Club.findOne({ name: login.username });
      type="club";
      if (!entity) {
        return res
          .status(400)
          .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
      }
    }
    const isPasswordValid = await bcrypt.compare(
      login.password,
      entity.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    /* const lastActivity = Math.floor(Date.now() / 1000); */
    const payload = {
      userId: entity._id,
      firstName: entity.firstName,
      lastName: entity.lastName,
    };
    const lastActivity = Math.floor(Date.now() / 1000);
    const expiration = lastActivity + (7 * 24 * 60 * 60);
    const token = jwt.sign({ userId: entity._id, lastActivity }, secret_Key, { expiresIn: expiration });
    res.status(200).json({ token, userId: entity._id, type , entity});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

/*
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: error.message});
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

*/

//////////////////////////////////////////////////
router.get("/search/:searchingItem", async (req, res) => {
  const searchingItem = req.params.searchingItem;

  try {
    const [clubs, users, events] = await Promise.all([
      Club.find({ $or: [{ name: searchingItem }, { abrv: searchingItem }] }),
      User.find({
        $or: [
          { username: searchingItem },
          { firstName: searchingItem },
          { lastName: searchingItem },
        ],
      }),
      Club.find({ "events.title": searchingItem }),
    ]);

    const searchResults = {
      clubs,
      users,
      events,
    };

    res.status(200).json(searchResults);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching database", error: error.message });
  }
});

module.exports = router;
