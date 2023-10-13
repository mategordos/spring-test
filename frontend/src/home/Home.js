import React, {useEffect, useState} from 'react';
import '../App.css';
import AppNavbar from '../AppNavbar';
import {Container} from "reactstrap";
import axios from "axios";
import BlogPost from "./BlogPost";
import {Link} from "react-router-dom";

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
                setBlogPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    return (
        <Container className="w-50">
            {blogPosts.map((blogPost) => (
                <BlogPost post={blogPost}   />
            ))}
        </Container>
    )
}