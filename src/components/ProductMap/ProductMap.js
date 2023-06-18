import React, { useState } from "react";
import ProductCatalog from "../ProductCatalog/ProductCatalog";



function ProductMap(products) {


  const filterProducts = products?.data?.filter((e) => {
    return e.gender;
  });

 

  // ------ //
  
    const productsWithStock = filterProducts?.map((product) => {
    return { ...product, stock: 5 };
  }); 
  
  localStorage.setItem("products", JSON.stringify(productsWithStock));

  return (
    <>
      {/*<div className="container-filter">
        <div className="container-filter-gender">
          <h4 className="gender"> Genero </h4>
          
        </div>
      </div>*/}

      <div className="container-catalog">
        <div className="parent ml-5">
          {productsWithStock
            ? productsWithStock.map((product) => {
                return <ProductCatalog product={product} />;
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default ProductMap;
