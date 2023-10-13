import { useState, useContext } from "react";
import ProductCatalog from "../ProductCatalog/ProductCatalog";
import "./ProductMap.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ThemeContext } from "../services/theme/theme.context";
const ProductMap = (products) => {
  const { theme } = useContext(ThemeContext);

  const productsArray = Object.values(products?.data || {});

  const allCategories = [
    "Todo",
    ...new Set(productsArray.map((product) => product.gender)),
  ];

  const [selectedGender, setSelectedGender] = useState("Todo");

  const filterGender = (gender) => {
    setSelectedGender(gender);
  };

  const filteredArticles =
    selectedGender === "Todo"
      ? productsArray
      : productsArray.filter((article) => article.gender === selectedGender);
  return (
    <>
      <div className="container-catalog">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="parent">
              {filteredArticles.map((product) => (
                <ProductCatalog product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductMap;
