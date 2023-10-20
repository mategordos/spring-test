import React, { useState, useEffect } from "react";
import { Container, Row, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";

export default function EditCategoryDetails() {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        axios
            .get("/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleCreateCategory = () => {
        const newCategoryData = {
            categoryName: newCategoryName,
        };

        axios
            .post("/categories", newCategoryData)
            .then((response) => {
                const newCategory = response.data;
                setCategories((prevCategories) => [...prevCategories, newCategory]);
                setNewCategoryName("");
            })
            .catch((error) => {
                console.error("Error creating category:", error);
            });
    };

    const handleDeleteCategory = (categoryId) => {
        axios
            .delete(`/categories/${categoryId}`)
            .then(() => {
                setCategories(categories.filter((category) => category.id !== categoryId));
            })
            .catch((error) => {
                console.error("Error deleting category:", error);
            });
    };

    const handleUpdateCategory = (categoryId, updatedCategoryName) => {
        axios
            .put(`/categories/${categoryId}`, { categoryName: updatedCategoryName })
            .then(() => {
                console.log("Category updated successfully");
            })
            .catch((error) => {
                console.error("Error updating category:", error);
            });
    };

    return (
        <div>
            <Container>
                <h2>Create New Category</h2>
                <Row>
                    <Col xs="8">
                        <Input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Category Name"
                        />
                    </Col>
                    <Col xs="4">
                        <Button onClick={handleCreateCategory} color="primary">
                            Create
                        </Button>
                    </Col>
                </Row>
                <h2>Category List</h2>
                <Table>
                    <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>
                                <Input
                                    type="text"
                                    value={category.categoryName}
                                    onChange={(e) => {
                                        const updatedCategories = [...categories];
                                        updatedCategories.find((c) => c.id === category.id).categoryName = e.target.value;
                                        setCategories(updatedCategories);
                                    }}
                                />
                            </td>
                            <td>
                                <Button
                                    color="primary"
                                    onClick={() => handleUpdateCategory(category.id, category.categoryName)}
                                >
                                    Save
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
