import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AppNavbar from '../appnavbar/AppNavbar';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('users/login', {
                email: email,
                password: password
            });
            localStorage.setItem('jwtToken', response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            history.push('/');

        } catch (error) {
            console.error('Login failed:', error);
            history.push('/login');

            setError(true);
        }
    };

    return (
        <div>
            <AppNavbar/>
            <Container className="d-flex justify-content-center align-items-center">
                <Row>
                    <Col>
                        <Card style={{minWidth: '50vh', minHeight: '50vh'}}>
                            <CardBody>
                                <CardTitle className="mb-4 text-center h2">Login</CardTitle>
                                <Form onSubmit={handleLogin}>
                                    <FormGroup>
                                        <Label for="email">Email:</Label>
                                        <Input
                                            type="text"
                                            id="email"
                                            value={email}
                                            placeholder="yourself@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password:</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ width: '100%' }}
                                        />
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button type="submit" color="primary" className="mt-4">Login</Button>
                                    </div>
                                    {error && (
                                        <div className="text-center text-danger mb-3 mt-3">
                                            Invalid username or password. Please try again.
                                        </div>
                                    )}
                                </Form>
                            </CardBody>
                            <CardFooter>
                                    Don't have an Insight profile?{' '}
                                    <a href="/signup">Register now</a>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className="text-center mt-3">

            </div>
        </div>
    );
}
