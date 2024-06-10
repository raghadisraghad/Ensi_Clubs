const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Club = require("../models/club");
const Comment = require("../models/comment");

//---GET all comments//
router.get("/comment", async (res, req) => {
  try {
    const comments = Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---GET comments BY USER-ID METHOD----//
router.get("/comment/:user-id", async (res, req) => {
  try {
    const { id } = req.params;
    const comments = Comment.find({ user: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---CREATE METHOD----//
router.post("/comment", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save;
    res.status(200).json({ message: "Comment added succefully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---UPDATE METHOD----//
router.update("/comment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const comment = Comment.findByIdAndUpdate(id, update, { new: true });
    if(!comment){
        return res.status(404).json({message:"Comment doesn't exist !!!"})
    }
    res.status(200).json({ message: "Comment updated succefully" });
  } catch (error) {
    res.status(400).json({message:""})
  }
});

//---DELETE METHOD----//
router.delete("/comment/:id", async (req, res) => {
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
