import React, { createContext, useState } from "react";
import { auth } from "../../firebaseConfig/firebaseConfig";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = { email };
      setUser(user);
      return true; // Inicio de sesión exitoso
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      return false; // Inicio de sesión incorrecto
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
