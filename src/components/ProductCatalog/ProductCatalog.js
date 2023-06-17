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
  const { title, price, image, stock, description } = product;

  return (
    <ProductCard>
      <div className="g-col-4">
        <div className="card-product">
          <img src={image} alt="" />
          <div className="card-body">
            <div className="row">
              <div className="card-title">
                <h4>{title}</h4>
                <h3>${price}</h3>
                <div className="stock-product">
                  <ChangeStock initialStock={stock} />
                </div>
              </div>
            </div>
            <hr />
            <p>{description}</p>
            <div className="btn-group">
              <div className="btn">
                <button>Añadir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductCard>
  );
}

export default ProductCatalog;
