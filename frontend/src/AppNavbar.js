import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";

function HomeNavItem() {
    return(
        <NavItem>
            <NavbarBrand className="m-lg-3" tag={Link} to="/">Home</NavbarBrand>
        </NavItem>
    )
}

function SignUpNavItem () {
    return(
        <NavItem className="ml-auto">
            <NavbarBrand tag={Link} to="/auth">Sign Up</NavbarBrand>
        </NavItem>
    )
}

export default function AppNavbar() {
    return (
        <Navbar color="dark" dark expand="md" className="mb-2">
            <Nav className="container-fluid">
                <HomeNavItem />
                <SearchBar/>
                <SignUpNavItem />
            </Nav>
        </Navbar>
    );
}