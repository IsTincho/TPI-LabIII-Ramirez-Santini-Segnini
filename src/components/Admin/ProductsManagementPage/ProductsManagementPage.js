import React, { useEffect, useState } from "react";
import "./ProductsManagementPage.css";
import { Table } from "react-bootstrap";

const ProductsManagementPage = () => {
  const [cantProducts, setCantProducts] = useState([]);
  const [operation, setOperation] = useState(1);
  const [option, setOption] = useState("");
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    
    const url = "https://648f29e975a96b664444c707.mockapi.io/api/v1/products";
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setCantProducts(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const openModal = (option, id, title, description, price, image, gender) => {
    setId();
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
    setGender("");
    setOperation(option);

    if (option === 1) {
      setOperation(1);
      setOption("Registrar Producto");
    } else if (option === 2) {
      setOperation(2);
      setOption("Editar Producto");
      setTitle(title);
      setDescription(description);
      setPrice(price);
      setImage(image);
      setGender(gender);
    }
  };

  const validation = () => {
    const dataProducts = { title, description, price, image, gender };

    if (title.trim() === "") {
      alert("Escribe el titulo del producto");
    } else if (description.trim() === "") {
      alert("Escribe la descripcion del producto");
    } else if (price === "") {
      alert("Escribe el precio del producto");
    } else if (image.trim() === "") {
      alert("Escribe la url del producto");
    } else if (gender.trim() === "") {
      alert("Escribe el genero del producto");
    } else {
      fetch("https://648f29e975a96b664444c707.mockapi.io/api/v1/products", {
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

    {
      /* falta implementar el metodo PUT para editar el producto 
        fetch("https://648f29e975a96b664444c707.mockapi.io/api/v1/products", {
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

        */
    }
  };

  return (
    <div className="container-product-management">
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
                  type="number"
                  id="precio"
                  className="form-control"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="image"
                  className="form-control"
                  placeholder="Imagen - URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="gender"
                  className="form-control"
                  placeholder="Genero - Hombre o Mujer"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
      <div className="btn-add">
      <button
        type="button"
        className="btn btn-primary mb-2 w-25"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => openModal(1)}
      >
      
        Añadir
      </button>
      </div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Descripcion</th>
            <th>Price</th>
            <th>Genero</th>
          </tr>
        </thead>
        <tbody>
          {cantProducts?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.gender}</td>
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
                    item.price,
                    item.image,
                    item.gender
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
