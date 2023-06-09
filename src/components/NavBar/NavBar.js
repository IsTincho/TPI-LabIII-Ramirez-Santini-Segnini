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
  };

  const logoStyle = {
    border: "2px solid",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
    padding: "4px",
  };

  const buttonStyle = {
    border: "2px solid",
    borderImage: "linear-gradient(to right, #63e4f2, #ed409f) 1",
  };

  const buttonHoverStyle = {
    backgroundColor: "rgba(237, 64, 159, 0.3)",
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
          <div
            className="collapse navbar-collapse justify-content-center"
            id="mynavbar"
          >
            <ul className="nav navbar-nav navbar-center">
              <li className="nav-item">
                <a className="nav-link" href="." style={linkStyle}>
                  Hombre
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="." style={linkStyle}>
                  Mujer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="." style={linkStyle}>
                  Accesorios
                </a>
              </li>
            </ul>
          </div>
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
      </nav>
    </div>
  );
};

export default NavBar;
