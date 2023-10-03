import React, {} from 'react';
import AppNavbar from "../AppNavbar";
import {Button, Col, Container, FormGroup, Input, Label, Row} from "reactstrap";
import {Link} from "react-router-dom";
import axios from 'axios';
import CategoryDropdown from "./CategoryDropdown";

function TitleItem() {
    return (
        <div>
            <Row>
                <Col >
                    <h3>Create a New Blog Post</h3>
                </Col>
            </Row>
                <Row>
                    <Col className="pt-3">
                        <Input type="text" placeholder="Enter your title" />
                    </Col>
             </Row>
        </div>
    );
}

function PostBodyItem() {
    return (
        <Row className="pt-3 pb-3">
            <Col>
                <Input type="textarea" placeholder="Enter your blog post content" rows="7" style={{ minHeight: '200px', overflowY: 'scroll'}}/>
            </Col>
        </Row>
    )
}

function ConfirmButtons() {
    return (
        <Col>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/">Cancel</Button>
        </Col>
    )
}


export default function PostCreator() {
    return(
        <div>
            <AppNavbar/>
            <Container className="w-50 pt-4">
                <TitleItem/>
                <CategoryDropdown/>
                <PostBodyItem/>
                <ConfirmButtons/>
            </Container>
        </div>
    )
}