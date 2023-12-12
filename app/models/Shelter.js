const { default: mongoose } = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "you need a name!"],
    maxlength: [70, "don't put everyones name on the building it's too long"],
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