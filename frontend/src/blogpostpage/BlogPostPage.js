import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import AppNavbar from "../appnavbar/AppNavbar";

export default function BlogPostPage() {
    const {blogPostId} = useParams();
    const [blogPost, setBlogPost] = useState(null);

    useEffect(() => {
        axios.get(`/blogposts/${blogPostId}`)
            .then((response) => {
                setBlogPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching blog post:', error);
            });
    }, [blogPostId]);


    if (!blogPost) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AppNavbar/>
            <h1>{blogPost.title}</h1>
            <p>asdsadasd</p>
        </div>
    );
}
