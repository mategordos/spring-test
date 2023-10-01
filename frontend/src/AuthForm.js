import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "./AppNavbar";

class AuthForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            email: "",
            userName: "",
            password: "",
            confpassword: "",
            onLogin: props.onLogin,
            onSignUp: props.onSignUp
        }
    }

    onSubmitLogin = (e) => {
        this.state.onLogin(e, this.state.login, this.state.password);
    };

    render() {
        return <div>
            <AppNavbar/>
            <Container className="w-25">
                <div className="text-center">
                    <Button className={`me-2 ${this.state.active === 'login' ? 'bg-primary' : 'bg-secondary'}`}
                            onClick={() => this.setState({ active: 'login' })}>Log In</Button>
                    <Button className={`${this.state.active === 'register' ? 'bg-primary' : 'bg-secondary'}`}
                            onClick={() => this.setState({ active: 'register' })}>Register </Button>
                </div>
                <Form>
                    {this.state.active === 'register' &&
                    <FormGroup>
                        <Label for="userName">Name</Label>
                        <Input type="text" name="userName" id="userName" autoComplete="name" placeholder="Your Username"/>
                    </FormGroup>
                    } 
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="yourself@example.com"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password"/>
                    </FormGroup>
                    {this.state.active === 'register' &&
                    <FormGroup>
                        <Label for="confPassword">Confirm Password</Label>
                        <Input type="password" name="confPassword" id="confPassword"/>
                    </FormGroup>
                    }
                    <FormGroup className="pt-2">
                        <Button className="w-100" color="primary" type="submit">
                            Confirm
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default AuthForm;


