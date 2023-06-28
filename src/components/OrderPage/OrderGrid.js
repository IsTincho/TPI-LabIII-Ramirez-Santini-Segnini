import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { OrderContext } from "../services/orderContext/order.context";

import "./OrderGrid.css";

const OrderGrid = () => {
  const { order } = useContext(OrderContext);

  if (!order) {
    return null; // Retorna null o un componente de carga mientras se carga el producto
  }

  // Creación de un objeto para almacenar los productos con contador y precio total acumulado
  const productsMap = {};

  order.forEach((product) => {
    const { id, image, title, price } = product;

    if (!productsMap[id]) {
      // Si el producto no existe en el mapa, se agrega con contador y precio total inicializados
      productsMap[id] = {
        id,
        image,
        title,
        count: 1,
        unitPrice: price,
        totalPrice: price,
      };
    } else {
      // Si el producto ya existe en el mapa, se actualiza el contador y precio total
      productsMap[id].count++;
      productsMap[id].totalPrice += price;
    }
  });

  // Convertir el mapa de productos en un array para su representación en el JSX
  const renderedProducts = Object.values(productsMap);

  // Cálculo del precio total de todas las prendas
  const totalPriceOfAllProducts = renderedProducts.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  return (
    <div>
      <Container className="container-grid">
        {/* Fila de encabezado */}
        <Row className="grid-header align-items-center">
          <Col xs={1}>
            <p className="grid-header-text">Compra n: ...</p>
          </Col>
          <Col xs={3}>
            <p className="grid-header-text">Producto</p>
          </Col>
          <Col xs={1}>
            <p className="grid-header-text">Cantidad</p>
          </Col>
          <Col xs={2}>
            <p className="grid-header-text">Precio unitario</p>
          </Col>
          <Col xs={2}>
            <p className="grid-header-text">Precio total</p>
          </Col>
        </Row>
        {/* Filas de productos */}
        {renderedProducts.map((product) => (
          <Row key={product.id} className="grid-row align-items-center">
            <Col xs={1}>
              <img
                src={product.image}
                className="grid-cell"
                alt=""
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </Col>
            <Col xs={3}>
              <p className="grid-cell">{product.title}</p>
            </Col>
            <Col xs={1}>
              <p className="grid-cell">{product.count}</p>
            </Col>
            <Col xs={2}>
              <p className="grid-cell">${product.unitPrice.toFixed(2)}</p>
            </Col>
            <Col xs={2}>
              <p className="grid-cell">${product.totalPrice.toFixed(2)}</p>
            </Col>
          </Row>
        ))}
        {/* Fila del precio total de todas las prendas */}
        <Row className="grid-row align-items-center">
          <Col xs={7}>
            <p className="grid-cell">Total:</p>
          </Col>
          <Col xs={2}>
            <p className="grid-cell">${totalPriceOfAllProducts.toFixed(2)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderGrid;
