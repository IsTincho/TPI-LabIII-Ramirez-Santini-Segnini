import { React, useState, useEffect, useContext } from "react";


import "./ProductCatalog.css";
import { CartContext } from "../services/cartcontext/cart.context";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import ProductCard from "../ProductCard/ProductCard";
import ChangeStock from "../ChangeStock/ChangeStock";

const ProductCatalog = ({ product }) => {
  const [products, setProducts] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthenticationContext);

  // Setear productos.
  useEffect(() => {
    if (product) {
      setProducts(product);
    } else {
      setProducts(null);
    }
  }, [product]);

  if (!products) {
    return null; // Retorna null o un componente de carga mientras se carga el producto
  }

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
                  {user.isAdmin ? (
                    <ChangeStock stockProp={stock} idProp={id} />
                  ) : null}
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