import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { ThemeContext } from "../services/theme/theme.context";

import log from "../img/icon.svg";
import ToggleTheme from "../services/theme/ToggleTheme";
import OrderGrid from "./OrderGrid.js";

const OrderPage = () => {
  const { handleLogout } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
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
      <Navbar className={`bg-${theme} "fixed-top"`} expand="lg">
        <Navbar.Brand>
          <a href=".">
            <img
              src={log}
              style={logoStyle}
              onClick={handlePreventRediction}
              alt="logo"
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav>
            <Nav.Link>
              <button
                className={`btn btn-outline-${
                  theme === "light" ? "dark" : "light"
                }`}
              >
                Mi historial de compras
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
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
          <ToggleTheme />
        </Nav>
      </Navbar>
      <OrderGrid />
    </div>
  );
};

export default OrderPage;
