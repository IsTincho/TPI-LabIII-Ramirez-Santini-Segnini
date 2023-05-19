import React from "react";
import "./Login.css";
// Linea 63 a 66?
const Login = () => (
  <section class="h-100 gradient-form">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-5">
          <div class="card rounded-3 text-black ">
            <div class="card-body p-md-5 mx-md-4">
              <div class="text-center">
                <h4 class="mt-1 mb-5 pb-1">Iniciar Sesion</h4>
              </div>

              <form>
                <p className="text-center">Por favor ingresa con tu cuenta</p>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example11">
                    Nombre de Usuario:
                  </label>
                  <input
                    type="email"
                    id="form2Example11"
                    class="form-control"
                    placeholder="Teléfono o Email"
                  />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example22">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    id="form2Example22"
                    class="form-control"
                    placeholder="Contraseña"
                  />
                </div>

                <div class="text-center pt-1 mb-5 pb-1">
                  <button
                    class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                    type="button"
                  >
                    Iniciar Sesion
                  </button>
                  <br />
                  <a class="text-muted" href="#!">
                    Olvidé mi contraseña
                  </a>
                </div>

                <div class="d-flex flex-column align-items-center justify-content-center pb-4">
                  <p class="mb-0 me-2">¿No tienes una cuenta?</p>
                  <br></br>
                  <button type="button" class="btn btn-outline-danger">
                    Crear cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* 
          <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
            <div class="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">Brindando la ropa a mejor precio-calidad</h4>
            </div>
          </div> 
          */}
        </div>
      </div>
    </div>
  </section>
);

export default Login;
