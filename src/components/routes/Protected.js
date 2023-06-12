import React from "react";
import { Navigate } from "react-router";
import { auth } from "../firebaseConfig/firebaseConfig";

const Protected = ({ children }) => {
  const isAuthenticated = !!auth.currentUser;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
