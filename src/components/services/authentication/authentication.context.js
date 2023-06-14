import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig/firebaseConfig";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Comprobar si hay un usuario autenticado al cargar el componente
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        const { email } = authenticatedUser;
        setUser({ email });
      } else {
        setUser(null);
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password, isAdmin) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = { email };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Guardar el usuario en Local Storage
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
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
      localStorage.removeItem("user"); // Eliminar el usuario de Local Storage al cerrar sesión
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
