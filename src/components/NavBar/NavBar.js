import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
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
            <button class="btn btn-primary" type="button">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
