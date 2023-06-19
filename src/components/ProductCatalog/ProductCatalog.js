import { React, useState, useEffect, useContext } from "react";
import { CartContext } from "../services/cartcontext/cart.context";

import "./ProductCatalog.css";

import ProductCard from "../ProductCard/ProductCard";
import ChangeStock from "../ChangeStock/ChangeStock";
import Cart from "../Cart/Cart";

const ProductCatalog = ({ product }) => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  // Setear productos.
  useEffect(() => {
    if (!product) {
      setProducts("");
    } else {
      setProducts(product);
    }
  }, []);

  // Desestructurar mas datos si es necesario: id, category, rating, etc.
  const { id, title, price, image, stock, description } = products;

  const addToCart = () => {
    setCart([...cart, products]);
  };

  return (
    <ProductCard>
      <div className="g-col-4">
        <div className="card-product" key={id}>
          <img src={image} alt="" />
          <div className="card-body">
            <div className="row">
              <div className="card-title">
                <h4>{title}</h4>
                <h3>${price}</h3>
                <div className="stock-product">
                  <ChangeStock initialStock={stock} />
                </div>
              </div>
            </div>
            <hr />
            <p>{description}</p>
            <div className="btn-group">
              <div className="btn">
                <button onClick={addToCart}>Añadir al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductCard>
  );
};

export default ProductCatalog;
