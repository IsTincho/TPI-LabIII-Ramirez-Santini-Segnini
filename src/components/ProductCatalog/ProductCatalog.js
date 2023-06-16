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

  // Recortar string de title.
  const shortTitle = title.slice(0, 31);

  console.log(stock);

  return (
    <ProductCard>
      <div className="g-col-4">
        <div class="card-product">
          <img src={image} alt="" />
          <div class="card-body">
            <div class="row">
              <div class="card-title">
                <h4>{title}</h4>
                <h3>${price}</h3>
                <div className="stock-product">
                  <ChangeStock initialStock={stock} />
                </div>
              </div>
            </div>
            <hr />
            <p>{description}</p>
            <div class="btn-group">
              <div class="btn">
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
