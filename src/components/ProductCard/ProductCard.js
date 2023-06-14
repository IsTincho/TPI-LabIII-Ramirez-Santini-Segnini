import React from "react";

import "./ProductCard.css";
import { borderStyle } from "../Login/bordercolor";

const ProductCard = ({ children }) => {
  return (
    <div className="book-item-container" style={borderStyle}>
      {children}
    </div>
  );
};

export default ProductCard;
