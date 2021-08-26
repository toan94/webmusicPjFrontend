import '../css/NavBarComponent.css'
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {MdSearch, MdMusicNote, MdDelete} from 'react-icons/md'

import {
    NavLink, useHistory
} from "react-router-dom";
import {useAuthUser, useIsAuthenticated, useSignIn, useSignOut} from "react-auth-kit";


function NavBarComponent() {

    const isAuthenticated = useIsAuthenticated()
    let authCheck = isAuthenticated();
    const auth = useAuthUser()
    const signOut = useSignOut()
    let history = useHistory();

    let content;
    console.log(authCheck);
    if (authCheck) {
        content =
            <>
                <Nav.Link disabled className={"text-success"}>
                    Hello {auth().name}
                </Nav.Link>
                <Button variant="outline-danger" onClick={()=>{signOut(); history.push('/artists')}}>Logout</Button>
            </>
                } else {

        content =
            <>
                <Nav.Link as={NavLink} to='/signIn'>
                    Log In
                </Nav.Link>
                <Nav.Link as={NavLink} to='/register'>
                    Register
                </Nav.Link>
            </>


    }
    return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className={'text-success fs-3'}><MdMusicNote/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to='/library'>Library</Nav.Link>
                            <Nav.Link as={NavLink} to='/artists'>Artists</Nav.Link>
                            <Nav.Link as={NavLink} to='/songs'>Songs</Nav.Link>
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
                            {content}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>




    );
}

export default NavBarComponent;
