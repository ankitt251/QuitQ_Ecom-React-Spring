import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../State/Store.js"; // Adjust the path based on your store location

const PrivateRoute = ({ element, allowedRoles }) => {
  const auth = useAppSelector((store) => store.auth);
  const jwt = auth.jwt || localStorage.getItem("jwt");
  const userRole = auth.user?.role || localStorage.getItem("role");

  if (!jwt) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to home or unauthorized page if role is not allowed
    return <Navigate to="/" />;
  }

  // Render the element if authentication and role match
  return element;
};

export default PrivateRoute;
