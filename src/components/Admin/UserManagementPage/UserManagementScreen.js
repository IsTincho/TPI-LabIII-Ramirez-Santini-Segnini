import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { getAuth, deleteUser } from "firebase/auth";
import { database } from "../../firebaseConfig/firebaseConfig";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UserManagementScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isAdminToggle, setIsAdminToggle] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

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

  const handleDeleteUser = async () => {
    try {
      const usersRef = database.ref("users");
      await usersRef.child(userToDelete.id).remove();

      const auth = getAuth();
      await deleteUser(auth, userToDelete.userId); // Eliminar el usuario de autenticación

      setUserToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleToggleAdmin = async (user) => {
    try {
      setAdminUser(user);
      setShowAdminModal(true);
    } catch (error) {
      console.error("Error al cambiar isAdmin:", error);
    }
  };

  const confirmToggleAdmin = async () => {
    try {
      const usersRef = database.ref("users");
      await usersRef
        .child(adminUser.id)
        .update({ isAdmin: !adminUser.isAdmin });
      setAdminUser(null);
      setShowAdminModal(false);
    } catch (error) {
      console.error("Error al cambiar isAdmin:", error);
    }
  };

  const openDeleteConfirmationModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const closeAdminModal = () => {
    setAdminUser(null);
    setShowAdminModal(false);
  };

  if (!user || !user.isAdmin) {
    return <p>No tienes permisos para acceder a esta página.</p>;
  }

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <Table responsive>
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
                  variant="danger"
                  onClick={() => openDeleteConfirmationModal(user)}
                >
                  Eliminar
                </Button>
                <Button
                  variant="primary"
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
