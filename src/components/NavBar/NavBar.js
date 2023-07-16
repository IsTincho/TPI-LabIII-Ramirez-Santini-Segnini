import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { CartContext } from "../services/cartcontext/cart.context";
import wolf from "../img/wolf.svg";
import cartLight from "../img/cart-light.svg";
import cartDark from "../img/cart-dark.svg";
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

  const myOrderClickHandler = () => {
    navigation("/orders");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handlePreventRedirection = (event) => {
    event.preventDefault();
    console.log("El evento fue prevenido");
  };

  const navbarStyle = {
    border: "0.5px solid",
    background: theme === "light" ? "#f8f9fa" : "#1a202c",
  };

  const logoStyle = {
    width: "40px",
  };

  const containerStyle = {
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      <nav
        className={`navbar navbar-expand-sm fixed-top navbar-light ${
          theme === "light" ? "bg-light" : "bg-dark"
        }`}
        style={navbarStyle}
      >
        <div className="container-fluid mx-auto">
          <a className=" pe-none navbar-brand mx-auto" href="."
          aria-disabled="true">
            <img
              src={wolf}
              style={logoStyle}
              onClick={handlePreventRedirection}
              alt="logo"
              
            />
          </a>
          <button
            className={`navbar-toggler ${
              theme === "light" ? "navbar-light" : "navbar-dark"
            }`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav mx-auto ml-auto">
              {user && user.isAdmin && (
                <li className="nav-item align-self-end">
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
              <li className="nav-item align-self-end">
                <button
                  className={` pe-none btn btn-${theme === "light" ? "dark" : "light"}`}
                  onClick={handlePreventRedirection}
                  aria-disabled="true"
                >
                  ¡Bienvenido {user?.username}!
                </button>
              </li>
              <li className="nav-item align-self-end">
                <Button
                  variant={theme === "light" ? "dark" : "light"}
                  onClick={myOrderClickHandler}
                >
                  Mi historial de compras
                </Button>
              </li>
              
            </ul>
            <div className="iconTheme  ">
                <ToggleTheme />
              </div>
          </div>
          <form className="d-flex justify-content-between">
            <div className="navbar-brand mx-auto mt-2 cart-dropdown-container">
              <img
                src={`${theme ==='light' ? cartDark : cartLight}`}
                style={logoStyle}
                alt="cart"
                onClick={toggleCart}
              />
              <span className="cart-item-count">{totalProductCount}</span>
              {isCartOpen && <Cart />}
            </div>
            <div className="btn-logout align-self-end">
              <Button
                type="button"
                className={`btn-light btn-outline-danger ${
                  theme === "dark" ? "btn-dark" : "btn-light"
                }`}
                onClick={onLogoutHandler}
              >
                Cerrar sesión
              </Button>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
