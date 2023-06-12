import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import { AuthenticationContextProvider } from "./components/services/authentication/authentication.context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </React.StrictMode>
);
