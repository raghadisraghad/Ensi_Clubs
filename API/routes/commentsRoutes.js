const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");
const Comment = require("../models/comment");

//---GET all comments//
router.get("/comment", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---GET comments BY USER-ID METHOD----//
router.get("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findById(id);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---CREATE METHOD----//
router.post("/comment", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---UPDATE METHOD----//
router.put("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const comment = await Comment.findByIdAndUpdate(id, update, { new: true });
    if (!comment) {
      return res.status(404).json({ message: "Comment doesn't exist !!!" });
    }
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---DELETE METHOD----//
router.delete("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delete_data = await Comment.findByIdAndDelete(id);
    if (!delete_data) {
      delete_data = await Comment.deleteMany({ user: id });
      if (!delete_data) {
        return res.status(404).json({ message: "Comment Not Found !!!" });
      }
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
