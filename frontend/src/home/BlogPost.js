import React, {} from 'react';
import {Container} from "reactstrap";
import {Link} from "react-router-dom";

export default function BlogPost({ post }) {
    return(
        <Container>
            <h2>{post.title}</h2>
            <p>{post.categoryId}</p>
        </Container>
    )
}