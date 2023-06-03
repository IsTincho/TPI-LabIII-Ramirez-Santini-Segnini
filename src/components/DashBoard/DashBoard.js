import { useContext } from "react";
import { useNavigate } from "react-router";

import NavBar from "../NavBar/NavBar";
import CarouselProducts from "../CarouselProducts/CarouselProducts";

import { AuthenticationContext } from "../services/authentication/authentication.context";

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
      <CarouselProducts />
    </div>
  );
};

export default DashBoard;
