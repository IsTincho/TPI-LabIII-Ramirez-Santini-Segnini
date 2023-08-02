import { useState } from "react";
import ProductCatalog from "../ProductCatalog/ProductCatalog";
import "./ProductMap.css";
import NavDropdown from "react-bootstrap/NavDropdown";
const ProductMap = (products) => {
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
  console.log(filteredArticles);
  return (
    <>
      <div className="container-catalog">
        <div className="container-filter d-flex">
          <h1 class="filter">Filtrar</h1>
          <div className="container-filter-gender">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="GENERO"
              menuVariant="dark"
            >
              {allCategories.map((sex, index) => (
                <div class="radio-button-container">
                  <div class="radio-button">
                    <input
                      type="radio"
                      class="radio-button__input"
                      id={index}
                      name="radio-group"
                    />
                    <label
                      class="radio-button__label"
                      for={index}
                      key={sex}
                      onClick={() => filterGender(sex)}
                    >
                      <span class="radio-button__custom"></span>
                      {sex}
                    </label>
                  </div>
                </div>
              ))}
            </NavDropdown>
          </div>
        </div>
        <div className="parent ml-5">
          {filteredArticles.map((product) => (
            <ProductCatalog product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductMap;
