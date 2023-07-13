import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))._doc;

  const handleLogout = () => {
    localStorage.setItem("user", null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-teal-50">
      <Navbar />
      <div className="h-[calc(100vh-48px)] sm:h-[calc(100vh-58px)] flex flex-col justify-center">
        <div className="flex flex-col gap-4 border border-slate-200 w-4/5 sm:w-1/2 lg:w-1/2 mx-auto text-xl text-left p-6 rounded-lg shadow-sm my-36 bg-white">
          <h1 className="text-4xl font-medium text-center mb-8 font-lora">
            Your Profile
          </h1>
          <h1>Name: {user?.name}</h1>
          <h2>Email: {user?.email}</h2>
          <button
            className="bg-teal-700 px-2 py-1 w-1/3 mx-auto rounded hover:bg-teal-900 text-white text-2xl"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
