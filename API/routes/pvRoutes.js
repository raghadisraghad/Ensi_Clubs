const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");

// Get All pvs
router.get("/pv/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const club = await Club.findById(club_id);
    const pvs = club.pvs;
    res.status(200).json(pvs);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

// Get pv by id
router.get("/pv/:club_id/:pv_id", async (req, res) => {
  try {
    const { club_id, pv_id } = req.params;
    const club = await Club.findById(club_id);
    const pv = club.pvs.id(pv_id);
    if (!pv) {
      return res.status(404).json({ message: "PV doesn't exist" });
    }
    res.status(200).json(pv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new pv
router.post("/pv/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const pv = req.body;
    const club = await Club.findById(club_id);
    club.pvs.push(pv);
    await club.save();
    res.status(201).json({ message: "PV added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update pv
router.put("/pv/:club_id/:pv_id", async (req, res) => {
  try {
    const { club_id, pv_id } = req.params;
    const update = req.body;
    const club = await Club.findById(club_id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    const pv = club.pvs.id(pv_id);
    if (!pv) {
      return res.status(404).json({ message: "PV not found" });
    }
    Object.assign(pv, update); // Update pv fields
    await club.save();
    res.status(200).json({ message: "PV updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete pv
router.delete("/pv/:club_id/:pv_id", async (req, res) => {
  try {
    const { club_id, pv_id } = req.params;
    const club = await Club.findById(club_id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    const pvIndex = club.pvs.findIndex(pv => pv._id.toString() === pv_id);
    if (pvIndex === -1) {
      return res.status(404).json({ message: "pv not found" });
    }
    club.pvs.splice(pvIndex, 1);
    await club.save();
    res.status(200).json({ message: "PV deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
