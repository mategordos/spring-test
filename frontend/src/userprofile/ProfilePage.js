import React, { useEffect, useState } from "react";
import {Container, Card, CardBody, CardTitle, CardText, Row} from "reactstrap";
import axios from "axios";
import AppNavbar from "../appnavbar/AppNavbar";
import BlogPostCard from "../util/BlogPostCard";

// Simplified token parser function
function parseToken(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const decodedToken = JSON.parse(atob(base64));
        console.log("Decoded Token:", decodedToken); // Log the decoded token
        return decodedToken;
    } catch (error) {
        console.error("Error parsing token:", error);
        return null;
    }
}

export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage
    const [blogPosts, setBlogPosts] = useState([]);
    console.log("Token:", token); // Log the retrieved token

    useEffect(() => {
        if (token) {
            // Parse the token to get the user's email
            const decodedToken = parseToken(token);

            if (decodedToken) {
                const userEmail = decodedToken.sub;
                console.log("User Email:", userEmail); // Log the extracted email

                // Make a request to fetch user data based on the email
                axios.get(`/users/by-email?email=${userEmail}`)
                    .then((response) => {
                        setUserData(response.data);
                        console.log("User Data:", response.data); // Log the fetched user data
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
            }
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            // Parse the token to get the user's email
            const decodedToken = parseToken(token);

            if (decodedToken) {
                const userEmail = decodedToken.sub;

                // Make a request to fetch all blog posts by the user's email
                axios.get(`/blogposts/by-author?author=${userEmail}`)
                    .then((response) => {
                        const sortedBlogPosts = response.data.sort((a, b) => {
                            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
                        });

                        setBlogPosts(sortedBlogPosts);
                    })
                    .catch((error) => {
                        console.error("Error fetching blog posts:", error);
                    });
            }
        }
    }, [token]);

    return (
        <div>
            <AppNavbar/>
            <Container className="w-50">
                <Card>
                    <CardBody>
                        <CardTitle>User Profile</CardTitle>
                        <CardText>
                            <strong>Name:</strong> {userData.name}<br />
                            <strong>Email:</strong> {userData.email}<br />
                            {/* Add more fields as needed */}
                        </CardText>
                    </CardBody>
                </Card>
                {blogPosts.map((blogPost) => (
                    <Row className="mt-4">
                        <BlogPostCard post={blogPost} className=""></BlogPostCard>
                    </Row>
                ))}
            </Container>
        </div>
    );
}
