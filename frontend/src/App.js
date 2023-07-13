import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import WishList from "./components/WishList";
import Cart from "./components/Cart";
import AddPost from "./components/AddPost";
import User from "./components/User";
import PrivateRoute from "./components/PrivateRoute";
import Book from "./components/Book";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <WishList />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/user" element={<User />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
