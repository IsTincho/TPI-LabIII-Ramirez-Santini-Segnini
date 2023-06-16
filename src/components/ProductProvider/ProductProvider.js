import React, { useState, useEffect } from "react";

import CarouselProducts from "../CarouselProducts/CarouselProducts";
import ProductMap from "../ProductMap/ProductMap";

const ProductProvider = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://demo2167453.mockable.io/products";
      {/*const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fbb9cfb7f9msh56fca9dbe3341b1p1df2d9jsn7cce6c52dfd5",
          "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
        },
      }*/}

      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data[0]);
        console.log(data[0])
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
