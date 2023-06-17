import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const AdminProtected = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtected;
