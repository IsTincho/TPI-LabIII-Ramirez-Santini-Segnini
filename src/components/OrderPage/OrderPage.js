import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { ThemeContext } from "../services/theme/theme.context";

import wolf from "../img/wolf.svg";
import ToggleTheme from "../services/theme/ToggleTheme";
import "../Admin/AdminPage/AdminPage.css";
import OrderGridACT from "./OrderGridACT";

const OrderPage = () => {
  const { handleLogout } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home");
  };

  const logoStyle = {
    width: "40px",
    marginLeft: "12px",
  };

  const handlePreventRediction = (event) => {
    event.preventDefault();
    console.log("El evento fue prevenido");
  };

  return (
    <div className={`bg-${theme}`}>
      <Navbar>
        <Navbar.Brand
          className={`text-${theme === "light" ? "dark" : "light"}`}
        >
          <a href="." className="pe-none" aria-disabled="true">
            <img
              src={wolf}
              style={logoStyle}
              onClick={handlePreventRediction}
              alt="logo"
            />
          </a>
        </Navbar.Brand>
        <h2 className={`${
              theme === "light" ? "text-dark" : "text-white"
            }`} >Historial de Pedidos de <span className="text-decoration-underline">{user?.username}</span> </h2>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        ></Navbar.Collapse>
        
        <Nav className="ml-auto gap-1">
        
          <ToggleTheme />
          <button
            onClick={handleGoBack}
            className={`btn btn-outline-${
              theme === "light" ? "dark" : "light"
            }`}
          >
            Volver al Inicio
          </button>

          <Button onClick={handleLogout} variant="outline-danger">
            Cerrar Sesión
          </Button>
        </Nav>
      </Navbar>
      <OrderGridACT />
    </div>
  );
};

export default OrderPage;
