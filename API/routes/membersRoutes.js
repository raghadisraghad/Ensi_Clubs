const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");

// Get All members
router.get("/member/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const club = await Club.findById(club_id);
    const members = club.members;
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get member by id
router.get("/member/:club_id/:member_id", async (req, res) => {
  try {
    const { club_id, member_id } = req.params;
    const club = await Club.findById(club_id);
    const member = club.members.id(member_id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new member
router.post("/member/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const newMember = req.body;
    const club = await Club.findById(club_id);
    club.members.push(newMember);
    await club.save();
    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update member
router.put("/member/:club_id/:member_id", async (req, res) => {
  try {
    const { club_id, member_id } = req.params;
    const update = req.body;
    const club = await Club.findById(club_id);
    const member = club.members.id(member_id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    member.set(update);
    await club.save();
    res.status(200).json({ message: "Member updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete member
router.delete("/member/:club_id/:member_id", async (req, res) => {
  try {
    const { club_id, member_id } = req.params;
    const club = await Club.findById(club_id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    const memberIndex = club.members.findIndex(member => member._id.toString() === member_id);
    if (memberIndex === -1) {
      return res.status(404).json({ message: "member not found" });
    }
    club.members.splice(memberIndex, 1);
    await club.save();
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
