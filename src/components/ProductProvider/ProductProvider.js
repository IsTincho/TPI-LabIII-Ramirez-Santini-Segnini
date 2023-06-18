import React, { useState, useEffect } from "react";
import CarouselProducts from "../CarouselProducts/CarouselProducts";
import ProductMap from "../ProductMap/ProductMap";

const ProductProvider = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "https://648f29e975a96b664444c707.mockapi.io/api/v1/products";
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
