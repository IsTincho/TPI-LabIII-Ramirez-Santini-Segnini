import React, { useContext } from "react";
import { Button } from "react-bootstrap";

import { ThemeContext } from "../services/theme.context";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Button
      onClick={toggleTheme}
      variant={theme === "light" ? "dark" : "light"}
    >
      Cambiar a tema {theme === "light" ? "oscuro" : "claro"}
    </Button>
  );
};

export default ToggleTheme;
