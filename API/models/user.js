const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
      //Infos
      firstName: {type:String,required:true},
      lastName: {type:String,required:true},
      profile:{type:String,required:false,default:""},
      phone:{type:String,default:""},
      class:{type:String,defaulr:""},
      admin:{type:Boolean,default:false},
      //Logins
      username:{type:String,required:true,unique:true},
      email:{type:String,required:true},
      //JWT+HASH//
      token:{type:String,required:false},
      password:{type:String,required:true}
      
})

module.exports = mongoose.model("User",userSchema)