import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddNewUsersModal from "./AddNewUsersModal";

const AddNewUsers = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = ({ username, email, password }) => {
    // Haz lo que necesites con los datos del usuario (agregar a la base de datos, etc.)
    console.log("Datos del nuevo usuario:", { username, email, password });
    handleToggleModal();
  };

  return (
    <>
      <Button variant="primary" onClick={handleToggleModal}>
        Agregar Nuevo Usuario
      </Button>
      <AddNewUsersModal
        show={showModal}
        handleClose={handleToggleModal}
        handleSubmit={handleFormSubmit}
      />
    </>
  );
};

export default AddNewUsers;
