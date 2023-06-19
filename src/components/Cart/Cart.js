import React, { useContext } from "react";
import { CartContext } from "../services/cartcontext/cart.context";

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

  const uniqueProductIds = [...new Set(cart.map((product) => product.id))]; // Obtener un arreglo de IDs de productos únicos

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  console.log(cart) // Borrar
  return (
    <div className="cart">
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {uniqueProductIds.map((productId, index) => {
              const product = cart.find((p) => p.id === productId);
              const count = getProductCount(productId);

              return (
                <li key={`${productId}-${index}`}>
                  <span>{product.title}</span>
                  <span>${product.price}</span>
                  <span>({count})</span> {/* Contador de veces que se agregó el producto */}
                </li>
              );
            })}
          </ul>
          <div>
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
