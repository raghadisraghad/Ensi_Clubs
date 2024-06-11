const express = require("express");
const router = express.Router();
const Club = require("../models/club");


// all events
router.get("/event/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const club = await Club.findById(club_id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    const events = club.events;
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// event by id
router.get("/event/:club_id/:event_id", async (req, res) => {
  try {
    const { club_id, event_id } = req.params;
    const club = await Club.findById(club_id);
    const event = club.events.id(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event doesn't exist" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add events
router.post("/event/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const event = req.body;
    const club = await Club.findById(club_id);
    club.events.push(event);
    await club.save();
    res.status(200).json({ message: "Event added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update events
router.put("/event/:club_id/:event_id", async (req, res) => {
  try {
    const { club_id, event_id } = req.params;
    const update = req.body;
    const club = await Club.findById(club_id);
    const event = club.events.id(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event doesn't exist" });
    }
    event.set(update);
    await club.save();
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete events
router.delete("/event/:club_id/:event_id", async (req, res) => {
  try {
    const { club_id, event_id } = req.params;
    const club = await Club.findById(club_id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const eventIndex = club.events.findIndex(event => event._id.toString() === event_id);
    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    club.events.splice(eventIndex, 1);
    await club.save();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
