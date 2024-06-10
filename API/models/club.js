const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new mongoose.Schema({
  //infos//
  abrv: { type: String, required: true ,unique: true},
  name: { type: String, required: true ,unique: true},
  email: { type: email, required: true },
  rate: { type: Number, required: false, default: 0 },
  logo: { type: String, required: true, default: "" },
  slogan: { type: String, required: true,default:"",unique: true},
  description: { type: String, required: true, default: "" },
  sponsore: { type: String, required: false, default: "" },
  
  //members //
  members: {
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, required: true },
        rate: { type: Number, required: false, default: 0 },
        abscence: { type: Number, default: 0 },
      },
    ],
    required: false,
  },

  //Pvs
  
  pvs: {
    type: [
      {
        title: { type: String, required: true ,unique: true},
        file: { type: String, required: true },
        date: { type: Date, required: true }
      }
    ],
    required: false,
  },

  //events
  events: {
    type: [
      {
        title: { type: String, required: true ,unique: true},
        date:{type:Date,required:true},
        status:{type:String,required:true, default:0},
        description: { type: String, required: true, default: "" },
        location: { type: String, required: true, default: "" },
        ticket:{type:Boolean,required:false},
        price:{type:Number,required:false},
        collab: { type: String, required: false, default: "" }
      }
    ],required:false
  },
  history: {
    type: [
      {
        title: { type: String, required: true },
        date:{type:Date,required:true},
        status:{type:String,required:true, default:0},
        description: { type: String, required: true, default: "" },
        location: { type: String, required: true, default: "" },
        ticket:{type:Boolean,required:false},
        price:{type:Number,required:false},
        collab: { type: String, required: false, default: "" }
      }
    ],required:false
  },
  //comments//
  comments:[{type:Schema.Types.ObjectId, ref: 'User',required:false }]
  
});

module.exports = mongoose.model("Club", clubSchema);
