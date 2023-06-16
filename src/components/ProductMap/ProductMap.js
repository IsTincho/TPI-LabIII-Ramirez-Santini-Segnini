import React from "react";
import ProductCatalog from "../ProductCatalog/ProductCatalog";
import ProductCatalogFilter from "../ProductCatalogFilter/ProductCatalogFilter";

function ProductMap(products) {
  const filterProducts = products?.data?.filter((e) => {
    return e.gender === "men's clothing" || e.gender === "women's clothing" || e.gender === "jewelery";
  });

  const productsWithStock = filterProducts?.map((product) => {
    return { ...product, stock: 5 };
    
  });
  localStorage.setItem("products", JSON.stringify(productsWithStock));
  
  return (
    <>
    
    <div className="container-catalog">
    <ProductCatalogFilter />
      <div className="parent ml-5">
        {productsWithStock
          ? productsWithStock.map((product, index) => {
              return <ProductCatalog product={product} key={index} />;
            })
          : ""}
      </div>
    </div>
    </>
  );
}

export default ProductMap;
