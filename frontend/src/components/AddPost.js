import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

const AddPost = () => {
  const [post, setPost] = useState({});
  const handleImage = (e) => {
    setPost({ ...post, image: e.target.files[0] });
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const upload = async (imageRef, image) => {
    try {
      const doc = await uploadBytes(imageRef, image);
      console.log("Uploaded sucessfully");
      const url = await getDownloadURL(doc.ref);
      console.log(url);
      const res = await axios.post("http://localhost:5000/posts", {
        ...post,
        imageUrl: url,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${post.image.name}-${v4()}`);
    upload(imageRef, post.image);
  };

  return (
    <div>
      <h2>Add your book!</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={post.name}
          onChange={handleChange}
        ></input>
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
        ></input>
        <label>Image</label>
        <input type="file" onChange={handleImage}></input>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={post.description}
          onChange={handleChange}
        ></input>
        <label>Genre</label>
        <input
          type="text"
          name="genre"
          value={post.genre}
          onChange={handleChange}
        ></input>
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={post.price}
          onChange={handleChange}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default AddPost;
