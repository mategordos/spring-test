import React, { useEffect, useState } from 'react';
import {Card, Container} from 'reactstrap';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function BlogPostCard({ post }) {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        // Fetch category based on the post's categoryId
        axios
            .get(`/categories/${post.categoryId}`)
            .then((response) => {
                const { categoryName } = response.data; // Extract categoryName from the response
                setCategoryName(categoryName);
            })
            .catch((error) => {
                console.error('Error fetching category:', error);
            });
    }, [post.categoryId]);

    return (
        <Container tag={Link} to={`/blogposts/${categoryName}/${post.title}`}>
            <Card>
            <h2>{post.title}</h2>
            <p>{categoryName}</p>
            </Card>
        </Container>
    );
}
