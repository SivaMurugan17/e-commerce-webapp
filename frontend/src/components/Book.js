import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isWish, setWish] = useState(false);
  const [isCart, setCart] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    fetchWishList();
    fetchCart();
    axios
      .get(`http://localhost:5000/posts/${id}`, config)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchWishList = async () => {
    const response = await axios.get(
      `http://localhost:5000/wishlist/${
        JSON.parse(localStorage.getItem("user"))._doc._id
      }`,
      config
    );
    let array = [];
    if (response.data) array = response.data.items;
    setWish(array.includes(id));
  };

  const fetchCart = async () => {
    const response = await axios.get(
      `http://localhost:5000/cart/${
        JSON.parse(localStorage.getItem("user"))._doc._id
      }`,
      config
    );
    let array = [];
    if (response.data) array = response.data.items;
    setCart(array.includes(id));
  };

  const handleWishList = () => {
    axios
      .post(
        "http://localhost:5000/wishlist",
        {
          user: JSON.parse(localStorage.getItem("user"))._doc._id,
          id: book._id,
        },
        config
      )
      .then((res) => {
        setWish(true);
      })
      .catch((error) => console.log(error));
  };

  const handleRemoveWishList = () => {
    axios
      .delete(
        `http://localhost:5000/wishlist/${
          JSON.parse(localStorage.getItem("user"))._doc._id
        }/${id}`,
        config
      )
      .then((doc) => {
        setWish(false);
      })
      .catch((error) => console.log(error));
  };
  const handleCart = () => {
    axios
      .post(
        "http://localhost:5000/cart",
        {
          user: JSON.parse(localStorage.getItem("user"))._doc._id,
          id: book._id,
        },
        config
      )
      .then((res) => {
        setCart(true);
      })
      .catch((error) => console.log(error));
  };
  const handleRemoveCart = () => {
    axios
      .delete(
        `http://localhost:5000/cart/${
          JSON.parse(localStorage.getItem("user"))._doc._id
        }/${id}`,
        config
      )
      .then((doc) => {
        setCart(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-teal-50 min-h-screen">
      <Navbar />
      <div className="mx-4 max-w-2xl border border-solid border-slate-300 rounded-2xl shadow-xl sm:mx-auto my-12 flex flex-col sm:flex-row-reverse justify-between items-center px-4 py-6 bg-white gap-4">
        <img src={book.imageUrl} alt="" className="w-2/3 h-64 mx-auto" />
        <div className="flex flex-col gap-4 max-w-md justify-between">
          <h1 className="text-3xl sm:text-4xl text-left text-indigo-700 font-cinzel font-medium">
            {book.name}
          </h1>
          <h2 className="text-2xl text-left italic">{book.author}</h2>
          <p className="text-xl font-merriweather">{book.description}</p>
          <h3 className="text-2xl bg-yellow-300 w-3/4 sm:w-1/2  px-3 py-2 rounded-2xl">
            Price: {book.price}
          </h3>
          <h3 className="text-2xl text-left">Genre: {book.genre}</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
            {!isWish && (
              <button
                className=" text-xl sm:text-xl w-3/4 sm:w-2/5 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700"
                onClick={handleWishList}
              >
                Add to Wishlist
              </button>
            )}
            {isWish && (
              <button
                className=" text-xl sm:text-xl w-3/4 sm:w-2/5 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700"
                onClick={handleRemoveWishList}
              >
                Remove from Wishlist
              </button>
            )}
            {!isCart && (
              <button
                className="text-xl sm:text-xl w-3/4 sm:w-2/5 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700"
                onClick={handleCart}
              >
                Add to Cart
              </button>
            )}
            {isCart && (
              <button
                className="text-xl sm:text-xl w-3/4 sm:w-2/5 bg-red-600 text-white rounded-lg py-2 hover:bg-red-700"
                onClick={handleRemoveCart}
              >
                Remove from Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
