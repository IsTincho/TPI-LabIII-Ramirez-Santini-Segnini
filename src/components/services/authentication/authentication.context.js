import React, { createContext, useEffect, useState } from "react";
import { auth, database } from "../../firebaseConfig/firebaseConfig";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userIdForCart, setUserIdForCart] = useState();

  useEffect(() => {
    // Comprobar si hay un usuario autenticado al cargar el componente
    const unsubscribe = auth.onAuthStateChanged(async (authenticatedUser) => {
      if (authenticatedUser) {
        const { email } = authenticatedUser;
        const userId = authenticatedUser.uid;

        // Obtener los datos del usuario desde la base de datos de Firebase
        const userSnapshot = await database
          .ref(`users/${userId}`)
          .once("value");
        const userData = userSnapshot.val();

        const isAdmin = userData?.isAdmin || false; // Obtener el valor de isAdmin, si no existe, establecerlo como false
        const username = userData?.username || "";
        const loggedInUser = { email, isAdmin, username };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
      } else {
        setUser(null);
        localStorage.removeItem("user"); // Eliminar el usuario de Local Storage al cerrar sesión
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("cart");
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const userId = user.uid;

      // Obtener los datos del usuario desde la base de datos de Firebase
      const userSnapshot = await database.ref(`users/${userId}`).once("value");
      const userData = userSnapshot.val();

      const isAdmin = userData?.isAdmin || false; // Obtener el valor de isAdmin, si no existe, establecerlo como false
      const username = userData?.username || "";
      const loggedInUser = { email, isAdmin, username };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin)); // Agregar esta línea para guardar isAdmin en localStorage

      return true; // Inicio de sesión exitoso
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      return false; // Inicio de sesión incorrecto
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // No es necesario eliminar los datos aquí, se manejan en el listener onAuthStateChanged
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getUserId = auth.onAuthStateChanged(async (authenticatedUser) => {
    setUserIdForCart(authenticatedUser?.uid);
  });

  return (
    <AuthenticationContext.Provider
      value={{ user, handleLogin, handleLogout, getUserId, userIdForCart }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
