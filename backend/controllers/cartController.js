const Cart = require("../models/Cart");

const getCart = (req, res) => {
  Cart.findOne({ user: req.params.id })
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).send(error));
};

const postCart = async (req, res) => {
  const { user, id } = req.body;
  const entry = await Cart.findOne({ user });
  console.log(entry);

  if (entry) {
    const newArray = entry.items;
    newArray.push(id);
    entry.items = newArray;
    entry
      .save()
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).send(error));
  } else {
    Cart.create({
      user,
      items: [id],
    })
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).send(error));
  }
};

const deleteCart = async (req, res) => {
  const entry = await Cart.findOne({ user: req.params.userId });
  const newArray = entry.items;
  entry.items = newArray.filter((item) => item !== req.params.postId);
  entry
    .save()
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).send(error));
};

module.exports = { getCart, postCart, deleteCart };
