const mongoose = require("mongoose");
const treatmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: String,
  img: String,
  ved: String,
});
module.exports = mongoose.model("treatment", treatmentSchema);