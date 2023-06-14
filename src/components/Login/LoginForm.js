import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import RegisterForm from "./RegisterForm";
import { borderStyle } from "./bordercolor";

const LoginForm = () => {
  const buttonstyle = {
    marginRight: "8px",
  };

  const navigate = useNavigate();
  const { user, handleLogin } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

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
        navigate("/home");
        console.log("Se ha iniciado sesión exitosamente");
      } else {
        console.log("El inicio de sesión fue incorrecto");
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
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
        <div className="col-12 col-md-6 col-lg-4 p-4" style={borderStyle}>
          <h2 className="text-center mb-4" style={{ color: "black" }}>
            Menú de inicio de Sesión
          </h2>
          <form onSubmit={signInHandler}>
            <div className="mb-3" controlId="formGroupEmail">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Ingrese su Email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <div className="invalid-feedback">
                  Ingrese su correo electrónico
                </div>
              )}
            </div>
            <div className="mb-3" controlId="formGroupPassword">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Ingrese su Contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <div className="invalid-feedback">Ingrese su contraseña</div>
              )}
            </div>
            <button
              className="btn btn-light btn-outline-info"
              type="submit"
              disabled={errors.email || errors.password}
              style={buttonstyle}
            >
              Iniciar Sesión
            </button>
            <button
              className="btn btn-light btn-outline-info"
              onClick={handleToggleForm}
              style={buttonstyle}
            >
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
