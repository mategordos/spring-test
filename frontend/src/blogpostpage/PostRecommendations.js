import {Col, Container, Row} from "reactstrap";
import BlogPostCard from "../util/BlogPostCard";

export default function PostRecommendations({ blogPosts }) {

    return (
        <Container>
            <Row>
                {blogPosts.slice(0, 3).map((post, index) => (
                    <Col key={index} md={4}>
                        <BlogPostCard post={post} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}