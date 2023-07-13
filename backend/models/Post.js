const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: { type: String },
  author: { type: String },
  imageUrl: { type: String },
  description: { type: String },
  genre: { type: String },
  price: { type: String },
});

module.exports = mongoose.model("Posts", postSchema);
