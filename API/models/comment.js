const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema =new mongoose.Schema({
        user:{ type: Schema.Types.ObjectId, ref: 'User',required:true },
        body:{type:String,required:true},
        date:{type:Date,default:Date.now}
})

module.exports = mongoose.model("Comment",commentSchema)