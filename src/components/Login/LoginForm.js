import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import RegisterForm from "./RegisterForm";

const LoginForm = () => {
  const buttonstyle = {
    marginRight: "8px",
  };

  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const signInHandler = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setErrors({
        email: email === "",
        password: password === "",
      });
      return;
    }

    try {
      const success = await handleLogin(email, password);
      if (success) {
        // Inicio de sesión exitoso
        navigate("/home");
        console.log("Se ha iniciado sesión exitosamente");
      } else {
        // Inicio de sesión incorrecto
        console.log("El inicio de sesión fue incorrecto");
        //Acá vamos a agregar un mensaje de error para el usuario
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      // Acá podemos meter otros errores de inicio de sesion en caso de ser necesario
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleToggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  if (showRegisterForm) {
    return <RegisterForm handleToggleForm={handleToggleForm} />;
  }

  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div
          className="col-12 col-md-6 col-lg-4 p-4"
          style={{
            background:
              "radial-gradient(circle at 100% 100%, #ffffff 0, #ffffff 5px, transparent 5px) 0% 0%/12px 12px no-repeat, radial-gradient(circle at 0 100%, #ffffff 0, #ffffff 5px, transparent 5px) 100% 0%/12px 12px no-repeat, radial-gradient(circle at 100% 0, #ffffff 0, #ffffff 5px, transparent 5px) 0% 100%/12px 12px no-repeat, radial-gradient(circle at 0 0, #ffffff 0, #ffffff 5px, transparent 5px) 100% 100%/12px 12px no-repeat, linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 14px) calc(100% - 24px) no-repeat, linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 24px) calc(100% - 14px) no-repeat, linear-gradient(173deg, transparent 0%, #e148cf 0%, rgba(196,93,210,1) 29%, rgba(159,116,214,1) 50%, rgba(112,147,220,1) 70%, #48abe0 100%)",
            borderRadius: "12px",
            padding: "14px",
            boxSizing: "border-box",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "black" }}>
            Menú de inicio de Sesión
          </h2>
          <Form onSubmit={signInHandler}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su Email"
                value={email}
                onChange={handleEmailChange}
                isInvalid={errors.email}
              />
              {errors.email && (
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
              disabled={errors.email || errors.password}
              style={buttonstyle}
            >
              Iniciar Sesión
            </Button>
            <Button
              className="btn-light btn-outline-info"
              onClick={handleToggleForm}
              style={buttonstyle}
            >
              Crear Cuenta
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
