import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../theme/theme.context";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handlePlaceholderColor = () => {
    if (theme === "light") {
      return "#dddddd"; // Color del placeholder en tema claro
    } else {
      return "#000000"; // Color del placeholder en tema oscuro
    }
  };

  

  return (
    <Button
      onClick={toggleTheme}
      variant={theme === "light" ? "dark" : "light"}
      style={{ color: handlePlaceholderColor() }} // Aplica el color del placeholder según el tema
    >
      Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
    </Button>
  );
};

export default ToggleTheme;
