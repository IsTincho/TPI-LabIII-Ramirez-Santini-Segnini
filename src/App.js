import React, { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { ThemeContext } from "./components/services/theme/theme.context";
import DashBoard from "./components/DashBoard/DashBoard";
import Protected from "./components/routes/Protected";
import NotFound from "./components/routes/NotFound";
import LoginForm from "./components/Login/LoginForm";
import AdminProtected from "./components/routes/AdminProtected";
import AdminPage from "./components/Admin/AdminPage/AdminPage";
import { ToastContainer } from "react-toastify";
import OrderPage from "./components/OrderPage/OrderPage"
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { theme } = useContext(ThemeContext);

  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" replace /> },
    {
      path: "/login",
      element: <LoginForm />,
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
      path: "/orders",
      element: <OrderPage />,
    },
    {
      path: "/admin",
      element: (
        <AdminProtected>
          <AdminPage />
        </AdminProtected>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className={`${theme === "dark" && "dark-theme"}`}>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
