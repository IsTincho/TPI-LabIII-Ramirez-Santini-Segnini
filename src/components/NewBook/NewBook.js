import "./NewBook.css";

import BookForm from "../BookForm/BookForm";
import { useState } from "react";

const NewBook = ({ onBookAdded }) => {
  const [showForm, setShowForm] = useState(false);

  const onBookAddedHandler = (book) => {
    console.log(book);
    console.log("In new Book");
    onBookAdded(book);
  };
  const showBookForm = () => {
    setShowForm(true);
  };

  const hideBookForm = () => {
    setShowForm(false);
  };
  return (
    <div className="new-book">
      {showForm ? (
        <BookForm onHideForm={hideBookForm} onBookAdded={onBookAddedHandler} />
      ) : (
        <button onClick={showBookForm}>Registrar nuevo libro</button>
      )}
    </div>
  );
};

export default NewBook;
