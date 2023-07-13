const express = require("express");
const { getPost, postPost, getBook } = require("../controllers/postController");
const { protect } = require("../middlewares/protectMiddleware");
const router = express.Router();

router.get("/", protect, getPost);

router.get("/:id", protect, getBook);

router.post("/", protect, postPost);

module.exports = router;
