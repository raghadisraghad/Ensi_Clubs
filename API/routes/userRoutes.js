const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Comment = require("../models/comment");
const Club = require("../models/club");
const axios = require('axios');

//Get All users// 
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

//Get user by id // 
router.get("/user/:id", async (req, res) => {
    try {
      const {id} = req.params
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
});


//create user//
router.post("/user", async (req, res) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.status(200).json({message : "Operation success "})
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });


//Update User// 

router.put("/user/:id", async (req, res) => {
    try {
      const {id}= req.params
      const update = req.body
      const user = await User.findByIdAndUpdate(id,update,{new:true});
      res.status(200).json({message: "User Updated successfuly"})
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });


//Delete user by id //
router.delete("/user/:id", async (req, res) => {
  try {
    const {id}= req.params
    const user = await User.findByIdAndDelete(id);
    if(!user){
      res.status(404).json({message:"User Doesn't Exist !!!"})
    }
    res.status(200).json({message: "User Deleted successfuly"})
    const comm = await Comment.find({ user: id });
    for (let i = 0; i < comm.length; i++) {
      try {
        await axios.delete(`http://localhost:3000/comment/${comm[i]._id}`);
      } catch (err) {
        console.error(`Error deleting comment for ${comm[i]._id}:`, err.message);
      }
    }
    try {
      await axios.delete(`http://localhost:3000/club/rate/${id}`);
    } catch (err) {
      console.error(`Error deleting rate for ${id}:`, err.message);
    }
    try {
      await axios.delete(`http://localhost:3000/member/${id}`);
    } catch (err) {
      console.error(`Error deleting user from club ${id}:`, err.message);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
  });

module.exports = router
