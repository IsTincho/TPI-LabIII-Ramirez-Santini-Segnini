import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselProducts.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 20,
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
  console.log(products.data);
  const filteredProducts = products?.data?.filter((item) => {
    return item.category === "men's clothing";
  });

  return (
    <div className="container">
      <h1>Productos Destacados</h1>
      <Carousel responsive={responsive}>
        {filteredProducts ? filteredProducts.map((item) => (
          <div className="container-cards" key={item.id}>
            <div className="card">
              <img src={item.image} alt="" />
              <button>Ver</button>
            </div>
          </div>
        )): <div>Cargando datos</div>}
      </Carousel>
    </div>
  );
};

export default CarouselProducts;
