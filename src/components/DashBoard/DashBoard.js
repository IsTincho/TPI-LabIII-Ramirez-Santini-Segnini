import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthenticationContext } from "../services/authentication/authentication.context";

import NavBar from "../NavBar/NavBar";
import ProductProvider from "../ProductProvider/ProductProvider";
import ProductCatalog from "../ProductCatalog/ProductCatalog";
import { ThemeContext } from "../services/theme/theme.context";

const DashBoard = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const { handleLogout } = useContext(AuthenticationContext);

  //const userName = user.email.split("@")[0];

  const onLogoutHandler = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className={`bg-${theme}`}>
      <NavBar onLogout={onLogoutHandler} />
      <ProductProvider />
      <ProductCatalog />
    </div>
  );
};

export default DashBoard;
