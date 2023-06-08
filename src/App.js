import { useState, useContext } from "react"; //Vamos a agregar despues el modo claro/oscuro con el useContext
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";

import LoginFF from "./components/Login/LoginFF";
import DashBoard from "./components/DashBoard/DashBoard";
import Protected from "./routes/Protected";
import NotFound from "./routes/NotFound";
import ProductProvider from "./components/ProductProvider/ProductProvider";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="login" /> },
    {
      path: "/login",
      element: (
        
          <LoginFF />
        
      ),
    },
    {
      path: "/home",
      element: (
        <Protected>
          <DashBoard />
        </Protected>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
