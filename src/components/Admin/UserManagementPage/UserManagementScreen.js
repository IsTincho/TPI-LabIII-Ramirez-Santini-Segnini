import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { getAuth, deleteUser } from "firebase/auth";
import { database } from "../../firebaseConfig/firebaseConfig";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddNewUsers from "./AddNewUsers";
<<<<<<< HEAD
//xdddd
=======

>>>>>>> parent of 8537078 (Added function: view buy history. Added orderPage, orderContext, modified Cart & NavBar)
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
      <h1>Administración de Usuarios</h1>
      {showAddNewUsers ? (
        <AddNewUsers />
      ) : (
        <Button variant="outline-primary" onClick={handleToggleAddNewUsers}>
          Agregar Nuevo Usuario
        </Button>
      )}{" "}
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
