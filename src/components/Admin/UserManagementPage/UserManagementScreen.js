import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { getAuth, deleteUser } from "firebase/auth";
import { database } from "../../firebaseConfig/firebaseConfig";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddNewUsers from "./AddNewUsers";
import "../AdminPage/AdminPage.css";

const UserManagementScreen = ({ theme }) => {
  const { user } = useContext(AuthenticationContext);
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [showAddNewUsers, setShowAddNewUsers] = useState(false);

  useEffect(() => {
    const usersRef = database.ref("users");

    // Obtener usuarios iniciales
    usersRef.once("value", (snapshot) => {
      const userData = snapshot.val();
      const usersDataArray = Object.entries(userData).map(([id, user]) => ({
        id,
        ...user,
      }));
      setUsers(usersDataArray);
    });

    // Suscribirse a los cambios en la base de datos
    const onUsersChange = (snapshot) => {
      const userData = snapshot.val();
      const usersDataArray = Object.entries(userData).map(([id, user]) => ({
        id,
        ...user,
      }));
      setUsers(usersDataArray);
    };
    usersRef.on("value", onUsersChange);

    // Limpiar suscripción al desmontar el componente
    return () => {
      usersRef.off("value", onUsersChange);
    };
  }, []);

  const handleToggleAddNewUsers = () => {
    setShowAddNewUsers(!showAddNewUsers);
  };

  const openDeleteConfirmationModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteUser = () => {
    const { id } = userToDelete;
    const usersRef = database.ref("users").child(id);
    usersRef.remove();

    // También puedes eliminar la cuenta de autenticación del usuario si lo deseas
    const auth = getAuth();
    const { email } = userToDelete;
    deleteUser(auth, email);

    closeDeleteModal();
  };

  const openAdminConfirmationModal = (user) => {
    setAdminUser(user);
    setShowAdminModal(true);
  };

  const closeAdminModal = () => {
    setAdminUser(null);
    setShowAdminModal(false);
  };

  const handleToggleAdmin = (user) => {
    openAdminConfirmationModal(user);
  };

  const confirmToggleAdmin = () => {
    const { id, isAdmin } = adminUser;
    const usersRef = database.ref("users").child(id);
    usersRef.update({ isAdmin: !isAdmin });

    closeAdminModal();
  };

  if (!user || !user.isAdmin) {
    return <p>No tienes permisos para acceder a esta página.</p>;
  }

  return (
    <div className={theme === "light" ? "bg-light" : "bg-dark text-light"}>
      <h1>Administración de Usuarios <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
</svg></h1>
      
      
      
      {showAddNewUsers ? (
        <AddNewUsers />
      ) : (
        <div className="d-flex justify-content-center">
        <Button variant="outline-primary" onClick={handleToggleAddNewUsers} >
          Agregar Nuevo Usuario
        </Button>
        </div>
        
      )}{" "}
      <div className="container-admin-page">
        <Table
          responsive
          className={theme === "light" ? "table-light" : "table-dark"}
        >
          <thead>
            <tr>
              <th>Nombre de usuario</th>
              <th>Email</th>
              <th>Administrador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Sí" : "No"}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => openDeleteConfirmationModal(user)}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleToggleAdmin(user)}
                  >
                    {user.isAdmin ? "Remover Admin" : "Asignar Admin"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar a este usuario?
          <p>{userToDelete && userToDelete.username}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdminModal} onHide={closeAdminModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambio de Estado de Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cambiar el estado de administrador de este
          usuario?
          <p>{adminUser && adminUser.username}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAdminModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmToggleAdmin}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagementScreen;
