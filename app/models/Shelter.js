const { default: mongoose } = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOpened: {
    type: Date,
    required: true,
  },
  acceptsTransfers: {
    type: Boolean,
    default: false,
  },
  contactAddress: {
    type: String,
    required: true,
},
  cats: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat",
    },
  ],
});
module.exports = mongoose.model("Shelter",shelterSchema)