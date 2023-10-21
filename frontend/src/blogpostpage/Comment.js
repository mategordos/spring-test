import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default function Comment({ commenterName, content }) {
    return (
        <Card className="mb-2">
            <CardBody>
                <CardTitle>{commenterName}</CardTitle>
                <CardText>{content}</CardText>
            </CardBody>
        </Card>
    )
}

