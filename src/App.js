import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import LoginFF from "./components/Login/LoginFF";
import DashBoard from "./components/DashBoard/DashBoard";
import Protected from "./routes/Protected";
import NotFound from "./routes/NotFound";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginFF onLogin={loginHandler} />,
    },
    {
      path: "/home",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <DashBoard onLogout={logoutHandler} />
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
