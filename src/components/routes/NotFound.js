import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../Login/LoginForm.css"

import error from "./404.svg"
const NotFound = () => {
  const navigation = useNavigate();

  const goBackHandler = () => {
    navigation("/home");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
    
      <div className="text-center">
      <img src={error} className="img-404"/>
        <h4 className="alert-heading">Error 404!</h4>
        <p>Parece que estás intentando acceder a una página que no existe.</p>
        <p>
          O quizás estás intentando acceder a una página a la que no tienes
          permisos suficientes.
        </p>
        <Button
          className="w-25 btn-light btn-outline-success"
          onClick={goBackHandler}
        >
          Volver al Inicio
        </Button>
      </div>
      
    </div>
  );
};

export default NotFound;
