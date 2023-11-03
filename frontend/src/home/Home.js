import React, {useEffect, useState} from 'react';
import '../App.css';
import AppNavbar from '../appnavbar/AppNavbar';
import {Col, Container, Row} from "reactstrap";
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
                    return b.lastUpdated.localeCompare(a.lastUpdated);
                });

                setBlogPosts(sortedBlogPosts);
            })
            .catch((error) => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    return (
        <div >
            <Container  className="w-50">
                <Col>
                    {blogPosts.map((blogPost) => (
                        <Row className="mt-4">
                            <BlogPostCard post={blogPost}></BlogPostCard>
                        </Row>
                    ))}
                </Col>
            </Container>
        </div>
    )
}