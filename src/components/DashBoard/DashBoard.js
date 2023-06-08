import { useContext } from "react";
import { useNavigate } from "react-router";

import NavBar from "../NavBar/NavBar";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import ProductProvider from "../ProductProvider/ProductProvider";

const DashBoard = () => {
  const { user, handleLogout } = useContext(AuthenticationContext);

  const userName = user.email.split("@")[0];

  const onLogoutHandler = () => {
    handleLogout();
    navigation("/login");
  };

  const navigation = useNavigate();

  console.log(userName);

  return (
    <div>
      <NavBar onLogout={onLogoutHandler} />
      <ProductProvider />
    </div>
  );
};

export default DashBoard;
