import React, { useEffect, useState } from "react";
import { Container, Row, Table, Input, Button } from "reactstrap";
import axios from "axios";

export default function EditUserDetails() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then((response) => {
                const usersWithRoles = response.data.map(user => ({
                    ...user,
                    selectedRoles: {
                        ADMIN: user.roleNames.includes("ADMIN"),
                        BLOGGER: user.roleNames.includes("BLOGGER"),
                        USER: user.roleNames.includes("USER"),
                    }
                }));

                // Sort the users by ID in ascending order
                const sortedUsers = usersWithRoles.sort((a, b) => a.id - b.id);

                setUsers(sortedUsers);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleRoleChange = (userId, roleName) => {
        setUsers(users.map(user => user.id === userId ? { ...user, selectedRoles: { ...user.selectedRoles, [roleName]: !user.selectedRoles[roleName] } } : user));
    };

    const handleSaveRoles = (userId) => {
        const user = users.find(user => user.id === userId);

        if (!user) {
            console.error("User not found");
            return;
        }

        const selectedRoles = user.selectedRoles;

        const userDto = {
            roleNames: Object.keys(selectedRoles).filter(roleName => selectedRoles[roleName])
        };

        axios.put(`/users/${userId}/roles`, userDto, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
            .then((response) => {
                setUsers(users.map(user => user.id === userId ? response.data : user));
            })
            .catch((error) => {
                console.error('Error updating user roles:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`/users/${userId}`)
            .then(() => {
                console.log("User deleted successfully");
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    return (
        <Container>
            <Row>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={user.selectedRoles.ADMIN}
                                            onChange={() => handleRoleChange(user.id, 'ADMIN')}
                                        /> ADMIN
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={user.selectedRoles.BLOGGER}
                                            onChange={() => handleRoleChange(user.id, 'BLOGGER')}
                                        /> BLOGGER
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={user.selectedRoles.USER}
                                            onChange={() => handleRoleChange(user.id, 'USER')}
                                        /> USER
                                    </label>
                                </div>
                            </td>
                            <td>
                                <Button
                                    className="mt-2"
                                    color="success"
                                    onClick={() => handleSaveRoles(user.id)}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="mt-2"
                                    color="danger"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}
