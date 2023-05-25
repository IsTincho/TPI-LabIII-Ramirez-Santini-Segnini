import React from "react";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigation = useNavigate();

  const goBackHandler = () => {
    navigation("/login");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>La página no se encuentra disponible</h2>
      <Button className="w-25" onClick={goBackHandler}>
        Volver al Login
      </Button>
    </div>
  );
};

export default NotFound;
