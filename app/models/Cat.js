const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "A cat needs a name!"],
    maxlength: [50, "Your cat's name sounds purrfectly long already!"],
  },
  age: {
    type: Number,
    min: [1, "Cats must be at least 1 year old"],
    required: true,
  },
  breed: {
    type: String,
    enum: ["Persian", "Siamese", "Abyssinian", "Other"],
    message: "Only valid cat breeds are allowed.",
    required: true,
  },
});

module.exports = mongoose.model("Cat", catSchema);