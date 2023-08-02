import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css"
import { Button, Navbar, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import ProductsManagementPage from "../ProductsManagementPage/ProductsManagementPage";
import UnknownPage from "../UnknownPage/UnknownPage";
import UserManagementScreen from "../UserManagementPage/UserManagementScreen";
import ToggleTheme from "../../services/theme/ToggleTheme";
import { ThemeContext } from "../../services/theme/theme.context";
import wolf from "../../img/wolf.svg";
const AdminPage = () => {
  const { user, handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("userManagementScreen");

  const handleUserManagement = () => {
    setCurrentPage("userManagementScreen");
  };

  const handleProductsManagement = () => {
    setCurrentPage("productsManagement");
  };

  const handleUnknownPage = () => {
    setCurrentPage("unknownPage");
  };

  const { theme } = useContext(ThemeContext);
  //xd

  const handleGoBack = () => {
    navigate("/home");
  };

  const logoStyle = {
    width: "40px",
    marginLeft: "12px",
  };
  return (
    <div className={`bg-${theme}`}>
      <Navbar>
        <Navbar.Brand
          className={`text-${theme === "light" ? "dark" : "light"}`}
        >
        <div className="admin-pages">

        
          <a href="." className="pe-none" aria-disabled="true">
            <img src={wolf} style={logoStyle} alt="logo" />
          </a>

          <div className="admins-names">
            <Nav.Link
              onClick={handleUserManagement}
              className="admin-title">
              Administraccion de Usuarios
            </Nav.Link>
            <Nav.Link
              onClick={handleProductsManagement}
              className="admin-title"
            >
              Administraccion de Productos
            </Nav.Link>
            </div>
          </div>
        </Navbar.Brand>
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
          <Button variant="outline-danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Nav>
      </Navbar>
      {currentPage === "userManagementScreen" && (
        <UserManagementScreen theme={theme} />
      )}
      {currentPage === "productsManagement" && (
        <ProductsManagementPage theme={theme} />
      )}
      {currentPage === "unknownPage" && <UnknownPage theme={theme} />}
    </div>
  );
};

export default AdminPage;
