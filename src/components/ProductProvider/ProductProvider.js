import React, { useState, useEffect } from "react";

import CarouselProducts from "../CarouselProducts/CarouselProducts";
import ProductMap from "../ProductMap/ProductMap";

const ProductProvider = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://demo2167453.mockable.io/products";
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <CarouselProducts data={products} />
      <ProductMap data={products} />
    </div>
  );
};

export default ProductProvider;
