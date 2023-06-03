import { useState, useContext } from "react"; // Proximamente vamos a añadir el modo claro/oscuro, de momento no se usan estas librerias
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import LoginFF from "./components/Login/LoginFF";
import DashBoard from "./components/DashBoard/DashBoard";
import Protected from "./routes/Protected";
import NotFound from "./routes/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="/login" element={<LoginFF />} />
        <Route
          path="/home"
          element={
            <Protected>
              <DashBoard />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
