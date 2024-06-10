const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");

//---CREATE METHOD----//
router.post("/club/event/:club_id", async (req, res) => {
  try {
    const {club_id} = req.params
    const event = req.body;
    const club= Club.findById(club_id);
    club.events.push(event)
    await club.save()
    res.status(200).json({ message: "Event added succefully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---UPDATE METHOD----//
router.update("/club/event/:club_id/:event_id", async (req, res) => {
  try {
    const { club_id,event_id } = req.params;
    const update = req.body;
    const club =Club.findById(club_id)
    const event = club.event.id(event_id)
    if (!event) {
      return res.status(404).json({ message: "Comment doesn't exist !!!" });
    }
    event.set(update)
    await club.save()
    res.status(200).json({ message: "Comment updated succefully" });
  } catch (error) {
    res.status(400).json({ message: "" });
  }
});

//---DELETE METHOD----//
router.delete("/club/event/:club_id/:", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment Not Found !!!" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
