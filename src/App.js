import './App.css'
import {Button, Card, Col, Container, Image, ListGroup, Nav, Navbar, NavDropdown, Row, Toast} from "react-bootstrap";
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
    Route, useHistory
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
import FbApp, {deleteToken} from './firebase'
// import * as firebase from 'firebase/app';
// import '@firebase/messaging';

import { getMessaging, onMessage } from "firebase/messaging";
// import { getToken, onMessageListener } from './firebase';
import { getToken, onMessageListener } from './firebase';
import StripeButton from "./component/StripeCheckoutComponent";


function App() {


    const history = useHistory();
    const [audioList, setAudioList] = useState([
        // { musicSrc: 'https://toantestt.s3.amazonaws.com/TangEmMotBauTroi-LuongGiaHuy-2945059.mp3' }
    ])
    const aPlayer = useRef(null);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setAudioList([{ musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3' }, { musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3' }])
    //     }, 3000)
    // }, [setAudioLists])

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);
    const [pushdata, setPushdata] = useState('');
    const [time, setTime] = useState('');


    getToken(setTokenFound);
    onMessageListener().then(payload => {
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body});
        setPushdata(payload.data.key1);
        // console.log(payload +"GG");
         console.log(payload.data);

        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
         setTime(dateTime);

    }).catch(err => console.log('failed: ', err));



        return (

          <>
            <NavBarComponent />
              <StripeButton price="969" />
                <Button onClick={()=>{
                    deleteToken();
                }}>delete</Button>
              <div className="App">
                  <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      minWidth: 200
                  }}>
                      <Toast.Header>

                          <strong className="mr-auto">{notification.title}</strong>
                          <small>{time}</small>
                      </Toast.Header>
                      <Toast.Body>{pushdata}</Toast.Body>
                  </Toast>
                  <header className="App-header">
                      {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
                      {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
                      <Button onClick={() => setShow(true)}>Show Toast</Button>
                  </header>

              </div>


              <Container className={"bg-white w-75 pt-5" }>
                  <Row className={"p-2 pt-5 justify-content-start"}>
                      <Col xs={{order: 1}} sm={8}>
                          <Switch>
                              <Route path="/library">
                                  <LibraryComponent />
                              </Route>
                              <Route path="/artists">
                                  <ArtistListComponentWithPagination />
                              </Route>
                              <Route path="/signIn">
                                  <SignInComponent />
                              </Route>
                              <Route path="/register">
                                  <RegisterComponent />
                              </Route>
                              <Route path="/songs">
                                  <SongListComponentWithPagination setAudioList={setAudioList} audioList={audioList} />
                              </Route>
                              <Route path="/myPlaylists">
                                  <PlaylistComponnentWithPagination setAudioList={setAudioList} audioList={audioList} history={history}/>
                              </Route>
                              {/*<Route path="/signOut">*/}
                              {/*    <SignOutComponent />*/}
                              {/*</Route>*/}
                          </Switch>
                      </Col>
                      <Col xs={{order: 2}} sm={4} className={"MyListGroup"}>
                          <ul className="list-group">
                              <li className="list-group-item active" aria-current="true">An active item</li>
                              <li className="list-group-item">A second item</li>
                              <li className="list-group-item">A third item</li>
                              <li className="list-group-item">A fourth item</li>
                              <li className="list-group-item">And a fifth one</li>
                          </ul>
                          <br/>
                          <ListGroup as="ul">
                              <Image src="https://ichef.bbci.co.uk/news/976/cpsprodpb/568C/production/_118965122_gettyimages-572304327.jpg" fluid />
                          </ListGroup>
                          <br/>
                          <ListGroup as="ul">
                              <ListGroup.Item as="li" active>
                                  Cras justo odio
                              </ListGroup.Item>
                              <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
                              <ListGroup.Item as="li" disabled>
                                  Morbi leo risus
                              </ListGroup.Item>
                              <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                              <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                              <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                              <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                              <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                              <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
                          </ListGroup>

                      </Col>
                  </Row>

              </Container>
                <FooterComponent/>
            <ReactJkMusicPlayer className={"haha"} showMediaSession audioLists={audioList}
                                quietUpdate showMiniProcessBar autoHiddenCover
                                clearPriorAudioLists ref={aPlayer}
                                onAudioListsChange={
                                    (currentPlayId, audioLists, audioInfo)=>setAudioList(audioLists)}
            />
            </>
        );

}

export default App;
