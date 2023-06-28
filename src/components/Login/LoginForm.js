import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import RegisterForm from "./RegisterForm";
import { borderStyle } from "./bordercolor";
import { TiEyeOutline, TiEye } from "react-icons/ti";

import ToggleTheme from "../ui/ToggleTheme";

import { ThemeContext } from "../services/theme.context";


const LoginForm = () => {

  const {theme} = useContext(ThemeContext)

  const buttonStyle = {
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
  const [showPassword, setShowPassword] = useState(false);

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
          <h2 className="text-center mb-4">
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

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Ingrese su Contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <TiEyeOutline /> : <TiEye />}
                  </span>
                </div>
              </div>
              {errors.password && (
                <div className="invalid-feedback">Ingrese su contraseña</div>
              )}
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-outline-info"
                type="submit"
                style={buttonStyle}
              >
                Iniciar Sesión
              </button>
              <button
                className="btn btn-outline-info"
                type="button"
                onClick={handleToggleForm}
              >
                Registrarse
              </button>
            </div>
            <ToggleTheme />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
