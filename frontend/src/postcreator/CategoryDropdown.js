import React, {useEffect, useState} from 'react';
import {FormGroup, Input, Label} from "reactstrap";
import axios from "axios";


export default function CategoryDropdown({ setSelectedCategory }) {
    const [categories, setCategories] = useState([]);

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

    const handleCategorySelect = (id) => {
        setSelectedCategory(id);
        console.log(id);
    };

    return (
        <div>
            <CategoryDropdownBase categories={categories} onSelectCategory={handleCategorySelect}/>
        </div>
    )
}
function CategoryDropdownBase({ categories, onSelectCategory }) {
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
                    <option key={category.id} value={category.id}>
                        {category.categoryName}
                    </option>
                ))}
            </Input>
        </FormGroup>
    );
}