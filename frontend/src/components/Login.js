import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", user, config)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((error) => {
        setIsError(true);
        if (error.response) {
          setError(error.response.data);
        }
        console.log(error);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-sm w-4/5 mx-auto flex flex-col justify-center h-[calc(100vh-48px)]">
        <h1 className="text-3xl sm:text-4xl mb-6 font-merriweather">Log in</h1>
        <form
          className="flex flex-col gap-2 border border-solid border-slate-200 rounded-xl shadow p-4 "
          onSubmit={handleSubmit}
        >
          <label className="text-xl text-left">Email:</label>
          <input
            className="border border-solid border-slate-200 text-lg rounded-lg p-1"
            placeholder="Your email"
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          ></input>
          <label className="text-xl text-left">Password:</label>
          <input
            className="border border-solid border-slate-200 text-lg rounded-lg p-1"
            placeholder="Your password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          ></input>
          {isError && (
            <p className="text-lg bg-red-300 rounded-lg p-1 border border-red-700 text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-teal-700 p-1 text-xl rounded-lg text-white hover:text-bg-teal-900"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
