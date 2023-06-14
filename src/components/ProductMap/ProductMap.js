import React from "react";
import ProductCatalog from "../ProductCatalog/ProductCatalog";

function ProductMap(products) {
  const filterProducts = products?.data?.filter((e) => {
    return e.category === "men's clothing" || e.category === "women's clothing";
  });

  const productsWithStock = filterProducts?.map((product) => {
    return { ...product, stock: 5 };
    
  });
  localStorage.setItem("products", JSON.stringify(productsWithStock));
  
  return (
    <div className="container-catalog">
      <div className="parent">
        {productsWithStock
          ? productsWithStock.map((product, index) => {
              return <ProductCatalog product={product} key={index} />;
            })
          : ""}
      </div>
    </div>
  );
}

export default ProductMap;
