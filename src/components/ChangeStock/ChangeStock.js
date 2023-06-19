import React, { useState } from "react";

import "./ChangeStock.css";

const ChangeStock = ({ stockProp, idProp }) => {
  const [stock, setStock] = useState(stockProp);

  const incrementStock = () => {
    const newStock = stock + 1;
    updateStock(newStock);
  };

  const decrementStock = () => {
    const newStock = stock - 1;
    updateStock(newStock);
  };

  const updateStock = async (newStock) => {
    try {
      // Realizar la llamada a la API para actualizar el stock
      const response = await fetch(`https://649088bd1e6aa71680cb6c85.mockapi.io/api/v1/products/${idProp}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: newStock }),
      });

      if (response.ok) {
        // Si la actualización es exitosa, actualizamos el estado local
        setStock(newStock);
      } else {
        // Manejar errores de la API
        console.error("Error al actualizar el stock");
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error("Error al actualizar el stock:", error);
    }
  };

  return (
    <div>
      <p>Stock: {stock}</p>
      <button
        className="button-add"
        onClick={incrementStock}
        disabled={stock >= 20}
      >
        +
      </button>
      <button
        className="button-sub"
        onClick={decrementStock}
        disabled={stock === 0}
      >
        -
      </button>
    </div>
  );
};

export default ChangeStock;
