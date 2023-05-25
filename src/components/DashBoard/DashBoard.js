import React, { useEffect, useState } from "react";

import NavBar from "../NavBar/NavBar";

const DashBoard = ({}) => {
  console.log("Entramos al Dash");

  const hadnleLogout = () => {};

  return (
    <div>
      <NavBar onLogout={hadnleLogout} />
    </div>
  );
};

export default DashBoard;
