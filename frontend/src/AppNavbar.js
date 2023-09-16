import React, {Component} from 'react';
import {Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md" className="mb-2">
            <Nav className="container-fluid">
                <NavItem>
                    <NavbarBrand className="m-lg-3" tag={Link} to="/">Home</NavbarBrand>
                </NavItem>
                <NavItem className="ml-auto">
                    <NavbarBrand tag={Link} to="/auth">Sign Up</NavbarBrand>
                </NavItem>
            </Nav>
        </Navbar>;
    }
}