import {Button, Card, Col, Container, Dropdown, Form, Row, Spinner} from "react-bootstrap";
import React from "react";
import {MdAddToQueue, MdPlayArrow, MdAdd} from "react-icons/md";
import ReactDOM from 'react-dom';
import {withAuthHeader} from "react-auth-kit";
import playlistService from "../services/playlistService";


class PlaylistListDisplayComponent extends React.Component {

    render(){
        let playlistList = this.props.playlistList;
        const cloudPath = 'https://toantestt.s3.amazonaws.com/';
        const setAudioList = this.props.setAudioList;
        const audioList = this.props.audioList;
        return (
            <>

                <button type="button" class="btn btn-outline-dark ms-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <MdAdd/>
                </button>

                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Create New Playlist</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Form onSubmit={
                                    (e)=>{
                                        e.preventDefault();
                                        console.log(e.target.playlistName.value);
                                        playlistService.createNewPlaylist(e.target.playlistName.value,this.props.authHeader).then((res)=>{
                                            console.log(res);
                                        });
                                    }
                                }>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Playlist Name</Form.Label>
                                        <Form.Control type="text" placeholder="New playlist name" name="playlistName"/>
                                        <Form.Text className="text-muted">
                                            Enter the name of you new playlist
                                        </Form.Text>
                                    </Form.Group>

                                    <Button variant="outline-success" type="submit">
                                        Create
                                    </Button>
                                </Form>
                            </div>
                            <div class="modal-footer">
                                {/*<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
                            </div>
                        </div>
                    </div>
                </div>




            <Row className={"p-2 pt-5 justify-content-start"}>

                {
                    playlistList.map((playlist, index) => (
                        <Col className={"d-flex justify-content-center p-3 col-md-auto "} key={index}>
                            <Card border="light" style={{ width: '15rem' }} className={""}>
                                <Card.Header>Created: <b>{playlist.creationDate}</b></Card.Header>
                                <Card.Body>
                                    <Card.Title>{playlist.playlistName}</Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <div className="btn-group">
                                        <Button variant="outline-dark" className={""}>See Detail</Button>


                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                }
            </Row></>
        )
    }
}

export default withAuthHeader(PlaylistListDisplayComponent);