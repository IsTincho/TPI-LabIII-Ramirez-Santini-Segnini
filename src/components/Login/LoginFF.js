import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Form } from "react-bootstrap";

const LoginFF = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    user: false,
    password: false,
  });
  const navigation = useNavigate();

  useEffect(() => {
    setErrors({
      user: false,
      password: false,
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user === "" || password === "") {
      setErrors({
        user: user === "",
        password: password === "",
      });
      return;
    }

    signInHandler();
  };

  const signInHandler = () => {
    onLogin();
    navigation("/home");
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
    setErrors({ ...errors, user: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-4 border border-dark p-4">
          <h2 className="text-center mb-4">Menú de inicio de Sesión</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su Email"
                value={user}
                onChange={handleUserChange}
                isInvalid={errors.user}
              />
              {errors.user && (
                <Form.Control.Feedback type="invalid">
                  Ingrese su correo electrónico
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su Contraseña"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  Ingrese su contraseña
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Button
              className="btn-light btn-outline-info"
              type="submit"
              disabled={errors.user || errors.password}
            >
              Iniciar Sesión
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginFF;
