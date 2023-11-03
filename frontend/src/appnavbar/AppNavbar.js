import React, { useState } from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchBar from "../util/SearchBar";
import axios from "axios";

function HomeNavItem() {
    return(
        <NavItem>
            <NavbarBrand className="m-lg-3" tag={Link} to="/">Insight.</NavbarBrand>
        </NavItem>
    )
}

function SignUpProfileNavItem () {
    const isLoggedIn = !!localStorage.getItem('jwtToken');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.common["Authorization"];

        setDropdownOpen(false);
    };



    return(
        <NavItem className="m-lg-0">
            {isLoggedIn ? (
                <UncontrolledDropdown inNavbar>
                    <DropdownToggle caret tag={NavbarBrand} to="/profile">
                        Profile
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={Link} to="/profile">My Profile</DropdownItem>
                        <DropdownItem onClick={handleSignOut} tag={Link} to={"/"}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            ) : (
                <NavbarBrand tag={Link} to="/login">Sign In</NavbarBrand>
            )}
        </NavItem>
    )
}

function PostNavItem() {
    const isLoggedIn = !!localStorage.getItem('jwtToken');
    return(
        <NavItem tag={Link} to="/create" className="pe-3">
            {isLoggedIn ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" className="bi bi-pen"
                     viewBox="0 0 16 16">
                    <path
                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg>
            ) : (
                <></>
            )}

        </NavItem>
    )
}

export default function AppNavbar() {
    return (
        <Navbar color="dark" dark expand="md" className="mb-2">
            <Nav className="container-fluid">
                <HomeNavItem />
                <SearchBar/>
                <PostNavItem/>
                <SignUpProfileNavItem />
            </Nav>
        </Navbar>
    );
}