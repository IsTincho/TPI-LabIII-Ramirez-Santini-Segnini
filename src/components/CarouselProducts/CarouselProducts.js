import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselProducts.css"
import Products from "../FakeProducts/FakeProducts"

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const CarouselProducts = (products) => {
  console.log(products.data)
  
  return (
    <div className="container">
      <h1>Productos Destacados</h1>
      <Carousel responsive={responsive}>
        {products.data.map((item) => (
          <div className="container-cards" key={item.id}>
            <div className="card">
              <img src={item.image} alt=""/>
              <button>Ver</button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselProducts;