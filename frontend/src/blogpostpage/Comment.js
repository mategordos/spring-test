import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default function Comment({ name, content, avatarUrl, timestamp }) {
    return (
        <Card className="mb-2">
            <CardBody>
                <div className="d-flex align-items-start">
                    <img className="author-avatar" src={avatarUrl} alt={name} style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                    <div>
                        <CardTitle>{name}, at {timestamp}</CardTitle>
                        <CardText>{content}</CardText>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

