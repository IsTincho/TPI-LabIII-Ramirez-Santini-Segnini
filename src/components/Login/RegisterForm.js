import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import "firebase/auth";
import "firebase/database";

import { auth, database } from "../firebaseConfig/firebaseConfig.js";
import { borderStyle } from "./bordercolor.js";

const RegisterForm = ({ handleToggleForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          isAdmin: false, // Por defecto, los nuevos usuarios no son administradores
        };

        // Guardar los datos del usuario en la base de datos de Firebase
        database
          .ref(`users/${userId}`)
          .set(userData)
          .then(() => {
            console.log("Registro exitoso");
            handleToggleForm();
          })
          .catch((error) => {
            console.error("Error al guardar los datos del usuario:", error);
          });
      })
      .catch((error) => {
        console.error("Error de registro:", error);
      });
  };

  const handleLogin = () => {
    handleToggleForm();
  };

  const buttonstyle = {
    marginRight: "8px",
  };

  const styles = {
    padding: "15px",
  };

  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-4 p-4" style={borderStyle}>
          <h2 className="text-center mb-4" style={{ color: "black" }}>
            Menú de Registro
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlid="formUsername">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlid="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlid="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center" style={styles}>
              {" "}
              {/* Contenedor con clase d-flex para alinear los botones en línea */}
              <Button
                className="btn-light btn-outline-info"
                type="submit"
                style={buttonstyle}
              >
                Registrarse
              </Button>
              <Button
                className="btn-light btn-outline-info"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
