const mongoose = require("mongoose");
const schema = mongoose.Schema({
  msg: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Message", schema);