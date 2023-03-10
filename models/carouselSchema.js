const mongoose = require("mongoose");
const carouselSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: String,
  img: String,
});
module.exports = mongoose.model("carousel", carouselSchema);