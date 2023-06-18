import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import "firebase/auth";
import "firebase/database";

import { auth, database } from "../../firebaseConfig/firebaseConfig.js";

const AddNewUsersModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Registro de usuario utilizando Firebase
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Obtener el ID del usuario registrado
        const userId = userCredential.user.uid;

        // Crear un objeto con los datos del usuario
        const userData = {
          username,
          email,
          isAdmin,
        };

        // Guardar los datos del usuario en la base de datos de Firebase
        database
          .ref(`users/${userId}`)
          .set(userData)
          .then(() => {
            console.log("Registro exitoso");
            handleClose();
          })
          .catch((error) => {
            console.error("Error al guardar los datos del usuario:", error);
          });
      })
      .catch((error) => {
        console.error("Error de registro:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear un nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formIsAdmin">
            <Form.Label>Es Administrador</Form.Label>
            <div>
              <Form.Check
                inline
                label="Sí"
                type="radio"
                name="isAdmin"
                checked={isAdmin}
                onChange={() => setIsAdmin(true)}
              />
              <Form.Check
                inline
                label="No"
                type="radio"
                name="isAdmin"
                checked={!isAdmin}
                onChange={() => setIsAdmin(false)}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewUsersModal;
