const express = require("express");
const router = express.Router();
const Club = require("../models/club");
const axios = require('axios');

//Get All clubs //
router.get("/club", async (req, res) => {
  try {
    const clubs = await Club.find().populate()
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Get Club by ID//
router.get("/club/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id)
    if (!club) {
      return res.status(404).send({ error: "Club doesn't exist !!!" });
    }
    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Create a Club//
router.post("/club", async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(200).json({ message: "Club added Successfully", club });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//contact club//
router.post("/club/contact/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = req.body
    const club = await Club.findById(id);
    club.comments.push(comment);
    await club.save();
    res.status(200).json({ message: "Contacted Successfully", club });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Update Club//
router.put("/club/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const club = await Club.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json({ message: "Club Updated successfuly", club });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Delete Club by id //
router.delete("/club/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findByIdAndDelete(id);
    if(!club){
      return res.status(404).json({message:"Club Not Found !!!"})
    }
    res.status(200).json({ message: "Club Deleted successfuly",club });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Delete contacted //
router.delete("/club/comment/:idClub/:idComment", async (req, res) => {
  try {
    const { idClub, idComment } = req.params;
    const club = await Club.findById(idClub);
    if (!club) {
      return res.status(404).json({ message: "Club Not Found !!!" });
    }
    club.comments.pull(idComment);
    await club.save();
    res.status(200).json({ message: "Comment Deleted Successfully", club });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
