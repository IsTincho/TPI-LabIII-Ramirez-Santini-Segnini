import React, { useContext } from "react";
import { CartContext } from "../services/cartcontext/cart.context";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import "./CarouselProducts.css";

import Carousel from "react-multi-carousel";
import Spinner from "../ui/Spinner/Spinner";
import { ThemeContext } from "../services/theme/theme.context";

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
  const { cart, setCart } = useContext(CartContext);

  const filteredProducts = products?.data?.filter((item) => {
    return item.id > 5 && item.id < 12;
  });

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("¡Producto añadido!", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="container">
      <h1 className="p-destacados">Productos Destacados</h1>
      <Carousel responsive={responsive}>
        {filteredProducts ? (
          filteredProducts.map((item) => (
            <div className="container-cards" key={item.id}>
              <div className="card">
                <img src={item.image} alt="" />
                <div
                /*className={`book-item-container ${
                    theme === "dark" && "book-item-container-dark"
                  }`} */
                >
                  <h4>{item.title}</h4>
                  <h4>${item.price}</h4>
                </div>

                <button className="btn-style" onClick={() => addToCart(item)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </Carousel>
    </div>
  );
};

export default CarouselProducts;
