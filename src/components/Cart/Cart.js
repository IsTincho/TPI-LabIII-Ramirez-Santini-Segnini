import React, { useContext } from "react";
import { CartContext } from "../services/cartcontext/cart.context";

import "../Cart/Cart.css";

const Cart = () => {
  const { cart, addToCart } = useContext(CartContext);

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
                </div>
              );
            })}
          </div>
          <div className="total-price">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button type="button" className="cart-button">Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
