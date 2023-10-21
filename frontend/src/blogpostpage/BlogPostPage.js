import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import AppNavbar from '../appnavbar/AppNavbar';
import ReactMarkdown from 'react-markdown';
import "../App.css"
import Comment from "./Comment";

export default function BlogPostPage() {
    const { blogPostId } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState(''); // State for the new comment text

    const testContent = "# My Markdown Blog Post\n" +
        "\n" +
        "Welcome to my Markdown blog post! In this post, I'll cover some basic formatting and elements that you can use in Markdown to create rich and well-structured content.\n" +
        "\n" +
        "## Headings\n" +
        "\n" +
        "You can create headings using the `#` symbol. There are six levels of headings, from `#` (largest) to `######` (smallest).\n" +
        "\n" +
        "### Subheading\n" +
        "\n" +
        "#### Sub-subheading\n" +
        "\n" +
        "## Lists\n" +
        "\n" +
        "You can create both ordered and unordered lists.\n" +
        "\n" +
        "### Unordered List\n" +
        "- Item 1\n" +
        "- Item 2\n" +
        "    - Sub-item 2.1\n" +
        "    - Sub-item 2.2\n" +
        "- Item 3\n" +
        "\n" +
        "### Ordered List\n" +
        "1. First item\n" +
        "2. Second item\n" +
        "3. Third item\n" +
        "\n" +
        "## Emphasis\n" +
        "\n" +
        "You can emphasize text using *italics* or **bold**.\n" +
        "\n" +
        "## Code\n" +
        "\n" +
        "You can format code inline like `const message = 'Hello, World!'`, or you can create code blocks:\n" +
        "\n" +
        "```javascript\n" +
        "function greet() {\n" +
        "    console.log(\"Hello, World!\");\n" +
        "}\n"


    useEffect(() => {
        // Fetch the blog post
        axios
            .get(`/blogposts/${blogPostId}`)
            .then((response) => {
                setBlogPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching blog post:', error);
            });

        axios
            .get(`/comments/${blogPostId}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, [blogPostId]);

    const handleCommentSubmit = () => {
        if (newCommentText) {
            const newComment = {
                content: newCommentText
            };

            axios
                .post(`/comments/${blogPostId}`, newComment)
                .then((response) => {
                    setComments([...comments, response.data]);
                    setNewCommentText('');
                })
                .catch((error) => {
                    console.error('Error creating comment:', error);
                });
        }
    };

    if (!blogPost) {
        return <div>Loading...</div>;
    }

    const avatarUrl = `https://picsum.photos/50?random=2`;


    return (
        <div className="blog-post-page">
            <AppNavbar />

            <Container className="w-50">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <h1>{blogPost.title}</h1>
                                <p className="mt-4">
                                    <img className="author-avatar" src={avatarUrl} /> Published by {blogPost.authorName}, {formatDate(blogPost.lastUpdated)}
                                </p>
                                <div>
                                    {/*<ReactMarkdown children={blogPost.contentFileName}/>*/}
                                    <ReactMarkdown children={testContent}></ReactMarkdown>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="w-50 mt-4">
                <Row>
                    <Col>
                        <h3>Add a Comment</h3>
                        <textarea
                            rows="4"
                            className="form-control"
                            placeholder="Type your comment here"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                        />
                        <button className="btn btn-primary mt-2" onClick={handleCommentSubmit}>
                            Submit Comment
                        </button>
                    </Col>
                </Row>
            </Container>

            <Container className="w-50 mt-4">
                <Row>
                    <Col>
                        <h3>Comments</h3>
                        {comments.map((comment) => (
                            <Comment
                                key={comment.commentId}
                                commenter={comment.name}
                                content={comment.content}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>



        </div>
    );
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
