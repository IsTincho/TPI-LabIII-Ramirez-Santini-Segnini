import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1>Solo admins xD</h1>
      <button className="btn btn-outline-danger" onClick={handleGoBack}>
        Volver a Home
      </button>
    </div>
  );
};
//El boton es rojo porque tira mas facha, dejo esto asi chicos por si quieren adelantar algo
//Sino mañana cuando resucite de la salida le meto a full y ya hago el AddUsers desde acá
//Porfis manejemos todo lo que sea del Admin adentro de estar carpetitas
export default AdminPage;
