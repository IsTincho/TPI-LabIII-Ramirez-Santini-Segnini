import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const ProductsManagementPage = () => {
  const [cantProducts, setCantProducts] = useState([]);
  const [operation, setOperation] = useState(1);
  const [option, setOption] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const url = "https://648a58945fa58521cab118b9.mockapi.io/api/v1/products";
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setCantProducts(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const openModal = (option, id, title, description, price) => {
    setId("");
    setTitle("");
    setDescription("");
    setPrice("");
    setOperation(option);
    if (option === 1) {
      setOperation(1)
      setOption("Registrar Producto");
    } else if (option === 2) {
      setOperation(2)
      setOption("Editar Producto");
      setTitle(title);
      setDescription(description);
      setPrice(price);
    }
  };

  const validation = (operation) => {
    const dataProducts = { title, description, price };

    if (title.trim() === "") {
      alert("Escribe el titulo del producto");
    } else if (description.trim() === "") {
      alert("Escribe la descripcion del producto");
    } else if (price === "") {
      alert("Escribe el precio del producto");
    } else {
      
        fetch("https://648a58945fa58521cab118b9.mockapi.io/api/v1/products", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(dataProducts),
        })
          .then((res) => {
            alert("SAVED SUCCESS");
            getProducts();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } 
       {/*
        fetch("https://648a58945fa58521cab118b9.mockapi.io/api/v1/products", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(dataProducts),
        })
          .then((res) => {
            alert("SAVED SUCCESS");
            getProducts();
          })
          .catch((err) => {
            console.log(err.message);
          });

        */}
    
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => openModal(1)}
      >
        Añadir
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {option}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Titulo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="Descripcion"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
            </div>
            <div class="modal-footer">
              <button
                id="close-btn-modal"
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => validation()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Product Management</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Descripcion</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cantProducts?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() =>
                  openModal(
                    2,
                    item.id,
                    item.title,
                    item.description,
                    item.price
                  )
                }
              >
                Editar
              </button>
              <button>Eliminar</button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsManagementPage;
