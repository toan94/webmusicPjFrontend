import './App.css'
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    ListGroup,
    Nav,
    Navbar,
    NavDropdown,
    Row,
    Toast
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import 'react-jinke-music-player/lib/styles/index.less'
import NavBarComponent from "./component/NavBarComponent";
import LibraryComponent from './component/LibraryComponent'
import {
    Switch,
    Route, useHistory, useLocation
} from "react-router-dom";
import SignInComponent from "./component/SignInComponent";
import SignOutComponent from "./component/SignOutComponent";
import ArtistListComponentWithPagination from "./component/ArtistListComponentWithPagination";
import RegisterComponent from "./component/RegisterComponent";
import SongListComponentWithPagination from "./component/SongListComponentWithPagination";
import {MdDelete} from "react-icons/md";
import FooterComponent from "./component/FooterComponent";
import PlaylistListDisplayComponent from "./component/PlaylistListDisplayComponent";
import PlaylistComponnentWithPagination from "./component/PlaylistComponnentWithPagination";
// import './scss/custom.scss'
import FbApp, {deleteToken, delToken} from './firebase'
// import * as firebase from 'firebase/app';
// import '@firebase/messaging';

import { getMessaging, onMessage } from "firebase/messaging";
// import { getToken, onMessageListener } from './firebase';
import { getToken, onMessageListener } from './firebase';
import StripeButton from "./component/StripeButton";
import SongListComponentWithPaginationPerPlaylist from "./component/SongListComponentPerPlaylist";
import SongListComponentPerUser from "./component/SongListComponentPerUser";
import SongUploadComponent from "./component/SongUploadComponent";
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import AdminComponent from "./component/AdminComponent";
import AdminNavBarComponent from "./component/AdminNavBarComponent";
import AdminArtistListComponent from "./component/AdminArtistListComponent";
import AdminSongListComponent from "./component/AdminSongListComponent";
import AddNewAdminComponent from "./component/AddNewAdminComponent";
import HomeComponent from "./component/HomeComponent";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


