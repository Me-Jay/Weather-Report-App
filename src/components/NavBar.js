import React, { useContext } from 'react';
import { Form, Navbar, Button, Nav, FormControl } from 'react-bootstrap';
import AuthContext from '../context/auth-context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavLink = styled(Link)`
    text-decoration: none !important;
    color: lightgray;
`;

const NavBar = () => {
    const { token, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">Weather Report</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav className="mr-auto">

                        <NavLink to="/home">Home</NavLink>

                    </Nav>
                </Nav>

                <Nav>
                    {
                        token && <Button className="ml-2" onClick={handleLogout}>Logout</Button>
                    }
                    {
                        !token && <NavLink className="btn btn-primary" to="/auth">Login</NavLink>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;