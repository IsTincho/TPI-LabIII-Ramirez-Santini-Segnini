import React, { useEffect, useState } from "react";
import { getDatabase, ref, update, get, remove } from "firebase/database";
import { Table, Button } from "react-bootstrap";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const database = getDatabase();
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const userList = Object.entries(snapshot.val()).map(([id, user]) => ({
            id,
            ...user,
          }));
          setUsers(userList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleUpdatePermissions = (userId, isAdmin) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);
    update(userRef, { isAdmin });

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, isAdmin };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);
    remove(userRef);

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>User Management</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Admin</th>
            <th>Accion</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.isAdmin ? "Si" : "No"}</td>
              <td>
                <Button
                  variant="btn btn-outline-info"
                  onClick={() =>
                    handleUpdatePermissions(user.id, !user.isAdmin)
                  }
                >
                  Toggle Admin
                </Button>
              </td>
              <td>
                <Button
                  variant="btn btn-outline-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagementPage;
