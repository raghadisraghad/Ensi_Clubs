const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Get All users// 
router.get("/User", async (req, res) => {
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
router.get("/User/:id", async (req, res) => {
    try {
      const users = await User.findById(req.param.id);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });


//create user//
router.post("/User", async (req, res) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.status(200).json({message : "Operation success "})
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });


//Update User// 

router.put("/User/:id", async (req, res) => {
    try {
      const {id}= req.params
      const update = req.body
      const user = await User.findByIdAndUpdate(id,update,{new:true});
      res.status(200).json({message: "User Updated successfuly"})
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });


//Delete user by id //
router.delete("/User:id", async (req, res) => {
    try {
      const {id}= req.params
      const update = req.body
      const user = await User.findByIdAndDelete(id,update,{new:true});
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });







module.exports = router
