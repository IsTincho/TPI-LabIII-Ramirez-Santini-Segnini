import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import UserManagementPage from "../UserManagementPage/UserManagementPage";
import ProductsManagementPage from "../ProductsManagementPage/ProductsManagementPage";
import UnknownPage from "../UnknownPage/UnknownPage";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const AdminPage = () => {
  const { user, handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("userManagement");

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleUserManagement = () => {
    setCurrentPage("userManagement");
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
        <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={handleUserManagement}>User Management</Nav.Link>
            <Nav.Link onClick={handleProductsManagement}>
              Products Management
            </Nav.Link>
            <Nav.Link onClick={handleUnknownPage}>Unknown Page</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Navbar.Collapse>
      </Navbar>
      {currentPage === "userManagement" && <UserManagementPage />}
      {currentPage === "productsManagement" && <ProductsManagementPage />}
      {currentPage === "unknownPage" && <UnknownPage />}
    </div>
  );
};

export default AdminPage;
