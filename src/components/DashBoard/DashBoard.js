import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { AuthenticationContext } from "../services/authentication/authentication.context";
import { CartProvider  } from "../services/cartcontext/cart.context";

import NavBar from "../NavBar/NavBar";
import ProductProvider from "../ProductProvider/ProductProvider";
import ProductCatalog from "../ProductCatalog/ProductCatalog";
import Cart from "../Cart/Cart";

const DashBoard = () => {
  
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthenticationContext);
  console.log("Dashboard");
  //const userName = user.email.split("@")[0];

  const onLogoutHandler = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div>
      <CartProvider>
        <NavBar onLogout={onLogoutHandler} />
        <ProductProvider />
        <ProductCatalog/>
      </CartProvider>
    </div>
  );
};

export default DashBoard;
