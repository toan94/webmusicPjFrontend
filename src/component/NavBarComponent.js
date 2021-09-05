import '../css/NavBarComponent.css'
import {Button, Container, Dropdown, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {MdSearch, MdMusicNote, MdFace} from 'react-icons/md'

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
                <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={<MdFace/>}
                    menuVariant="dark" className={"text-center"}>

                    <NavDropdown.Item as={NavLink} to='/mySongs'>Your Songs</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/myPlaylists'>Your Playlists</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={()=>{signOut(); history.push('/artists')}} className={"text-danger"}>
                        {/*<Button variant="outline-danger" onClick={()=>{signOut(); history.push('/artists')}}>Logout</Button>*/}
                        Log Out
                    </NavDropdown.Item>
                </NavDropdown>

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
                        <Nav className="me-auto text-center" >
                            <Nav.Link as={NavLink} to='/library'>Home</Nav.Link>
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
