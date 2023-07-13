const express = require("express");
const {
  getCart,
  postCart,
  deleteCart,
} = require("../controllers/cartController");
const { protect } = require("../middlewares/protectMiddleware");
const router = express.Router();

router.get("/:id", protect, getCart);

router.post("/", protect, postCart);

router.delete("/:userId/:postId", protect, deleteCart);

module.exports = router;