function App() {


    const history = useHistory();
    const location = useLocation();
    const [audioList, setAudioList] = useState([
        // { musicSrc: 'https://toantestt.s3.amazonaws.com/TangEmMotBauTroi-LuongGiaHuy-2945059.mp3' }
    ])
    const aPlayer = useRef(null);
    const isAuthenticated = useIsAuthenticated();
    const auth = useAuthUser();
    const authHeader = useAuthHeader();
    let roles = [];
    let isAdmin = false;

    if (isAuthenticated()) {
         roles = auth().roles;
         isAdmin = roles.includes("ROLE_ADMIN");
        console.log(auth());
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAudioList([{ musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3' }, { musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3' }])
    //     }, 3000)
    // }, [setAudioLists])

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);
    // const [pushdata, setPushdata] = useState('');
    const [time, setTime] = useState('');
    const [activeNotification, setActiveNotification] = useState(false);
    const [coinAmount, setCoinAmount] = useState(0);


    // getToken(setTokenFound);
    onMessageListener().then(payload => {
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body});
        setActiveNotification(true);
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
         setTime(dateTime);

         history.push(payload.data.url);
    }).catch(err => console.log('failed: ', err));



        return (

          <>
              {
                  roles.includes("ROLE_ADMIN") ?
                      <AdminNavBarComponent /> : <NavBarComponent activeNotification={activeNotification}
                                                                  setActiveNotification={setActiveNotification}
                                                                  coinAmount={coinAmount}
                                                                  setCoinAmount={setCoinAmount}
                                                />
              }

              {/*<StripeButton price="969" />*/}
              {/*  <Button onClick={()=>{*/}
              {/*      delToken();*/}
              {/*  }}>delete</Button>*/}
                  <Toast onClose={() => setShow(false)} show={show} delay={8000} autohide animation style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      minWidth: 100
                  }}>
                      <Toast.Header>

                          <strong className="mr-auto">{notification.title}</strong>

                      </Toast.Header>
                      <Toast.Body>
                          <h6 className="text-success">
                          {notification.body}</h6>

                          <small>{time}</small>
                      </Toast.Body>


                  </Toast>
              {/*    <header>*/}
              {/*        {isTokenFound && <h1> Notification permission enabled ???????? </h1>}*/}
              {/*        {!isTokenFound && <h1> Need notification permission ?????? </h1>}*/}
              {/*        <Button onClick={() => setShow(true)}>Show Toast</Button>*/}
              {/*    </header>*/}



              <Container className={"bg-white w-75 pt-5" }>
                  <Row className={"p-2  justify-content-start"}>
                      <Col xs={{order: 1}} sm={8}>
                          <Switch>
                              <Route path="/" exact>
                                  <HomeComponent history={history} isAuth={isAuthenticated()} isAdmin={isAdmin}/>
                              </Route>
                              <Route path="/artists">
                                  <ArtistListComponentWithPagination history={history} isAuth={isAuthenticated()} isAdmin={isAdmin}/>
                              </Route>
                              <Route path="/signIn">
                                  <SignInComponent setTokenFound={setTokenFound}/>
                              </Route>
                              <Route path="/register">
                                  <RegisterComponent />
                              </Route>
                              <Route path="/genre/:genre">
                                  <SongListComponentWithPagination
                                      setCoinAmount={setCoinAmount} setAudioList={setAudioList} audioList={audioList} history={history} isAuth={isAuthenticated()}/>
                              </Route>
                              <Route path="/song/upload">
                                  <SongUploadComponent />
                              </Route>
                              <Route path="/songs">
                                  <SongListComponentWithPagination location={location}
                                      setCoinAmount={setCoinAmount} setAudioList={setAudioList} audioList={audioList} history={history} isAuth={isAuthenticated()}/>
                              </Route>

                              <Route path="/myPlaylists/:playlistId">
                                  <SongListComponentWithPaginationPerPlaylist setAudioList={setAudioList} audioList={audioList} history={history}/>
                              </Route>
                              <Route path="/myPlaylists">
                                  <PlaylistComponnentWithPagination setAudioList={setAudioList} audioList={audioList} history={history}/>
                              </Route>
                              <Route path="/mySongs">
                                  <SongListComponentPerUser setAudioList={setAudioList} audioList={audioList} self={true}/>
                              </Route>
                              <Route path="/artist/:username">
                                  <SongListComponentPerUser setCoinAmount={setCoinAmount} setAudioList={setAudioList} audioList={audioList} self={false}/>
                              </Route>
                              <Route path="/admin/artists">
                                  <AdminArtistListComponent history={history} isAdmin={isAdmin}/>
                              </Route>
                              <Route path="/admin/songs">
                                  <AdminSongListComponent history={history} isAdmin={isAdmin}/>
                              </Route>
                              <Route path="/admin/newAdmin">
                                  <AddNewAdminComponent history={history} isAdmin={isAdmin} authHeader={authHeader()}/>
                              </Route>
                              <Route path="/Home">
                                  <HomeComponent history={history} isAdmin={isAdmin}/>
                              </Route>
                              {/*<Route path="/admin">*/}
                              {/*    <AdminComponent />*/}
                              {/*</Route>*/}


                              {/*<Route path="/signOut">*/}
                              {/*    <SignOutComponent />*/}
                              {/*</Route>*/}
                          </Switch>
                      </Col>
                      <Col xs={{order: 2}} sm={3} className={"MyListGroup"}>
                          {/*<ul className="list-group">*/}
                          {/*    <li className="list-group-item text-success">A Place To Share Music</li>*/}
                          {/*</ul>*/}
                          {/*<br/>*/}
                          {/*<ListGroup as="ul">*/}
                          {/*    <Image src="https://c4.wallpaperflare.com/wallpaper/941/564/17/1920x1280-px-closeup-lights-musical-instrument-plates-vinyl-animals-bugs-hd-art-wallpaper-preview.jpg" fluid />*/}
                          {/*</ListGroup>*/}
                          {/*<br/>*/}


                                  <Form onSubmit={(e)=>{
                                      e.preventDefault();
                                      console.log(e.target.searchTitle.value);
                                      history.push(`/songs?searchTitle=${e.target.searchTitle.value}`);
                                  }}>
                                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                          <Form.Label className="text-success">Search For Song</Form.Label>
                                          <Form.Control type="text" placeholder="Song Name" name="searchTitle"/>
                                      </Form.Group>
                                  </Form>

                          <br/>
                          <ul className="list-group d-flex">
                              <div class="d-flex justify-content-start">
                                  <Button onClick={()=>{history.push("/genre/Pop")}}
                                      variant="outline-success flex-grow-1 me-4" className="w-25">Pop</Button>
                                  <Button onClick={()=>{history.push("/genre/Rock")}}
                                      variant="outline-success" className=" w-25">Rock</Button>
                              </div>
                              <br/>
                              <div class="d-flex justify-content-evenly" >
                                  <Button onClick={()=>{history.push("/genre/Classical")}}
                                      variant="outline-success" className=" w-25 flex-grow-1">Classical</Button>
                              </div>
                              <br/>
                              <div class="d-flex justify-content-evenly">
                                  <Button variant="outline-success" className=" w-25 flex-grow-1">Topping Up!</Button>
                                  <Button variant="outline-success" className=" w-25 ms-4">Holder</Button>
                              </div>


                          </ul>
                          <br/>
                          <ListGroup as="ul">
                              <Image src="https://360nhatban.net/wp/wp-content/uploads/2017/08/sale.jpg" fluid />
                          </ListGroup>
                          <br/>

                          <ul className="list-group">
                              <li className="list-group-item text-success">Share The Inspiration</li>
                          </ul>
                          <br/>
                          <ListGroup as="ul">
                              <Image src="https://scrollonline.net/wp-content/uploads/2017/03/Three-Decades-of-Black-Music.jpg" fluid />
                          </ListGroup>



                      </Col>
                  </Row>

              </Container>
                <FooterComponent/>

              {
                  roles.includes("ROLE_ADMIN") ? null : <ReactJkMusicPlayer className={"haha"} showMediaSession audioLists={audioList}
                                                                            quietUpdate showMiniProcessBar autoHiddenCover
                                                                            clearPriorAudioLists ref={aPlayer}
                                                                            onAudioListsChange={
                                                                                (currentPlayId, audioLists, audioInfo)=>setAudioList(audioLists)}
                  />
              }

            </>
        );

}

export default App;
