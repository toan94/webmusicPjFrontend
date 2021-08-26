import './App.css'
import {Button, Card, Col, Container, ListGroup, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import 'react-jinke-music-player/lib/styles/index.less'
import NavBarComponent from "./component/NavBarComponent";
import LibraryComponent from './component/LibraryComponent'
import {
    Switch,
    Route
} from "react-router-dom";
import SignInComponent from "./component/SignInComponent";
import SignOutComponent from "./component/SignOutComponent";
import ArtistComponent from "./component/ArtistComponent";
import ArtistListComponentWithPagination from "./component/ArtistListComponentWithPagination";
import './css/paginationStyle.scss'
import RegisterComponent from "./component/RegisterComponent";
import SongListComponentWithPagination from "./component/SongListComponentWithPagination";
import {MdDelete} from "react-icons/md";



function App() {



    const [audioList, setAudioList] = useState([
        // { musicSrc: 'https://toantestt.s3.amazonaws.com/TangEmMotBauTroi-LuongGiaHuy-2945059.mp3' }
    ])

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAudioList([{ musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3' }, { musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3' }])
    //     }, 3000)
    // }, [setAudioLists])
        return (

          <>
            <NavBarComponent />
              <Button  className={"ms-3 mt-5"} variant="outline-success" onClick={()=>setAudioList([])}><MdDelete /></Button>

              {/*<SignInComponent />*/}
              {/*  <SignOutComponent/>*/}

              <Container className={"bg-white w-75 pt-5" }>


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
                          <SongListComponentWithPagination setAudioList={setAudioList} audioList={audioList}/>
                      </Route>
                      {/*<Route path="/signOut">*/}
                      {/*    <SignOutComponent />*/}
                      {/*</Route>*/}
                  </Switch>


              </Container>
            <ReactJkMusicPlayer className={"haha"} showMediaSession audioLists={audioList}
                                quietUpdate showMiniProcessBar autoHiddenCover
                                clearPriorAudioLists remove={false}
            />

          </>
        );

}

export default App;
