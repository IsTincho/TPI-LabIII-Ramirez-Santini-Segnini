import React, { useEffect, useState } from "react";
import { getDatabase, ref, update, remove, push, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { auth } from "../../firebaseConfig/firebaseConfig";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  useEffect(() => {
    getUsers();
  }, []);

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
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      const database = getDatabase();
      const userRef = ref(database, `users/${userId}`);
      remove(userRef);

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    }
  };

  const handleAddUser = async () => {
    try {
      const database = getDatabase();
      const usersRef = ref(database, "users");
      const newUserRef = push(usersRef);
      const newUserKey = newUserRef.key;

      update(ref(database, `users/${newUserKey}`), {
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });

      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      const updatedUsers = [...users, { id: newUserKey, ...newUser }];
      setUsers(updatedUsers);
      setShowModal(false);
      setNewUser({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <Button variant="btn btn-primary mb-2" onClick={() => setShowModal(true)}>
        Add User
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={(e) =>
                    handleUpdatePermissions(user.id, e.target.checked)
                  }
                />
              </td>
              <td>
                <Button variant="btn btn-primary">Edit</Button>
              </td>
              <td>
                <Button
                  variant="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={newUser.isAdmin}
                onChange={(e) =>
                  setNewUser({ ...newUser, isAdmin: e.target.checked })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
