import React, { useEffect, useState } from "react";
import {
    Container,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Row,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Dropdown
} from "reactstrap";
import axios from "axios";
import AppNavbar from "../appnavbar/AppNavbar";
import BlogPostCard from "../util/BlogPostCard";
import {Link, useHistory} from "react-router-dom";



export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem("jwtToken");
    const [blogPosts, setBlogPosts] = useState([]);
    const history = useHistory();
    console.log("Token:", token);

    useEffect(() => {
        if (token) {
            const decodedToken = parseToken(token);

            if (decodedToken) {
                const userEmail = decodedToken.sub;
                console.log("User Email:", userEmail);

                axios.get(`/users/by-email?email=${userEmail}`)
                    .then((response) => {
                        setUserData(response.data);
                        console.log("User Data:", response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
            }
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            const decodedToken = parseToken(token);

            if (decodedToken) {
                const userEmail = decodedToken.sub;

                axios.get(`/blogposts/by-author?author=${userEmail}`)
                    .then((response) => {
                        const sortedBlogPosts = response.data.sort((a, b) => {
                            return b.lastUpdated.localeCompare(a.lastUpdated);
                        });

                        setBlogPosts(sortedBlogPosts);
                    })
                    .catch((error) => {
                        console.error("Error fetching blog posts:", error);
                    });
            }
        }
    }, [token]);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const toggleDropdown = (index) => {
        if (dropdownOpen === index) {
            setDropdownOpen(null);
        } else {
            setDropdownOpen(index);
        }
    };

        const handleDeletePost = (blogPostId) => {
            axios.delete(`/blogposts/${blogPostId}`)
                .then(() => {
                    console.log("BlogPost deleted successfully! ");
                    setBlogPosts(blogPosts.filter(blogPost => blogPost.blogPostId !== blogPostId));

                    axios.delete(`content/blogposts/${blogPostId}`)
                        .then(()=> {
                            console.log("Content deleted succesfully!")
                    })
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                });
        };

    return (
        <div>
            <AppNavbar />
            <Container className="w-50">
                <Card>
                    <CardBody>
                        <CardTitle><h2>User Profile</h2></CardTitle>
                        <CardText>
                            <strong>Name:</strong> {userData.name}<br />
                            <strong>Email:</strong> {userData.email}<br />
                        </CardText>
                    </CardBody>
                </Card>
                {blogPosts.map((blogPost, index) => (
                    <Row className="mt-4" key={blogPost.blogPostId}>
                        <BlogPostCard post={blogPost} className=""/>
                        <div className="text-end">
                            <Dropdown isOpen={dropdownOpen === index} toggle={() => toggleDropdown(index)} >
                                <DropdownToggle caret>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"
                                         className="bi bi-three-dots-vertical align-" viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag={Link} to={`/edit/${blogPost.blogPostId}`}>Edit Post</DropdownItem>
                                    <DropdownItem onClick={() => handleDeletePost(blogPost.blogPostId)}>Delete Post</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Row>
                ))}
            </Container>
        </div>
    );
}
function parseToken(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const decodedToken = JSON.parse(atob(base64));
        console.log("Decoded Token:", decodedToken);
        return decodedToken;
    } catch (error) {
        console.error("Error parsing token:", error);
        return null;
    }
}
