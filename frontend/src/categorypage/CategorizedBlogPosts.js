import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPostCard from "../util/BlogPostCard";
import AppNavbar from "../appnavbar/AppNavbar";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {Container} from "reactstrap";
export default function CategorizedBlogPosts() {
    const {categoryId} = useParams();
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        axios.get(`/categories/${categoryId}/blogposts`)
            .then((response) => {
                setBlogPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching blog posts by category:', error);
            });
    }, [categoryId]);


    return (
        <div>
            <AppNavbar/>
            <Container className="w-50">
                {blogPosts.map((blogPost) => (
                    <BlogPostCard key={blogPost.id} post={blogPost} />
                ))}
            </Container>
        </div>
    );
}
