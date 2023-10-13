import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const AdminProtected = ({ children }) => {
  const [render, setRender] = useState(false);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 900);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timeout);
  }, []);

  if (!render) {
    return "";
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtected;
