import React from "react";
import { Navigate } from "react-router";

const Protected = ({ children, isSignedIn }) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
