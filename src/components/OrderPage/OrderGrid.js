import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../services/theme/theme.context";
import { database } from "../firebaseConfig/firebaseConfig";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import "./OrderGrid.css";

const OrderGrid = () => {
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

  if (orders.length === 0) {
    return null;
  }

  return (
    <div className={theme === "light" ? "bg-light" : "bg-dark text-light"}>
      <Container className="container-grid">
        {orders.map((order, index) => (
          <React.Fragment key={`order-${index}`}>
            <Row className="grid-row align-items-center">
              <Col xs={12}>
                <p className="grid-cell">Pedido {index + 1}</p>
              </Col>
            </Row>
            <Row className="grid-header align-items-center">
              <Col xs={3}>
                <p className="grid-header-text">Producto</p>
              </Col>
              <Col xs={2}>
                <p className="grid-header-text">Cantidad</p>
              </Col>
              <Col xs={2}>
                <p className="grid-header-text">Precio unitario</p>
              </Col>
              <Col xs={2}>
                <p className="grid-header-text">Precio total</p>
              </Col>
            </Row>
            {order.products.map((product) => (
              <Row key={product.id} className="grid-row align-items-center">
                <Col xs={2}>
                  <img
                    src={product.image}
                    className="grid-cell"
                    alt=""
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </Col>
                <Col xs={3}>
                  <p className="grid-cell">{product?.title}</p>
                </Col>
                <Col xs={2}>
                  <p className="grid-cell">{product?.quantity}</p>
                </Col>
                <Col xs={2}>
                  <p className="grid-cell">${product?.price?.toFixed(2)}</p>
                </Col>
                <Col xs={2}>
                  <p className="grid-cell">
                    ${product?.totalPrice?.toFixed(2)}
                  </p>
                </Col>
              </Row>
            ))}
            <Row className="grid-row align-items-center">
              <Col xs={7}></Col>
              <Col xs={3}>
                <p className="grid-cell">Precio total del pedido:</p>
              </Col>
              <Col xs={2}>
                <p className="grid-cell">${order.totalPrice?.toFixed(2)}</p>
              </Col>
            </Row>
          </React.Fragment>
        ))}
      </Container>
    </div>
  );
};

export default OrderGrid;
