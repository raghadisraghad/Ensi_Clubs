const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Get All users// 
router.get("/User", async (res, req) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
});

//Get userby id // 
router.get("/User/:id", async (res, req) => {
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
router.post("/User", async (res, req) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.status(200).json({message : "Operation success ",user})
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });


//Update User// 

router.put("/User/:id", async (res, req) => {
    try {
      
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });


//Delete user by id
router.delete("/User", async (res, req) => {
    try {
      
    } catch (err) {
      res.status(500).json({
        Error: err.message,
      });
    }
  });







module.exports = router
