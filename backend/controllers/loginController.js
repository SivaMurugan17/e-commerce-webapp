const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign(
        {
          id: user._id,
        },
        SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ ...user, token });
    } else {
      res.status(400).send("Wrong Password.");
    }
  } else {
    res.status(400).send("Email not found.");
  }
};

module.exports = { postLogin };
