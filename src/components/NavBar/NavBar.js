import React from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

const NavBar = ({ onLogout }) => {
  const navigation = useNavigate();

  const onLogoutHandler = () => {
    onLogout();
    navigation("/login");
  };

  const navbarStyle = {
    border: "4px solid",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 4",
  };

  const linkStyle = {
    border: "2px solid",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
    padding: "8px",
    marginRight: "10px",
  };

  const logoStyle = {
    border: "2px solid",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
    padding: "4px",
  };

  const buttonStyle = {
    border: "2px solid",
    marginLeft: "35px",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-light fixed-top"
        style={navbarStyle}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="." style={logoStyle}>
            Logo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="nav navbar-nav mx-auto">
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
            <form className="d-flex justify-content-between">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                style={buttonStyle}
              />
              <Button
                type="button"
                className="btn-light btn-outline-info"
                onClick={onLogoutHandler}
              >
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
