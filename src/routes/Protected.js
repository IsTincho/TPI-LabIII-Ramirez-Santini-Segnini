import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "../components/services/authentication/authentication.context";

const Protected = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
