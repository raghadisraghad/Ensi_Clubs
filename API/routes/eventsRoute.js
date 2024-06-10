const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");

//Get All events// 
router.get("/club/event/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const club =Club.findById(club_id)
    const events = await club.event.find()
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

//Get events by id // 
router.get("/club/event/:club_id/:event_id", async (req, res) => {
    try {
      const { club_id,event_id } = req.params;
      const club =Club.findById(club_id)
      const event = club.event.id(event_id)
      if (!event) {
        return res.status(404).json({ message: "Event doesn't exist !!!" });
      }
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });

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


//---Event done----//
router.post("/club/event/:club_id", async (req, res) => {
  try {
    const {club_id} = req.params
    const event = req.body;
    const club= Club.findById(club_id);
    club.history.push(event)
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
      return res.status(404).json({ message: "Event doesn't exist !!!" });
    }
    event.set(update)
    await club.save()
    res.status(200).json({ message: "Event updated succefully" });
  } catch (error) {
    res.status(400).json({ message: "" });
  }
});

//---DELETE METHOD----//
router.delete("/club/event/:club_id/:event_id", async (req, res) => {
  try {
    const { club_id,event_id } = req.params;
    const club =Club.findById(club_id)
    const event = await club.event.findByIdAndDelete(event_id);
    if (!event) {
      return res.status(404).json({ message: "event Not Found !!!" });
    }
    res.status(200).json({ message: "event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
