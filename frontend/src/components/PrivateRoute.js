import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  if (JSON.parse(localStorage.getItem("user"))) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
