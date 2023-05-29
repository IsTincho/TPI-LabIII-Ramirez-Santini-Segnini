import React, { useEffect, useState } from "react";

import NavBar from "../NavBar/NavBar";
import CarouselProducts from "../CarouselProducts/CarouselProducts";
import Product from "../API/Product";

const DashBoard = ({}) => {
  console.log("Entramos al Dash");

  const hadnleLogout = () => {};

  return (
    <div>
      <NavBar onLogout={hadnleLogout} />
      <CarouselProducts />
      <Product />
    </div>
  );
};

export default DashBoard;
