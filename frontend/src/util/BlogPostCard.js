import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardText, CardTitle, Container } from 'reactstrap';
import axios from 'axios';
import '../customstyles.css';
import { Link } from "react-router-dom";

export default function BlogPostCard({ post }) {
    const [categoryName, setCategoryName] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {

        axios
            .get(`/categories/${post.categoryId}`)
            .then((response) => {
                const { categoryName } = response.data;
                setCategoryName(categoryName);
            })
            .catch((error) => {
                console.error('Error fetching category:', error);
            });

        // Format the date
        const date = new Date(post.lastUpdated);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formatted = date.toLocaleDateString(undefined, options);
        setFormattedDate(formatted);
    }, [post.categoryId, post.lastUpdated]);

    const randomAvatarUrl = `https://picsum.photos/50?random=2`;

    return (
            <Container tag={Link} to={`/blogposts/${post.blogPostId}`} className="text-decoration-none">
            <Card className="blogpost-card">
                <CardBody>
                    <div className="author-info">
                        <img
                            src={randomAvatarUrl}
                            alt={`${post.authorName}'s Avatar`}
                            className="author-avatar"
                        />
                        <div className="author-name blogpost-card-text">
                            {post.authorName} {' · '} {formattedDate}
                        </div>
                    </div>
                    <CardTitle className="blogpost-card-title pb-1">{post.title}</CardTitle>
                    <CardText className="blogpost-card-category text-decoration-none" tag={Link} to={`/category/${post.categoryId}`}>
                        {categoryName}
                    </CardText>
                    <div className="blogpost-card-text pt-2">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </div>
                </CardBody>
                <div className="m-lg-3 blogpost-card-text text-decoration-none" >
                    <img src="/full-vote.png" alt="Liked post" style={{ width: '26px', height: '26px' }} />{post.score}
                    <img src="/comment-dots.svg" alt="Liked post" style={{ width: '26px', height: '26px' }} />{post.numberOfComments}
                </div>
            </Card>
        </Container>
    );
}
