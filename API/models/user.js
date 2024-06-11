const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
      //Infos
      firstName: {type:String,required:true},
      lastName: {type:String,required:true},
      profile:{type:String,required:false},
      phone:{type:Number,required:false},
      class:{type:String,required:false},
      admin:{type:Boolean,default:false},
      //Logins
      username:{type:String,required:true,unique:true},
      email:{type:String,required:true},
      //JWT+HASH//
      password:{type:String,required:true}
      
})

module.exports = mongoose.model("User",userSchema)