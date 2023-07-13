import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Post from "./Post";
import { Link } from "react-router-dom";

const WishList = () => {
  const [wish, setWish] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const response = await axios.get(
      `http://localhost:5000/wishlist/${
        JSON.parse(localStorage.getItem("user"))._doc._id
      }`,
      config
    );
    let array = [];
    if (response.data) array = response.data.items;
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      const res = await axios.get(
        `http://localhost:5000/posts/${array[i]}`,
        config
      );
      newArray.push(res.data);
    }
    setWish(newArray);
  };

  const handleRemove = (id) => {
    axios
      .delete(
        `http://localhost:5000/wishlist/${
          JSON.parse(localStorage.getItem("user"))._doc._id
        }/${id}`,
        config
      )
      .then((doc) => {
        fetchPost();
        // console.log(doc);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-teal-50 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-medium mt-6 font-cinzel">Your WishList</h1>
      <div className="flex flex-col sm:grid sm:grid-cols-2 max-w-4xl mx-auto py-6">
        {wish.map((item) => {
          return (
            <div className="max-w-sm w-3/4 mx-auto">
              <Link to={`/book/${item._id}`}>
                <Post
                  imageUrl={item.imageUrl}
                  name={item.name}
                  author={item.author}
                />
              </Link>
              <button
                className="bg-red-600 rounded-3xl text-xl text-white p-2"
                onClick={() => handleRemove(item._id)}
              >
                Remove from wishlist
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
