import React, { useState, createContext } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addToOrder = (products) => {
    setOrder(products);
  };

  const clearOrder = () => {
    setOrder([]);
  };

  return (
    <OrderContext.Provider value={{ order, addToOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
