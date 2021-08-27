import './App.css'
import {Button, Card, Col, Container, Image, ListGroup, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
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
        return (

          <>
            <NavBarComponent />

              {/*<SignInComponent />*/}
              {/*  <SignOutComponent/>*/}

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
