import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { ThemeContext } from "../services/theme/theme.context";
import { database } from "../firebaseConfig/firebaseConfig";
import { AuthenticationContext } from "../services/authentication/authentication.context";

import "../Admin/AdminPage/AdminPage.css";
import "./OrderGrid.css";

import iconSVG from "./orderEmpty.svg";

const OrderGridACT = () => {
  const { theme } = useContext(ThemeContext);
  const { userIdForCart } = useContext(AuthenticationContext);
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(userIdForCart);
  }, [userIdForCart]);

  useEffect(() => {
    const usuarioRef = database.ref(`users/${userId}/pedidos`);
    usuarioRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const ordersArray = data ? Object.values(data) : [];

      const transformedOrders = ordersArray.map((order) => {
        const groupedProducts = order.reduce((acc, product) => {
          const productId = product.id;
          if (!acc[productId]) {
            acc[productId] = { ...product, quantity: 0 };
          }
          acc[productId].quantity += 1;
          return acc;
        }, {});

        const products = Object.values(groupedProducts);
        const totalPrice = products.reduce(
          (total, product) => total + product.totalPrice,
          0
        );

        return { products, totalPrice };
      });

      setOrders(transformedOrders);
    });

    return () => {
      usuarioRef.off("value");
    };
  }, [userId]);

  return (
    <div className={theme === "light" ? "bg-light" : "bg-dark text-light"}>
      <div className="container-admin-page">
        {orders.length === 0 ? (
          <div className="order-empty">
          <img  src={iconSVG}/>
          
          <p>Aun no hay pedidos</p>
          </div>
          
        ) : (
          orders.map((order, index) => (
            <Table
              responsive
              className={theme === "light" ? "table-light" : "table-dark"}
            >
              <thead>
                <tr>
                  <th></th>
                  <th>PRODUCTO</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO UNITARIO</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>

              <tbody>
                {order.products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image}
                        className="grid-cell"
                        alt=""
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </td>
                    <td>{product?.title}</td>
                    <td>{product.quantity}</td>
                    <td>${product?.price.toFixed(2)}</td>
                    <td>$ {product?.totalPrice?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="">
                <tr>
                  <td colSpan="4" className="text-success">
                    <strong>TOTAL DEL PEDIDO </strong>

                    <strong className="">
                      {" "}
                      ${order.totalPrice?.toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </Table>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderGridACT;
