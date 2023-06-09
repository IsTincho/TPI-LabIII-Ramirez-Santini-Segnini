import { useEffect } from "react";
import { useState } from "react";

import CarouselProducts from "../CarouselProducts/CarouselProducts";

const ProductProvider = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const url = "https://fakestoreapi.com/products";
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return;

  <CarouselProducts data={products} />;
};
export default ProductProvider;
