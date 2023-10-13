import React, {useEffect, useState} from 'react';
import AppNavbar from "../AppNavbar";
import {Button, Col, Container, FormGroup, Input, Label, Row} from "reactstrap";
import {Link} from "react-router-dom";
import axios from 'axios';
import CategoryDropdown from "./CategoryDropdown";
import Authorized from "../Authorized";

export default function PostCreator() {

    const [title, setTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    return(
        <div>
        <Authorized requiredRoles={["BLOGGER", "ADMIN"]}>
            <AppNavbar/>
            <Container className="w-50 pt-4">
                <TitleItem setTitle={setTitle}/>
                <CategoryDropdown setSelectedCategory={setSelectedCategory}/>
                <PostBodyItem/>
                <ConfirmButtons
                    title={title}
                    selectedCategory={selectedCategory}/>
            </Container>
        </Authorized>
        </div>
    )
}

function TitleItem({ setTitle }) {
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div>
            <Row>
                <Col >
                    <h3>Create a New Blog Post</h3>
                </Col>
            </Row>
                <Row>
                    <Col className="pt-3">
                        <Input
                            type="text"
                            placeholder="Enter your title"
                            onChange={handleTitleChange}/>
                    </Col>
             </Row>
        </div>
    );
}

function PostBodyItem() {
    return (
        <Row className="pt-3 pb-3">
            <Col>
                <Input type="textarea" placeholder="Share your insights with others.." rows="7" style={{ minHeight: '200px', overflowY: 'scroll'}}/>
            </Col>
        </Row>
    )
}

function ConfirmButtons({ title, selectedCategory}) {

    useEffect(() => {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []); // Only runs once when the component mounts

    const handleSave = () => {
        // Create a new blog post object
        const newBlogPost = {
            title: title,
            categoryId: selectedCategory,
            // Add other properties if necessary
        };

        axios.post('/blogposts', newBlogPost)
            .then((response) => {
                // Handle success, e.g., redirect to the created blog post
                console.log('Blog post created:', response.data);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error creating blog post:', error);
            });
    };

    return (
        <Col>
            <Button color="primary" onClick={handleSave} type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/">Cancel</Button>
        </Col>
    )
}


