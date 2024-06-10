const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new mongoose.Schema({
  //infos//
  name: { type: String, required: true },
  rate: { type: Number, required: false, default: 0 },
  logo: { type: String, required: false, default: "" },
  slogan: { type: String, required: false,default:""},
  description: { type: String, required: false, default: "" },
  //members //
  members: {
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, required: true },
        abscence: { type: Number, default: 0 },
      },
    ],
    required: false,
  },

  //events
  events: {
    type: [
      {
        name: { type: String, required: true },
        date:{type:Date},
        ticket:{type:Boolean,required:true},
        price:{type:Number,required:true}
      }
    ],required:false
  },
  //comments//
  comments:[{type:Schema.Types.ObjectId, ref: 'User',required:false }]
  
});

module.exports = mongoose.model("Club", clubSchema);
