import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Container, Row, Col, Card, CardBody, Button} from 'reactstrap';
import AppNavbar from '../appnavbar/AppNavbar';
import ReactMarkdown from 'react-markdown';
import "../App.css"
import Comment from "./Comment";
import BlogPostCard from "../util/BlogPostCard";

export default function BlogPostPage() {
    const { blogPostId } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    const [score, setScore] = useState(0);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [newCommentText, setNewCommentText] = useState('');
    const isLoggedIn = !!localStorage.getItem('jwtToken');
    const [recommendedBlogPosts, setRecommendedBlogPosts] = useState([]);
    const [blogpostContent, setBlogPostContent] = useState();
    const commentButtonActive = showComments ? 'clicked-button' : '';


    const getRandomRecommendations = (blogPosts, count, currentBlogPostId) => {
        const shuffled = [...blogPosts];
        const filtered = shuffled.filter((post) => post.blogPostId !== currentBlogPostId);

        for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }

        return filtered.slice(0, count);
    };


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    useEffect(() => {

        axios
            .get(`/blogposts/${blogPostId}`)
            .then((response) => {
                setBlogPost(response.data);
                setScore(response.data.score);

                axios
                    .get(`/content/blogposts/${blogPostId}`)
                    .then((response) => {
                        setBlogPostContent(response.data)
                    })

                const categoryId = response.data.categoryId;

                axios
                    .get(`/categories/${categoryId}/blogposts`)
                    .then((categoryResponse) => {
                        const recommended = getRandomRecommendations(categoryResponse.data, 3, blogPostId);
                        setRecommendedBlogPosts(recommended);
                    })
                    .catch((categoryError) => {
                        console.error('Error fetching related blog posts:', categoryError);
                    });


            })

        axios
            .get(`/blogposts/is-upvoted/${blogPostId}`)
            .then((response) => {
                setIsUpvoted(response.data);
            })
            .catch((error) => {
                console.error('Error fetching upvote status: ', error)
            })

        axios
            .get(`/comments/${blogPostId}`)
            .then((response) => {
                setComments(response.data);
                setNumberOfComments(response.data.length);
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
                    setNumberOfComments(numberOfComments+1);
                    setNewCommentText('');
                })
                .catch((error) => {
                    console.error('Error creating comment:', error);
                });
        }
    };

    const handleScoreButtonClick = () => {

        axios
            .put(`/blogposts/vote/${blogPostId}`)
            .then((response) => {
                if (response.data == "Upvoted!")
                {
                    setScore(score+1);
                    setIsUpvoted(!isUpvoted)
                } else {
                    setScore(score - 1);
                    setIsUpvoted(!isUpvoted)
                }
            })
            .catch((error) => {
                console.error('Error upvoting/removing upvote:', error);
            });
    };

    if (!blogPost) {
        return <div>Loading...</div>;
    }

    const avatarUrl = `https://picsum.photos/50?random=2`;


    return (
        <div className="blog-post-page">
            <AppNavbar />

            <Container className="w-75">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <h1>{blogPost.title}</h1>
                                <p className="mt-4">
                                    <img className="author-avatar" src={avatarUrl} /> Published by {blogPost.authorName}, {formatDate(blogPost.lastUpdated)}
                                </p>
                                <div>
                                    <ReactMarkdown children={blogpostContent}></ReactMarkdown>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="p-lg-3">
                    <Col className="d-flex align-items-center">
                        <Button className={`comment-button ${commentButtonActive}`} onClick={() => setShowComments(!showComments)}>
                            <img src="/comment-dots.svg" alt="Comment Icon" style={{ width: '26px', height: '26px' }} />
                            ({numberOfComments}) {showComments ? 'Hide' : 'Show'}
                        </Button>
                    </Col>
                    <Col>
                        <Button className="score-button w-75" onClick={() => handleScoreButtonClick()}>
                            {isUpvoted ? (
                                  <img src="/full-vote.png" alt="Liked post" style={{ width: '26px', height: '26px' }} />
                            ) : (
                                <img src="/empty-vote.png" alt="Unliked post" style={{ width: '26px', height: '26px' }} />
                            )}
                            {score}
                        </Button>

                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>

                </Row>
            </Container>
            {isLoggedIn? (
            <Container className="w-75 mt-4">
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
                        <Button className="score-button mt-2" onClick={handleCommentSubmit}>
                            Submit Comment
                        </Button>
                    </Col>
                </Row>
            </Container>
            ):(
                <div>
                </div>
            )}

            {showComments && (
                <Container className="w-75 mt-4 mb-5">
                    <Row>
                        <Col>
                            <h3>Comments</h3>
                            {comments.map((comment) => (
                                <Comment
                                    key={comment.commentId}
                                    name={comment.name}
                                    content={comment.content}
                                    avatarUrl={avatarUrl}
                                    timestamp={formatDateComment(comment.date)}
                                />
                            ))}
                        </Col>
                    </Row>
                </Container>
            )}
            <Container className="w-75 mt-5">
                <h2>More Blogposts in this Category</h2>
                <Row className="h-100">
                    {recommendedBlogPosts.slice(0, 3).map((post, index) => (
                        <Col key={index} md={4}>
                            <BlogPostCard post={post} />
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}


function formatDateComment(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}