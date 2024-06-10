const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");
const Notification = require("../models/notification");

//---GET all notifications//
router.get("/notification", async (res, req) => {
  try {
    const notifications = Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---GET notifications BY USER-ID METHOD----//
router.get("/notification/:user-id", async (res, req) => {
  try {
    const { id } = req.params;
    const notifications = Notification.find({ user: id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---CREATE METHOD----//
router.post("/notification", async (req, res) => {
  try {
    const notification = new notification(req.body);
    await Notification.save;
    res.status(200).json({ message: "notification added succefully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---UPDATE METHOD----//
router.update("/notification/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const notification = Notification.findByIdAndUpdate(id, update, { new: true });
    if(!notification){
        return res.status(404).json({message:"notification doesn't exist !!!"})
    }
    res.status(200).json({ message: "notification updated succefully" });
  } catch (error) {
    res.status(400).json({message:""})
  }
});

//---DELETE METHOD----//
router.delete("/notification/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "notification Not Found !!!" });
    }
    res.status(200).json({ message: "notification deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
