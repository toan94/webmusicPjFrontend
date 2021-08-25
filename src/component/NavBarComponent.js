import '../css/NavBarComponent.css'
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {MdSearch, MdMusicNote} from 'react-icons/md'

import {
 NavLink
} from "react-router-dom";
function NavBarComponent() {
    return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className={'text-success fs-3'}><MdMusicNote/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to='/library'>Library</Nav.Link>
                            <Nav.Link as={NavLink} to='/artists'>Artists</Nav.Link>
                            <Form className="d-flex">
                                <FormControl
                                    as="input"
                                    size="sm"
                                    type="search"
                                    placeholder="Search Song Name"
                                    className="mr-2 "
                                    aria-label="Search"
                                />
                                <Button className={"searchButton"} variant="outline-success"><MdSearch /></Button>
                            </Form>
                            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                            {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider />*/}
                            {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Log In</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Register
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>




    );
};

export default NavBarComponent;
