import AppNavbar from "../appnavbar/AppNavbar";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Row} from "reactstrap";
import BlogPostCard from "../util/BlogPostCard";

export default function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const originalKeyword = queryParams.get('keyword');
    const keyword = queryParams.get('keyword').toLowerCase();

    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        axios.get(`/blogposts/search?keyword=${keyword}`)
            .then((response) => {
                const sortedBlogPosts = response.data.sort((a, b) => {
                    return b.lastUpdated.localeCompare(a.lastUpdated);
                });
                setBlogPosts(sortedBlogPosts);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [keyword]);



    return (
        <div>
            <AppNavbar/>

            <Container className="w-50 ">
                <h1 className="mt-3 mb-5">Search results for {originalKeyword}:</h1>
                {blogPosts.map((blogPost) => (
                    <Row className="mt-4">
                        <BlogPostCard post={blogPost} className=""></BlogPostCard>
                    </Row>
                ))}
            </Container>
        </div>
    )
}