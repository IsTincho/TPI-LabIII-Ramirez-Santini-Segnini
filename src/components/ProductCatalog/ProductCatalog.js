import React from "react";
import "./ProductCatalog.css";
function ProductCatalog({ product }) {
  if (!product) {
    return "";
  }

  const { id, title, price, description, category, image, rating } = product;

  return (
    <div className="g-col-4">
      <div className="card-product">
        <img src={image}/>
        <h5>{title}</h5>
      </div>
    </div>
  );
}

export default ProductCatalog;
