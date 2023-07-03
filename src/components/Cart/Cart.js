import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../services/cartcontext/cart.context";
import { OrderContext } from "../services/orderContext/order.context";
import { toast } from "react-toastify";

import { AuthenticationContext } from "../services/authentication/authentication.context";
import { auth, database } from "../firebaseConfig/firebaseConfig.js";

import "react-toastify/dist/ReactToastify.css";
import "../Cart/Cart.css";

const Cart = () => {
  const { cart, clearCart, setCart } = useContext(CartContext);
  const { addToOrder } = useContext(OrderContext); // Añadir clearOrder
  const { userIdForCart } = useContext(AuthenticationContext);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(userIdForCart);
  }, []);

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

    const usuarioRef = database.ref(`users/${userId}`);
    console.log(userId);
   
    usuarioRef.child("CantidadPedidos").transaction(
      
      (contador = 0) => {
        // Incrementa el contador de pedidos
        if (!contador) {
          return 1;
        } else {
          return contador + 1;
        }
      },
      (error, committed, snapshot) => {
        if (error) {
          console.error("Error al incrementar el contador de pedidos:", error);
          return;
        }

        if (committed) {
          const contador = snapshot.val();
          const pedidoId = `Pedido nº ${contador}`;

          const pedidosRef = usuarioRef.child("pedidos").child(pedidoId);
          pedidosRef
            .set(productsWithTotalPrice)
            .then(() => {
              console.log(`Pedido "${pedidoId}" agregado correctamente.`);
            })
            .catch((error) => {
              console.error(`Error al agregar el pedido "${pedidoId}":`, error);
            });

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
        } else {
          console.error("No se pudo incrementar el contador de pedidos.");
        }
      }
    );
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
              const titleRecorted = product.title.slice(0, 22);
              return (
                <div className="cart-container" key={`${productId}-${index}`}>
                  <div className="product-title">{titleRecorted}</div>
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
          <button
            type="button"
            className="cart-button"
            onClick={handleCheckout}
          >
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
