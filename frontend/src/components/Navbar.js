import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    let memo = JSON.parse(localStorage.getItem("user"));
    setUser(memo?._doc);
    if (memo) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("user", null);
    setLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className="bg-teal-700 py-2 sticky top-0">
      <div className="max-w-4xl flex flex-row justify-between items-center lg:mx-auto text-white text-xl gap-4 mx-6 font-lora">
        <Link
          to="/"
          className="hover:opacity-90 font-medium mr-auto text-2xl font-cinzel"
        >
          📚Siva's Bookstore
        </Link>
        {isLoggedIn && (
          <Link to="/" className="hover:opacity-90 hidden lg:inline">
            Home
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/wishlist" className="hover:opacity-90 hidden lg:inline">
            Wish List
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/cart" className="hover:opacity-90 hidden lg:inline">
            Shopping Cart
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login" className="hover:opacity-90 hidden lg:inline">
            Login
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup" className="hover:opacity-90 hidden lg:inline">
            SignUp
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/user" className="hover:opacity-90 hidden lg:inline">
            <h1 className="text-slate-700 bg-teal-400 rounded py-1 px-2">
              {user?.name}
            </h1>
          </Link>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="hover:opacity-90 hidden lg:inline"
          >
            Logout
          </button>
        )}
        {!isOpen && (
          <button className="lg:hidden" onClick={() => setIsOpen(true)}>
            &#9776;
          </button>
        )}
        {isOpen && (
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        )}
      </div>
      {isOpen && (
        <div className="fixed flex flex-col justify-between items-center gap-4 w-full bg-teal-700 text-lg py-4 text-white">
          {isLoggedIn && (
            <Link to="/" className="hover:opacity-90">
              Home
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/wishlist" className="hover:opacity-90">
              Wish List
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/cart" className="hover:opacity-90">
              Shopping Cart
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="hover:opacity-90">
              Login
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup" className="hover:opacity-90">
              SignUp
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/user" className="hover:opacity-90">
              <h1 className="text-slate-700 bg-teal-400 rounded py-1 px-2">
                {user?.name}
              </h1>
            </Link>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="hover:opacity-90">
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
