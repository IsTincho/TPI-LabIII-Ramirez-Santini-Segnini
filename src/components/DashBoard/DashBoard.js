import React, { useEffect, useState } from "react";

import NavBar from "../NavBar/NavBar";
import CarouselProducts from "../CarouselProducts/CarouselProducts";


const DashBoard = ({}) => {
  console.log("Entramos al Dash");

  const hadnleLogout = () => {};

  return (
    <div>
      <NavBar onLogout={hadnleLogout} />
      <CarouselProducts />
      
    </div>
  );
};

export default DashBoard;
