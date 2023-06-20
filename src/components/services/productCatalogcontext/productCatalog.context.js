import React, { createContext, useState } from "react";

export const ProductCatalogContext = createContext();

export const ProductCatalogProvider = ({ children }) => {
    const [stock, setStock] = useState();
    
    const stockLimitCart = (product) => {
        setStock(...stock, product);
    };
    
    
    return (
      <ProductCatalogContext.Provider value={{ stock, stockLimitCart }}>
        {children}
      </ProductCatalogContext.Provider>
    );
  };