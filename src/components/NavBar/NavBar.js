import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { CartContext } from "../services/cartcontext/cart.context";
import log from "../img/icon.svg";
import cart from "../img/cart.svg";
import Cart from "../Cart/Cart";
import "../NavBar/NavBar.css";
import ToggleTheme from "../services/theme/ToggleTheme";
import { ThemeContext } from "../services/theme/theme.context";

const NavBar = ({ onLogout }) => {
  const navigation = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const { totalProductCount } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { theme } = useContext(ThemeContext);

  const onLogoutHandler = () => {
    onLogout();
    navigation("/login");
  };

  const adminPageClickHandler = () => {
    navigation("/admin");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handlePreventRediction = (event) => {
    event.preventDefault();
    console.log("El evento fue prevenido");
  };

  const navbarStyle = {
    border: "0.5px solid",
    background: theme === "light" ? "#f8f9fa" : "#1a202c",
  };

  const linkStyle = {
    color: theme === "light" ? "#000" : "#fff",
    background: theme === "light" ? "#fff" : "#000",
    padding: "8px",
    marginRight: "10px",
  };

  const buttonStyle = {
    border: `2px solid ${theme === "light" ? "#63e4f2" : "#ed409f"}`,
    marginLeft: "35px",
    padding: "8px",
  };

  const ulStyle = {
    marginLeft: "93px",
  };

  const logoStyle = {
    width: "40px",
  };

  return (
    <div
      className={`book-item-container ${
        theme === "dark" && "book-item-container-dark"
      }`}
    >
      <nav
        className={`navbar navbar-expand-sm fixed-top navbar-light ${
          theme === "light" ? "bg-secondary" : "bg-dark"
        }`}
        style={navbarStyle}
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
                <li>
                  <Button
                    className={`btn-light btn-outline-info ${
                      theme === "dark" ? "btn-dark" : ""
                    }`}
                    onClick={adminPageClickHandler}
                  >
                    AdminPage
                  </Button>
                </li>
              )}
              <li>
                <a style={linkStyle} onClick={handlePreventRediction}>
                  ¡Bienvenido {user.username}!
                </a>
              </li>
            </ul>
          </div>
          <form className="d-flex justify-content-between">
            <div className="navbar-brand mx-auto mt-2 cart-dropdown-container">
              <img
                src={cart}
                style={logoStyle}
                alt="cart"
                onClick={toggleCart}
              />
              <span className="cart-item-count">{totalProductCount}</span>
              {isCartOpen && <Cart />}
            </div>
            <Button
              type="button"
              className={`btn-light btn-outline-info ${
                theme === "dark" ? "btn-dark" : ""
              }`}
              onClick={onLogoutHandler}
            >
              Cerrar sesión
            </Button>
          </form>
          <div>
            <ToggleTheme />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
