import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

import ProductsManagementPage from "../ProductsManagementPage/ProductsManagementPage";
import UnknownPage from "../UnknownPage/UnknownPage";
import UserManagementScreen from "../UserManagementPage/UserManagementScreen";

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

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              onClick={handleUserManagement}
              className="btn btn-outline-light"
            >
              User Management
            </Nav.Link>
            <Nav.Link
              onClick={handleProductsManagement}
              className="btn btn-outline-light"
            >
              Products Management
            </Nav.Link>
            <Nav.Link
              onClick={handleUnknownPage}
              className="btn btn-outline-light"
            >
              Unknown Page
            </Nav.Link>
          </Nav>
          <Nav.Link onClick={handleGoBack} className="btn btn-outline-light">
            Volver al Inicio
          </Nav.Link>
          <Button variant="outline-danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Navbar.Collapse>
      </Navbar>
      {currentPage === "userManagementScreen" && <UserManagementScreen />}
      {currentPage === "productsManagement" && <ProductsManagementPage />}
      {currentPage === "unknownPage" && <UnknownPage />}
    </div>
  );
};

export default AdminPage;
