import AppNavbar from "../appnavbar/AppNavbar";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
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
    Input, InputGroup, InputGroupAddon,
    Label,
    Row
} from "reactstrap";

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('users/register', {
                name: name,
                email: email,
                password: password
            });
            localStorage.setItem('jwtToken', response.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            history.push('/');

        } catch (error) {
            console.error('Register failed:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div>
            <AppNavbar/>
            <Container className="d-flex justify-content-center align-items-center">
                <Row>
                    <Col>
                        <Card style={{minWidth: '50vh', minHeight: '50vh'}}>
                            <CardBody>
                                <CardTitle className="mb-4 text-center h2">Sign up to Insight</CardTitle>
                                <Form onSubmit={handleRegister}>
                                    <FormGroup>
                                        <Label for="name">Username:</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            value={name}
                                            placeholder="Your username"
                                            required
                                            minLength="5"
                                            maxLength="20"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email:</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            value={email}
                                            required
                                            placeholder="yourself@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password:</Label>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            value={password}
                                            required
                                            minLength="8"
                                            maxLength="20"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button onClick={togglePasswordVisibility}>
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button type="submit" color="primary" className="mt-5" >Register</Button>
                                    </div>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                Already have an Insight profile?{' '}
                                <a href="/login">Login here.</a>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}