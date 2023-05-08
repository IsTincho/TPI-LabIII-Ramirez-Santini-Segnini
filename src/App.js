import { useState } from "react";
import "./App.css";

import Books from "./components/Books/Books";
import NewBook from "./components/NewBook/NewBook";
import BooksFilter from "./components/BookFilter/BookFilter";
import Login from "./components/Login/Login";

const BOOKS = [
  {
    id: 1,
    title: "100 años de soledad",
    author: "Gabriel García Marquez",
    dateRead: new Date(2021, 8, 12),
    pageCount: 410,
  },
  {
    id: 2,
    title: "Todos los fuegos el fuego",
    author: "Julio Cortazar",
    dateRead: new Date(2020, 6, 11),
    pageCount: 197,
  },
  {
    id: 3,
    title: "Asesinato en el Orient Express",
    author: "Agatha Christie",
    dateRead: new Date(2021, 5, 9),
    pageCount: 256,
  },
  {
    id: 4,
    title: "Las dos torres",
    author: "J.R.R Tolkien",
    dateRead: new Date(2020, 3, 22),
    pageCount: 352,
  },
];

const App = () => {
  const [books, setBooks] = useState(BOOKS);
  const [filterYear, setFilterYear] = useState("2023");

  const addBookHandler = (book) => {
    setBooks([book, ...books]);
  };

  const filterYearChanged = (year) => {
    setFilterYear(year);
  };

  return (
    <div className="App">
      {/* <NewBook onBookAdded={addBookHandler} />
      <BooksFilter
        filterYear={filterYear}
        onFilterYearChange={filterYearChanged}
      />
      <Books filterYear={filterYear} books={books} /> */}
      <Login />
    </div>
  );
};

export default App;
