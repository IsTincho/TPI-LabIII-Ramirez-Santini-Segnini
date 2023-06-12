import React from "react";
import ProductCatalog from "../ProductCatalog/ProductCatalog";

function ProductMap(products) {
  const filterProducts = products?.data?.filter((e) => {
    return e.category === "men's clothing" || e.category === "women's clothing";
  });

  return (
    <div className="container-catalog">
      <div className="parent">
        {filterProducts
          ? filterProducts.map((product, index) => {
              return <ProductCatalog product={product} key={index} />;
            })
          : ""}
      </div>
    </div>
  );
}

export default ProductMap;
