import React, { useContext, useState } from "react";

import "./ChangeStock.css";

// Solo el admin puede acceder a esta función.

const ChangeStock = ({ initialStock }) => {
  const [stock, setStock] = useState(initialStock);

  const incrementStock = () => {
    setStock(stock + 1);
  };

  const decrementStock = () => {
    setStock(stock - 1);
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
