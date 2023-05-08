import { useState } from "react";
import "./BookForm.css";

const BookForm = ({ onBookAdded, onHideForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dateRead, setDateRead] = useState("");
  const [pageCount, setPageCount] = useState("");

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const changeAuthorHandler = (event) => {
    setAuthor(event.target.value);
  };

  const changeDateReadHandler = (event) => {
    setDateRead(event.target.value);
  };

  const changePageCountHandler = (event) => {
    setPageCount(event.target.value);
  };

  const addBookHandler = (event) => {
    event.preventDefault();
    const newBook = {
      id: Math.random(),
      title,
      author,
      dateRead: new Date(dateRead),
      pageCount,
    };
    onBookAdded(newBook);
  };

  const hideFormHandler = (event) => {
    event.preventDefault();
    onHideForm();
  };

  return (
    <form>
      <div className="new-book-controls">
        <div className="new-book-control">
          <label>Título</label>
          <input
            onChange={changeTitleHandler}
            type="text"
            className="input-control"
          />
        </div>
        <div className="new-book-control">
          <label>Autor</label>
          <input
            onChange={changeAuthorHandler}
            type="text"
            className="input-control"
          />
        </div>
        <div className="new-book-control">
          <label>Páginas</label>
          <input
            onChange={changePageCountHandler}
            type="number"
            className="input-control"
            min="1"
            step="1"
          />
        </div>
        <div className="new-book-control">
          <label>¿Cuándo terminaste de leerlo?</label>
          <input
            onChange={changeDateReadHandler}
            type="date"
            className="input-control"
            min="2019-01-01"
            max="2023-12-31"
          />
        </div>
      </div>
      <div className="new-book-actions">
        <button onClick={hideFormHandler}>Cancelar</button>
        <button onClick={addBookHandler}>Agregar lectura</button>
      </div>
    </form>
  );
};

export default BookForm;
