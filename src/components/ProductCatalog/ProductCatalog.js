import React from "react";
import "./ProductCatalog.css";

import ProductCard from "../ProductCard/ProductCard";
import ChangeStock from "../ChangeStock/ChangeStock";

function ProductCatalog({ product }) {
  // En caso de que no existan productos devolver null.
  if (!product) {
    return null;
  }

  // Desestructurar mas datos si es necesario: id, category, rating, etc.
  const { title, price, image, stock } = product;

  // Recortar string de title.
  const shortTitle = title.slice(0, 31);

  console.log(stock);

  return (
    <ProductCard>
      <div className="g-col-4">
        <div className="card-product">
          <img src={image} alt="product" />
          <h5>{shortTitle}</h5>
          <h6>${price}</h6>
          <ChangeStock initialStock={stock} />
          <button>Añadir al carrito</button>
        </div>
      </div>
    </ProductCard>
  );
}

export default ProductCatalog;
