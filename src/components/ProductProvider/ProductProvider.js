import React, { useState, useEffect } from "react";
import CarouselProducts from "../CarouselProducts/CarouselProducts";

const ProductProvider = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    
    const fetchProducts = async () => {
      const url = "https://fakestoreapi.com/products/";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fbb9cfb7f9msh56fca9dbe3341b1p1df2d9jsn7cce6c52dfd5",
          "X-RapidAPI-Host": "apidojo-forever21-v1.p.rapidapi.com",
        },
      };
        
      try {
        const response = await fetch(url, options);
        const data = await response.json();
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
    </div>
  );
};

export default ProductProvider;
