import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import Login from "./components/Login/Login";
import DashBoard from "./components/DashBoard/DashBoard";


const App = () => {
  const router = createBrowserRouter([
    {path: "/login", element:<Login/>},
    {
      path: "/home",
      element: <DashBoard/>
    },
  ]);

  return <RouterProvider router={router}/>;
};

export default App;
