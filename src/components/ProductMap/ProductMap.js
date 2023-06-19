import ProductCatalog from "../ProductCatalog/ProductCatalog";

const ProductMap = (products) => {
  console.log(products);

  const filterProducts = products?.data?.filter((e) => {
    return e.gender;
  });

  return (
    <>
      {/*<div className="container-filter">
        <div className="container-filter-gender">
          <h4 className="gender"> Genero </h4>
          
        </div>
      </div>*/}

      <div className="container-catalog">
        <div className="parent ml-5">
          {filterProducts
            ? filterProducts.map((product) => {
                return <ProductCatalog product={product} key={product.id} />;
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default ProductMap;
