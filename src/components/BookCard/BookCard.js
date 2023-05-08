import "./BookCard.css";

const BookCard = ({ children }) => {
  return <div className="book-item-container">{children}</div>;
};

export default BookCard;
