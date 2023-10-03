import React, {useEffect, useState} from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import axios from "axios";

function CategoryDropdownBase({ categories, onSelectCategory }) {
    // Handle the change event when a category is selected
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        onSelectCategory(selectedCategory);
    };

    return (
        <FormGroup>
            <Label for="categorySelect"></Label>
            <Input type="select" id="categorySelect" onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.categoryName}
                    </option>
                ))}
            </Input>
        </FormGroup>
    );
}


export default function CategoryDropdown() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch categories from the Spring API endpoint
        axios.get('/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return(
        <div>
            <CategoryDropdownBase categories={categories} onSelectCategory={handleCategorySelect} />
        </div>
    )
}