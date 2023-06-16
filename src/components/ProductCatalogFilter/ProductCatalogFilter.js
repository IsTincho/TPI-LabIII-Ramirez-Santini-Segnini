import React from "react";
import "./ProductCatalogFilter.css";

function ProductCatalogFilter() {
  return (
    <div className="container-filter">
      <div class="container-filter-gender">
        <h4 className="gender"> Genero </h4>
        <form>
          <label>
            <input type="radio" name="radio" />
            <span>Mujer</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Hombre</span>
          </label>
          <label>
            <input type="radio" name="radio" />
            <span>Unisex</span>
          </label>
        </form>
      </div>
    </div>
  );
}

export default ProductCatalogFilter;
