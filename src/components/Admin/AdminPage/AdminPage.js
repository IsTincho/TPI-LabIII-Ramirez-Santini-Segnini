import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import ProductsManagementPage from "../ProductsManagementPage/ProductsManagementPage";
import UnknownPage from "../UnknownPage/UnknownPage";
import UserManagementScreen from "../UserManagementPage/UserManagementScreen";
import ToggleTheme from "../../services/theme/ToggleTheme";
import { ThemeContext } from "../../services/theme/theme.context";

const AdminPage = () => {
  const { user, handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("userManagementScreen");

  const handleGoBack = () => {
    navigate("/home");
  };

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
  return (
    <div className={`bg-${theme}`}>
      <Navbar>
        <Navbar.Brand
          className={`text-${theme === "light" ? "dark" : "light"}`}
        >
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              onClick={handleUserManagement}
              className={`nav-link text-${
                theme === "light" ? "dark" : "light"
              } border-${theme === "light" ? "dark" : "light"}`}
            >
              User Management
            </Nav.Link>
            <Nav.Link
              onClick={handleProductsManagement}
              className={`nav-link text-${
                theme === "light" ? "dark" : "light"
              } border-${theme === "light" ? "dark" : "light"}`}
            >
              Products Management
            </Nav.Link>

            {/*<Nav.Link
              onClick={handleUnknownPage}
              className={`text-${theme === "light" ? "dark" : "light"}`}
            >
              Unknown Page
            </Nav.Link>*/}
            <Nav.Link
              onClick={handleGoBack}
              className={`text-${theme === "light" ? "dark" : "light"}`}
            >
              Volver al Inicio
            </Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
          <ToggleTheme />
        </Navbar.Collapse>
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
