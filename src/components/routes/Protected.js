import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { auth } from "../firebaseConfig/firebaseConfig";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const Protected = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 900);

    return () => clearTimeout(timeout);
  }, []);

  if (!render) {
    return "";
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
