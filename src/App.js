import './App.css'
import {Button, Card, Col, Container, ListGroup, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
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



function App() {


    return (

      <>
        <NavBarComponent />
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

              </Switch>
              {/*<Row className={"p-2 pt-5 justify-content-start"}>*/}
              {/*    {*/}
              {/*        fakeData.map((artist, index)=>*/}
              {/*            (<Col className={"d-flex justify-content-center p-1 col-md-auto "} key={index}>*/}
              {/*                <Card style={{ width: '15rem' }}>*/}
              {/*                    <Card.Img className={"img-fluid img-thumbnail"} variant="top" src={artist.coverImg} />*/}

              {/*                    <Card.Body>*/}
              {/*                        <Card.Title>{artist.name}</Card.Title>*/}
              {/*                        /!*<Card.Text>*!/*/}
              {/*                        /!*    Toan*!/*/}
              {/*                        /!*</Card.Text>*!/*/}
              {/*                        <Button variant="primary" className={"bg-info"}>See Artist</Button>*/}
              {/*                    </Card.Body>*/}
              {/*                </Card>*/}
              {/*            </Col>)*/}
              {/*        )*/}
              {/*    }*/}
              {/*    /!*<Col className={"d-flex justify-content-center p-1 col-md-auto "}>*!/*/}
              {/*    /!*    <Card style={{ width: '15rem' }}>*!/*/}
              {/*    /!*        <div className={"h-75"}>*!/*/}
              {/*    /!*            <Card.Img className={"img-fluid img-thumbnail"} variant="top" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />*!/*/}
              {/*    /!*        </div>*!/*/}
              {/*    /!*        <Card.Body>*!/*/}
              {/*    /!*            <Card.Title>Toan Bui</Card.Title>*!/*/}
              {/*    /!*            /!*<Card.Text>*!/*!/*/}
              {/*    /!*            /!*    Toan*!/*!/*/}
              {/*    /!*            /!*</Card.Text>*!/*!/*/}
              {/*    /!*            <Button variant="primary" className={"bg-info"}>See Artist</Button>*!/*/}
              {/*    /!*        </Card.Body>*!/*/}
              {/*    /!*    </Card>*!/*/}
              {/*    /!*</Col>*!/*/}

              {/*</Row>*/}



          </Container>
        <ReactJkMusicPlayer className={"haha"} showMediaSession audioLists={[{"musicSrc": "https://toantestt.s3.amazonaws.com/lmao.mp3"}]}/>
        </>

);
};

export default App;
