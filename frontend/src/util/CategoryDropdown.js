import React, { useEffect, useState } from 'react';
import { FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

export default function CategoryDropdown({ setSelectedCategory, initialCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleCategorySelect = (id) => {
        setSelectedCategory(id);
    };

    return (
        <div>
            <CategoryDropdownBase
                categories={categories}
                onSelectCategory={handleCategorySelect}
                initialCategory={initialCategory} // Pass the initial category
            />
        </div>
    );
}

function CategoryDropdownBase({ categories, onSelectCategory, initialCategory }) {
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        onSelectCategory(selectedCategory);
    };

    return (
        <FormGroup>
            <Label for="categorySelect"></Label>
            <Input type="select" id="categorySelect" onChange={handleCategoryChange}>
                <option>Select a category..</option>
                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                        selected={category.id === initialCategory} // Set selected option
                    >
                        {category.categoryName}
                    </option>
                ))}
            </Input>
        </FormGroup>
    );
}
