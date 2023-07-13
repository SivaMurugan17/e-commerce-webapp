const express = require("express");
const {
  getWishlist,
  postWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");
const { protect } = require("../middlewares/protectMiddleware");
const router = express.Router();

router.get("/:id", protect, getWishlist);

router.post("/", protect, postWishlist);

router.delete("/:userId/:postId", protect, deleteWishlist);

module.exports = router;
