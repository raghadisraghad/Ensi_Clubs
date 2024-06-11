const express = require("express");
const router = express.Router();
//const User = require("../models/user");
const Club = require("../models/club");

//Get All clubs //
router.get("/club", async (req, res) => {
  try {
    const clubs = await Club.find()
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

module.exports = router;
