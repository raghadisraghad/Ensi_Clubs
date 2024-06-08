const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { typr: Number, required: false, default: 0 },
  members: {
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User",required:true },
        role: { type: String, required: true },
        abscence: { type: Number, default: 0 },
      },
    ],
    required: false,
  },
});

module.exports = mongoose.model("Club", clubSchema);
