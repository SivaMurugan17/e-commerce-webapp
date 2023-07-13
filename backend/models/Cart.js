const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: { type: String },
  items: { type: [String] },
});

module.exports = mongoose.model("cart", cartSchema);
