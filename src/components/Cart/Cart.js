import React, { useContext } from "react";
import { CartContext } from "../services/cartcontext/cart.context";
import { OrderContext } from "../services/orderContext/order.context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Cart/Cart.css";

const Cart = () => {
  const { cart, clearCart, setCart } = useContext(CartContext);
  const { addToOrder } = useContext(OrderContext); // Añadir clearOrder

  const getProductCount = (productId) => {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        count++;
      }
    }
    return count;
  };

  const uniqueProductIds = [...new Set(cart.map((product) => product.id))];

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    toast.error("¡Producto borrado!", {
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

  const handleClearCart = () => {
    clearCart();
    localStorage.removeItem("cart");
    toast.error("¡Carrito borrado!", {
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

  const handleCheckout = () => {
    const productsWithTotalPrice = cart.map((product) => ({
      ...product,
      totalPrice: product.price * getProductCount(product.id),
    }));
    addToOrder(productsWithTotalPrice);
    clearCart();
    localStorage.removeItem("cart");
    toast.success("¡Gracias por su compra!", {
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
  

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <h2>No hay productos en el carrito.</h2>
      ) : (
        <div className="container">
          <div>
            <h3 className="orderh">Carrito</h3>
            {uniqueProductIds.map((productId, index) => {
              const product = cart.find((p) => p.id === productId);
              const count = getProductCount(productId);
              return (
                <div className="cart-container" key={`${productId}-${index}`}>
                  <div className="product-title">{product.title}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-count">({count})</div>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(productId)}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
          <div className="total-price">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button type="button" className="cart-button" onClick={handleCheckout}>
            Finalizar Compra
          </button>
          <img
            onClick={handleClearCart}
            width="50px"
            height="50px"
            alt="Vaciar carrito"
            src="https://img.icons8.com/?size=1x&id=14237&format=png"
            className="clear-button"
          ></img>
        </div>
      )}
    </div>
  );
};

export default Cart;
