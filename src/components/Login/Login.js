import React, { useRef, useState } from "react";

import "./Login.css";
import { useNavigate } from "react-router";

const Login = () => {

  return (
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
        };

export default Login;
