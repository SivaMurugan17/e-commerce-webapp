const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const port = 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/posts", require("./routes/postRoute"));
app.use("/wishlist", require("./routes/wishlistRoute"));
app.use("/cart", require("./routes/cartRoute"));
app.use("/login", require("./routes/loginRoute"));
app.use("/signup", require("./routes/signupRoute"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
