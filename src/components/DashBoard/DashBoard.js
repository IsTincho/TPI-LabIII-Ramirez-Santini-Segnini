import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthenticationContext } from "../services/authentication/authentication.context";
import { CartProvider } from "../services/cartcontext/cart.context";
import { ProductCatalogProvider } from "../services/productCatalogcontext/productCatalog.context";

import NavBar from "../NavBar/NavBar";
import ProductProvider from "../ProductProvider/ProductProvider";
import ProductCatalog from "../ProductCatalog/ProductCatalog";

const DashBoard = () => {
  const navigate = useNavigate();

  const { handleLogout } = useContext(AuthenticationContext);
  console.log("Dashboard");
  //const userName = user.email.split("@")[0];

  const onLogoutHandler = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div>
      <ProductCatalogProvider>
        <CartProvider>
          <NavBar onLogout={onLogoutHandler} />
          <ProductProvider />
          <ProductCatalog />
        </CartProvider>
      </ProductCatalogProvider>
    </div>
  );
};

export default DashBoard;
