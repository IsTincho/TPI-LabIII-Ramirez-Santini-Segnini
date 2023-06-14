import React from "react";

import "./ProductCard.css";

const ProductCard = ({ children }) => {
  return (
    <div className="book-item-container">
      {children}
    </div>
  );
};

export default ProductCard;
