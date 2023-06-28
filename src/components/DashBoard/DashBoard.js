import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthenticationContext } from "../services/authentication/authentication.context";

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
        <NavBar onLogout={onLogoutHandler} />
        <ProductProvider />
        <ProductCatalog />
    </div>
  );
};

export default DashBoard;
