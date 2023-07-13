const WishList = require("../models/WishList");

const getWishlist = (req, res) => {
  WishList.findOne({ user: req.params.id })
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).send(error));
};

const postWishlist = async (req, res) => {
  const { user, id } = req.body;
  const entry = await WishList.findOne({ user });
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
    WishList.create({
      user,
      items: [id],
    })
      .then((doc) => res.status(200).json(doc))
      .catch((error) => res.status(400).send(error));
  }
};

const deleteWishlist = async (req, res) => {
  const entry = await WishList.findOne({ user: req.params.userId });
  const newArray = entry.items;
  entry.items = newArray.filter((item) => item !== req.params.postId);
  entry
    .save()
    .then((doc) => res.status(200).json(doc))
    .catch((error) => res.status(400).send(error));
};

module.exports = { getWishlist, postWishlist, deleteWishlist };
