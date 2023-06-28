import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";

import App from "./App";
import { AuthenticationContextProvider } from "./components/services/authentication/authentication.context";
import { CartProvider } from "./components/services/cartcontext/cart.context";
import { OrderProvider } from "./components/services/orderContext/order.context";
import { ThemeContextProvider } from "./components/services/theme/theme.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <React.StrictMode>
      <AuthenticationContextProvider>
        <CartProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CartProvider>
      </AuthenticationContextProvider>
    </React.StrictMode>
  </ThemeContextProvider>
);
