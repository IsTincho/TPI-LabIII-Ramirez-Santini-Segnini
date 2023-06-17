import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import DashBoard from "./components/DashBoard/DashBoard";
import Protected from "./components/routes/Protected";
import NotFound from "./components/routes/NotFound";
import LoginForm from "./components/Login/LoginForm";
import AdminProtected from "./components/routes/AdminProtected";
import AdminPage from "./components/Admin/AdminPage/AdminPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/home"
          element={
            <Protected>
              <DashBoard />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminPage />
            </AdminProtected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
