import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/authentication.context";

import { borderStyle } from "../Login/bordercolor.js";
import log from "../img/icon.svg";
import cart from "../img/cart.svg";
import Cart from "../Cart/Cart";
import "../NavBar/NavBar.css";

const NavBar = ({ onLogout }) => {
  const navigation = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const onLogoutHandler = () => {
    onLogout();
    navigation("/login");
  };

  const adminPageClickHandler = () => {
    navigation("/admin"); // Redirige al usuario a la página "/admin" al hacer clic en el botón "AdminPage"
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Cambia el estado del carrito abierto o cerrado
  };

  // Funcion para prevenir el redireccionamiento innecesario. (borrrar si es necesario)
  const handlePreventRediction = (event) => {
    event.preventDefault();
    console.log("El evento fue prevenido");
  };

  // const navbarStyle = {
  //   border: "0.5px solid",
  // };

  const linkStyle = {
    border: "2px solid",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
    padding: "8px",
    marginRight: "10px",
  };

  const buttonStyle = {
    border: "2px solid",
    marginLeft: "35px",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
    padding: "8px",
  };

  const ulStyle = {
    marginLeft: "93px",
  };

  const logoStyle = {
    width: "40px",
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light fixed-top"
        style={borderStyle}
      >
        <div className="container-fluid mx-auto">
          <a className="navbar-brand mx-auto" href=".">
            <img
              src={log}
              style={logoStyle}
              onClick={handlePreventRediction}
              alt="logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="mynavbar"
            style={ulStyle}
          >
            <ul
              className="navbar-nav mx-auto"
              style={{ display: "flex", alignItems: "center" }}
            >
              {user && user.isAdmin && (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    style={linkStyle}
                    onClick={adminPageClickHandler}
                  >
                    AdminPage
                  </button>
                </li>
              )}
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={linkStyle}
                  href="."
                  onClick={handlePreventRediction}
                >
                  ¡Bienvenido {user.username}!
                </a>
              </li>
            </ul>
          </div>
          <form className="d-flex justify-content-between">
            <div className="navbar-brand mx-auto cart-dropdown-container">
              <img
                src={cart}
                style={logoStyle}
                alt="cart"
                onClick={toggleCart} // Agrega el evento onClick para abrir o cerrar el carrito al hacer clic en la imagen
              />
              {isCartOpen && <Cart />}{" "}
              {/* Muestra el componente Cart solo si el carrito está abierto */}
            </div>

            <Button
              style={buttonStyle}
              type="button"
              className="btn-light btn-outline-info"
              onClick={onLogoutHandler}
            >
              Cerrar sesión
            </Button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
