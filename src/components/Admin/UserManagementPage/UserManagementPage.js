import React, { useEffect, useState } from "react";

import { getDatabase, ref, update, get } from "firebase/database";

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

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdatePermissions(user.id, !user.isAdmin)
                  }
                >
                  Toggle Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
