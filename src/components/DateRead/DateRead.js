import "./DateRead.css";

const DateRead = ({ bookDateRead }) => {
  const year = bookDateRead.getFullYear();
  const month = bookDateRead.toLocaleString("es-AR", { month: "long" });
  const day = bookDateRead.toLocaleString("es-AR", { day: "2-digit" });

  return (
    <div className="date-container">
      <div>{year}</div>
      <div>{month}</div>
      <div>{day}</div>
    </div>
  );
};

export default DateRead;
