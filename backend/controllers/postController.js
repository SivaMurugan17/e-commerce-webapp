const Post = require("../models/Post");

const getPost = (req, res) => {
  Post.find()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((error) => console.log(error));
};

const getBook = (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  Post.findOne({ _id: id })
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Error occured");
    });
};

const postPost = (req, res) => {
  const { name, author, imageUrl, description, genre, price } = req.body;
  Post.create({
    name,
    author,
    imageUrl,
    description,
    genre,
    price,
  })
    .then((doc) => {
      res.status(200).json(doc);
      console.log(doc);
    })
    .catch((error) => console.log(error));
};

module.exports = { getPost, postPost, getBook };
