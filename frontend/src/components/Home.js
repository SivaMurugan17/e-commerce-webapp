import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "./Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", config)
      .then((doc) => {
        setPosts(doc.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-teal-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 p-4">
        {posts.map((post, id) => {
          return (
            <Link to={`/book/${post._id}`}>
              <Post
                key={id}
                name={post.name}
                author={post.author}
                imageUrl={post.imageUrl}
                description={post.description}
                genre={post.genre}
                price={post.price}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
