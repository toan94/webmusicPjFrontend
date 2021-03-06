import '../css/NavBarComponent.css'
import {Button, Container, Dropdown, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react'
import {MdSearch, MdMusicNote, MdFace, MdFileUpload} from 'react-icons/md'
import { NotificationImportantSharp, NotificationsNone, ShoppingCart  } from '@material-ui/icons';


import {
    NavLink, useHistory
} from "react-router-dom";
import {useAuthHeader, useAuthUser, useIsAuthenticated, useSignIn, useSignOut} from "react-auth-kit";
import playlistService from "../services/playlistService";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import axios from "axios";
import {deleteToken, delToken} from "../firebase";
import firebaseService from "../services/firebaseService";
import '../css/dropdown.css'
import notificationService from "../services/notificationService";
import StripeButton from "./StripeButton";
import NavContext from "react-bootstrap/NavContext";
import paymentService from "../services/paymentService";
import ModalContext from "react-bootstrap/ModalContext";

function NavBarComponent({activeNotification, setActiveNotification, coinAmount, setCoinAmount}) {

    const isAuthenticated = useIsAuthenticated()
    let authCheck = isAuthenticated();
    const auth = useAuthUser()
    const signOut = useSignOut()
    let history = useHistory();
    const [show, setShow] = useState(false);
    const authHeader = useAuthHeader();
    const [messages, setMessages] = useState([]);
    const [showBuy, setShowBuy] = useState(false);
    // const [coinAmount, setCoinAmount] = useState(0);


    paymentService.getBalance(authHeader()).then((res)=>{
        setCoinAmount(res.data);
    }).catch(err=>console.log(err));

    let content;
    console.log("navbar authcheck"+authCheck);
    if (authCheck) {
        content =
            <>

                <Nav.Link disabled={true} className="text-success font-monospace">You have: <span className="text-light">{coinAmount}</span> Coins</Nav.Link>
                <Button variant="outline-success" className="me-2" onClick={()=>setShowBuy(true)}><ShoppingCart /></Button>

                <Button variant="outline-success" onClick={()=>history.push('/song/upload')}>Upload Song <MdFileUpload /></Button>
                <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={<MdFace/>}
                    menuVariant="dark" className={"text-center"}>

                    <NavDropdown.Item as={NavLink} to='/mySongs'>Your Songs</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to='/myPlaylists'>Your Playlists</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>setShow(true)}>Change Avatar</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={()=>{
                        delToken().then(fulfillmentValue => {
                            firebaseService.delToken(authHeader()).then(res=>{
                                console.log(res);
                                signOut();

                            });

                        });

                        history.push('/Home');
                    }} className={"text-danger"}>
                        {/*<Button variant="outline-danger" onClick={()=>{signOut(); history.push('/artists')}}>Logout</Button>*/}
                        Log Out
                    </NavDropdown.Item>
                </NavDropdown>

                {/*notification */}
                <NavDropdown title={activeNotification ? <NotificationImportantSharp/> : <NotificationsNone />} id="nav-dropdown" className={"text-center" +
                " notification"} menuVariant="dark" onToggle={(expanded)=>{
                    if (expanded) {
                        setActiveNotification(false);
                        notificationService.getNotifications(authHeader()).then((res)=>{
                            setMessages(res.data.messages);
                        }).catch(e=>console.log(e));
                    }
                }
                }>
                    {/*<NavDropdown.Item eventKey="4.1">*/}
                    {/*    <h6>XXxxxX uploaded a new song</h6>*/}
                    {/*    <p className="" style={{fontSize: "0.9em"}}>Song name: the god of the new world</p>*/}
                    {/*    <p className="m-0 text-end" style={{fontSize: "0.80em"}}>26-7-2012 11:11:11</p>*/}
                    {/*</NavDropdown.Item>*/}
                    {/*<hr/>*/}

                    {
                        messages.map((message, index)=>(
                            <>
                                <NavDropdown.Item onClick={()=>{history.push(`${message.url}`)}}>
                                    <h6>{message.subject}</h6>
                                    <p className="" style={{fontSize: "0.9em"}}>{message.content}</p>
                                    <p className="m-0 text-end" style={{fontSize: "0.80em"}}>{message.creationDate}</p>
                                </NavDropdown.Item>
                                <hr/>
                            </>
                        ))
                    }
                </NavDropdown>

                <Modal
                    show={showBuy}
                    onHide={()=>setShowBuy(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Only $1 For Every 10 Coins!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center">
                        <StripeButton coin={10} setCointAmount={setCoinAmount} setShowBuy={setShowBuy}/>
                        <StripeButton coin={50} setCointAmount={setCoinAmount} setShowBuy={setShowBuy}/>
                        <StripeButton coin={100} setCointAmount={setCoinAmount} setShowBuy={setShowBuy}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={()=>setShowBuy(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>




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
<>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className={'text-success fs-3'}><MdMusicNote/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto text-center" >
                            <Nav.Link as={NavLink} to='/Home'>Home</Nav.Link>
                            <Nav.Link as={NavLink} to='/artists'>Artists</Nav.Link>
                            <Nav.Link as={NavLink} to='/songs'>Songs</Nav.Link>

                        </Nav>
                        <Nav className="text-center">

                            {content}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



    <Modal
        show={show}
        onHide={()=>setShow(false)}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Upload New Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form className="w-75" onSubmit={(e)=>{
                e.preventDefault();
                let formData = new FormData();
                formData.append("file", e.target.songFile.files[0]);
                // formData.append("songName", e.target.songName.value);
                axios.post('http://localhost:8080/api/test/avatar', formData,
                    {headers: {'Content-Type': 'multipart/form-data', "Authorization": authHeader()}})
                    .then((res)=>{
                        if(res.status === 200) {
                            // this.setState({signUpRequestStatus: "Registration success! You will be redirected " +
                            //         "in 5 seconds", done:true},()=> setTimeout(()=>this.props.history.push('/signIn'), 5000));
                            // console.log(res);
                            setShow(false);
                            history.push('/artists');
                        }
                    }, (err)=>{
                        // this.setState({failureNotification: "Registration failed please choose another Username or Email"});
                        console.log(err);

                    })
            }}>
                <Input
                    name="songFile"
                    // onChange={this.onChangeHandler}
                    type="file"
                    className="form-control ms-3 mt-2"
                />

                <button className="btn btn-outline-success btn-block login ms-3 mt-3" type="submit">Upload</button>
            </Form>
        </Modal.Body>
        {/*<Modal.Footer>*/}

        {/*</Modal.Footer>*/}
    </Modal>
</>




    );
}

export default NavBarComponent;
