const User = require("../models/User");
const bcrypt = require("bcryptjs");

const postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    res.status(400).send("Email already exists.");
  } else {
    User.create({
      name,
      email,
      password: hashedPassword,
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(400).send("Error occured");
      });
  }
};

module.exports = { postSignup };
