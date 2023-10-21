import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default function Comment({ name, content }) {
    return (
        <Card className="mb-2">
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{content}</CardText>
            </CardBody>
        </Card>
    )
}

