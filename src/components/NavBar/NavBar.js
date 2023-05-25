import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

const NavBar = ({ onLogout }) => {
  console.log("In Dashboard!");
  const navigation = useNavigate();

  const onLogoutHandler = () => {
    onLogout();
    navigation("/login");
  };

  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href=".">
            Logo
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-center"
            id="mynavbar"
          >
            <ul class="nav navbar-nav navbar-center">
              <li class="nav-item">
                <a class="nav-link" href=".">
                  Link
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href=".">
                  Link
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href=".">
                  Link
                </a>
              </li>
            </ul>
          </div>
          <form class="d-flex justify-content-between">
            <input class="form-control me-2" type="text" placeholder="Search" />
            <Button variant="primary" onClick={onLogoutHandler}>
              Cerrar sesión
            </Button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
