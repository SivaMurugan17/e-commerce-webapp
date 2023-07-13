import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Post from "./Post";
import { Link } from "react-router-dom";

const Cart = () => {
  const [wish, setWish] = useState([]);
  const [amount, setAmount] = useState(0);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const response = await axios.get(
      `http://localhost:5000/cart/${
        JSON.parse(localStorage.getItem("user"))._doc._id
      }`,
      config
    );
    let array = [];
    if (response.data) array = response.data?.items;
    const newArray = [];
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      const res = await axios.get(
        `http://localhost:5000/posts/${array[i]}`,
        config
      );
      newArray.push(res.data);
      total += Number(res.data.price.substring(1));
    }
    setAmount(total);
    setWish(newArray);
  };

  const handleRemove = (id) => {
    axios
      .delete(
        `http://localhost:5000/cart/${
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
  const handleOrder = () => {
    alert("Order Placed!");
  };
  return (
    <div className="bg-teal-50 pb-6 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-medium mt-6 font-cinzel">
        Your Shopping Cart
      </h1>
      <div className="flex flex-col items-center sm:grid  sm:grid-cols-2 max-w-4xl mx-auto pt-6">
        {wish.map((item) => {
          return (
            <div className="max-w-sm mx-auto w-3/4">
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
                Remove from cart
              </button>
            </div>
          );
        })}
      </div>
      <div className="max-w-4xl w-9/10 lg:mx-auto my-6 p-6 text-2xl sm:text-3xl rounded-xl bg-slate-100 font-medium mx-4 shadow">
        <div className="flex flex-row  items-center">
          <h1 className="text-center basis-1/2 font-lora">
            Your Total Orders:
          </h1>
          <div className="bg-white border border-slate-200 rounded-lg py-2 px-4 font-normal w-full basis-1/2 sm:basis-1/3 text-center shadow-sm">
            $ {amount.toFixed(2)}
          </div>
        </div>

        <button
          className="bg-teal-700 hover:bg-teal-600 rounded-lg p-2 my-6 mt-12 text-white font-normal w-3/4 sm:w-1/3"
          onClick={handleOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
