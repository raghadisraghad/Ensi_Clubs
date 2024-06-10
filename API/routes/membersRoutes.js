const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club")


//Get All members// 
router.get("/club/member/:club_id", async (req, res) => {
    try {
      const { club_id } = req.params;
      const club =Club.findById(club_id)
      const members = await club.members.find()
      res.status(200).json(members);
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });
  
  //Get members by id // 
router.get("/club/member/:club_id/:member_id", async (req, res) => {
    try {
    const { club_id,member_id } = req.params;
    const club =Club.findById(club_id)
    const member = club.members.id(member_id)
    if (!member) {
        return res.status(404).json({ message: "member doesn't exist !!!" });
    }
    res.status(200).json(member);
    } catch (err) {
    res.status(500).json({
        message: err.message,
    });
    }
});
  
//---CREATE METHOD----//
router.post("/club/member/:club_id/:member_id", async (req, res) => {
try {
    const {club_id} = req.params
    const member = req.body;
    const club= Club.findById(club_id);
    club.members.push(member)
    await club.save()
    res.status(200).json({ message: "member added succefully" });
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

//---UPDATE METHOD----//
router.update("/club/member/:club_id/:member_id", async (req, res) => {
try {
    const { club_id,member_id } = req.params;
    const update = req.body;
    const club =Club.findById(club_id)
    const member = club.member.id(member_id)
    if (!member) {
    return res.status(404).json({ message: "member doesn't exist !!!" });
    }
    member.set(update)
    await club.save()
    res.status(200).json({ message: "member updated succefully" });
} catch (error) {
    res.status(400).json({ message: "" });
}
});

//---DELETE METHOD----//
router.delete("/club/member/:club_id/:member_id", async (req, res) => {
try {
    const { club_id,member_id } = req.params;
    const club =Club.findById(club_id)
    const member = await club.members.findByIdAndDelete(member_id);
    if (!member) {
    return res.status(404).json({ message: "member Not Found !!!" });
    }
    res.status(200).json({ message: "member deleted successfully" });
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

module.exports = router
