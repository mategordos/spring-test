import React, {useEffect, useState} from 'react';
import '../App.css';
import AppNavbar from '../appnavbar/AppNavbar';
import {Container, Row} from "reactstrap";
import axios from "axios";
import BlogPostCard from "../util/BlogPostCard";

export default function Home(){
    return (
        <div>
            <AppNavbar/>
            <PostsContainer/>
        </div>
    )
}

function PostsContainer() {
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
        axios.get('/blogposts')
            .then((response) => {
                const sortedBlogPosts = response.data.sort((a, b) => {
                    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
                });

                setBlogPosts(sortedBlogPosts);
            })
            .catch((error) => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    return (
        <Container className="w-50 ">
            {blogPosts.map((blogPost) => (
                <Row className="mt-4">
                    <BlogPostCard post={blogPost} className=""></BlogPostCard>
                </Row>
            ))}
        </Container>
    )
}