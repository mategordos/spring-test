import React, { useEffect, useState } from 'react';
import AppNavbar from "../appnavbar/AppNavbar";
import { Button, Col, Container, Input, Row } from "reactstrap";
import {Link, useHistory, useParams} from "react-router-dom";
import CategoryDropdown from "../util/CategoryDropdown";
import Authorized from "../Authorized";
import axios from "axios";

export default function EditPost() {
    const { blogPostId } = useParams();
    const [title, setTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [initialCategory, setInitialCategory] = useState('');
    const history = useHistory();


    useEffect(() => {
        axios.get(`/blogposts/${blogPostId}`)
            .then((response) =>{
                setTitle(response.data.title);
                setInitialCategory(response.data.categoryId);
                setSelectedCategory(response.data.categoryId);

            })
            .catch((error) => {
                console.error('Error fetching blogpost:', error);
            });

        axios.get(`/content/blogposts/${blogPostId}`)
            .then((response) => {
                setPostBody(response.data)
            })
            .catch((error) => {
                console.error('Error fetching content for post: ', error)
            })


    }, [blogPostId, initialCategory]);



    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePostBodyChange = (event) => {
        setPostBody(event.target.value);
    };

    const handleSave = () => {
        const updatedPost =
            {
                title: title,
                categoryId: selectedCategory
            }

        axios.put(`/blogposts/${blogPostId}`, updatedPost)
            .then((response) =>  {
                console.log("Blogpost updated with data: ",response.data)
                axios.put(`/content/blogposts/${blogPostId}`, postBody, {headers: {
                        "Content-Type": "text/plain"}
                })
                    .then((response) => {
                        console.log("AWS Content Updated", response.data)
                    })
                history.push('/');
            })
            .catch((error) => {
                console.error("Blogpost update failed ",error)
            })
    };

    return (
        <div>
            <Authorized requiredRoles={["BLOGGER", "ADMIN"]}>
                <AppNavbar />
                <Container className="w-50 pt-4">
                    <div>
                        <Row>
                            <Col>
                                <h3>Edit Blog Post</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pt-3">
                                <Input
                                    type="text"
                                    placeholder="Enter your title"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </Col>
                        </Row>
                    </div>
                    <CategoryDropdown setSelectedCategory={setSelectedCategory} initialCategory={initialCategory}/>
                    <Row className="pt-3 pb-3">
                        <Col>
                            <Input
                                type="textarea"
                                placeholder="Edit your post..."
                                rows="7"
                                style={{ minHeight: '200px', overflowY: 'scroll' }}
                                value={postBody}
                                onChange={handlePostBodyChange}
                            />
                        </Col>
                    </Row>
                    <Col>
                        <Button color="primary" onClick={handleSave} type="submit">
                            Save
                        </Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </Col>
                </Container>
            </Authorized>
        </div>
    );
}
