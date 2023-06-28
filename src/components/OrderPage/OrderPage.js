import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/authentication.context";

import log from "../img/icon.svg";
import ToggleTheme from "../ui/ToggleTheme";
import OrderGrid from "./OrderGrid.js";

const OrderPage = () => {
  const { handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate("/home");
  };

  const linkStyle = {
    color: "black",
    background: "white",
    border: "2px solid",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
    padding: "8px",
    marginLeft: "290px",
  };

  const logoStyle = {
    width: "40px",
    marginLeft: "12px",
  };

  const navbarStyle = {
    border: "0.5px solid",
    maxHeight: "72px",
  };

  const buttonStyle = {
    border: "2px solid",
    marginLeft: "35px",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
    padding: "8px",
  };

  const handlePreventRediction = (event) => {
    event.preventDefault();
    console.log("El evento fue prevenido");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" style={navbarStyle} className="fixed-top">
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
              <button style={linkStyle}>Mi historial de compras</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleGoBack} style={buttonStyle}>
            Volver al Inicio
          </Nav.Link>
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
