const mongoose = require("mongoose");

const wishListSchema = mongoose.Schema({
  user: { type: String },
  items: { type: [String] },
});

module.exports = mongoose.model("wishlist", wishListSchema);
