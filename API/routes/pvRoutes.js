const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");

//Get All pvs// 
router.get("/club/pv/:club_id", async (req, res) => {
  try {
    const { club_id } = req.params;
    const club =Club.findById(club_id)
    const pvs = await club.pv.find()
    res.status(200).json(pvs);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

//Get pvs by id // 
router.get("/club/pv/:club_id/:pv_id", async (req, res) => {
    try {
      const { club_id,pv_id } = req.params;
      const club =Club.findById(club_id)
      const pv = club.pv.id(pv_id)
      if (!pv) {
        return res.status(404).json({ message: "pv doesn't exist !!!" });
      }
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });

//---CREATE METHOD----//
router.post("/club/pv/:club_id", async (req, res) => {
  try {
    const {club_id} = req.params
    const pv = req.body;
    const club= Club.findById(club_id);
    club.pvs.push(pv)
    await club.save()
    res.status(200).json({ message: "pv added succefully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---DELETE METHOD----//
router.delete("/club/pv/:club_id/:pv_id", async (req, res) => {
  try {
    const { club_id,pv_id } = req.params;
    const club =Club.findById(club_id)
    const pv = await club.pv.findByIdAndDelete(pv_id);
    if (!pv) {
      return res.status(404).json({ message: "pv Not Found !!!" });
    }
    res.status(200).json({ message: "pv deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
