import React from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import log from "../img/logo.svg";
import cart from "../img/cart.svg";
const NavBar = ({ onLogout }) => {
  const navigation = useNavigate();

  const onLogoutHandler = () => {
    onLogout();
    navigation("/login");
  };

  const navbarStyle = {
    border: "0.5px solid",
  };

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
        style={navbarStyle}
      >
        <div className="container-fluid mx-auto">
          <a className="navbar-brand mx-auto" href=".">
            <img src={log} style={logoStyle} />
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
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                {/* Agregar a estos "a" la funcion para filtrar productos en un onClick */}
                <a className="nav-link" style={linkStyle}>
                  Hombre
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={linkStyle}>
                  Mujer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={linkStyle}>
                  Accesorios
                </a>
              </li>
            </ul>
          </div>
          <form className="d-flex justify-content-between">
            <a className="navbar-brand mx-auto" href=".">
              <img src={cart} style={logoStyle} />
            </a>
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
