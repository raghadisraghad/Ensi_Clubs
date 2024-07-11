const express = require("express");
const router = express.Router();
const Club = require("../models/club");

//Get All clubs //
router.get("/club", async (req, res) => {
  try {
    const clubs = await Club.find().populate();
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
    const club = await Club.findById(id).populate();
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
    const comment = req.body;
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

//add rate//
router.post("/club/rate/:idClub", async (req, res) => {
  try {
    const { idClub } = req.params;
    const { user, rate } = req.body;
    const club = await Club.findById(idClub);
    if (!club) {
      return res.status(404).json({ message: "Club Not Found !!!" });
    }
    const existingRate = club.rate.find((r) => r.user.toString() === user);
    if (existingRate) {
      existingRate.rated = rate;
    } else {
      club.rate.push({ user: user, rated: rate });
    }
    const totalRates = club.rate.reduce((sum, r) => sum + r.rated, 0);
    club.averageRate = totalRates / club.rate.length;
    await club.save();
    const updatedClub = await Club.findById(idClub).populate(
      "rate.user",
      "name"
    );
    res.json({ club: updatedClub });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
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
    if (!club) {
      return res.status(404).json({ message: "Club Not Found !!!" });
    }
    res.status(200).json({ message: "Club Deleted successfuly", club });
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

//Delete rate //
router.delete("/club/rate/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const clubs = await Club.find();
    if (!clubs || clubs.length === 0) {
      return res.status(404).json({ message: "No clubs found" });
    }
    for (const club of clubs) {
      const initialRateCount = club.rate.length;
      club.rate = club.rate.filter((r) => !r.user.equals(idUser));
      if (club.rate.length !== initialRateCount) {
        const totalRates = club.rate.reduce((sum, r) => sum + r.rated, 0);
        club.averageRate =
          club.rate.length > 0 ? totalRates / club.rate.length : 0;
        await club.save();
      }
    }
    res.status(200).json({ message: "User rate deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Logo uplaod //
router.put("/club/logo", async (req, res) => {
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

//PV upload
router.put("/club/pv", async (req, res) => {
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

router.get("/unaproved", async (req,res) => {
  try {
    const clubs = await Club.find({ approved: false });
    res.status(200).json({ clubs });
  } catch (error) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/event/unaproved", async (req,res) => {
  try {
    const clubs = await Club.find({
      events: { $elemMatch: { approved: false } },
    });
    console.log(clubs);
      res.status(200).json({ clubs });
  } catch (error) {
      res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
