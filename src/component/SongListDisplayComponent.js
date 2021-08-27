import {Button, Card, Col, Container, Dropdown, Form, Row, Spinner} from "react-bootstrap";
import React from "react";
import {MdAddToQueue, MdPlayArrow} from "react-icons/md";
import ReactDOM from 'react-dom';


export  default class SongListDisplayComponent extends React.Component {

    render(){
        let songList = this.props.songList;
        const cloudPath = 'https://toantestt.s3.amazonaws.com/';
        const setAudioList = this.props.setAudioList;
        const audioList = this.props.audioList;
        return (
            <Row className={"p-2 pt-5 justify-content-start"}>
                {
                    songList.map((song, index) => (
                        <Col className={"d-flex justify-content-center p-3 col-md-auto "}>
                            <Card border="light" style={{ width: '15rem' }} className={""}>
                                <Card.Header>Artist: <b>{song.artist}</b></Card.Header>
                                <Card.Body>
                                    <Card.Title>{song.name}</Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="btn-group">
                                        <Dropdown autoClose="outside" onToggle={(isOpen)=> {
                                            if (isOpen) {console.log('load list')}
                                        }}
                                        onSelect={(e, obj)=>{
                                            console.log(e);
                                        }}
                                        >
                                            <Dropdown.Toggle  variant="secondary">
                                                +To Playlist
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu variant="dark">
                                                <Dropdown.Item onClick={(e)=>{
                                                    ReactDOM.render(<Spinner animation="border" />, e.target);
                                                    setTimeout(()=>ReactDOM.render(<span>"lmao</span>, e.target), 3000);
                                                }}  eventKey="1 hehe">
                                                    test playlist
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="2 hehe">Another action</Dropdown.Item>
                                                <Dropdown.Item eventKey="3 hehe">Something else</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item eventKey="4 hehe">Separated link</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        &nbsp;
                                        <Button variant="outline-dark" onClick={()=>{
                                            setAudioList(audioList.concat([{
                                                musicSrc: cloudPath + song.name + '.mp3',
                                                name: song.name,
                                                singer: song.artist
                                            }]));
                                        }}><MdAddToQueue /></Button>
                                        &nbsp;
                                        <Button variant="outline-success" onClick={()=>{
                                            setAudioList([{
                                                musicSrc: cloudPath + song.name + '.mp3',
                                                name: song.name,
                                                singer: song.artist
                                            }])
                                        }}><MdPlayArrow /></Button>

                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        )
    }
}