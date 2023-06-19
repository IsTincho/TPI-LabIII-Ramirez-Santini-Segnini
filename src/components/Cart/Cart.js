import React, { useContext } from "react";
import { CartContext } from "../services/cartcontext/cart.context";

import "../Cart/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

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
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <h2>No hay productos en el carrito.</h2>
      ) : (
        <div className="container">
          <div>
            <h3>Mi pedido</h3>
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
          <button type="button" className="cart-button">
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