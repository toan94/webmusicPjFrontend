import {Button, Card, Col, Container, Dropdown, Form, Row, Spinner} from "react-bootstrap";
import React from "react";
import {MdAddToQueue, MdPlayArrow, MdCheck} from "react-icons/md";
import ReactDOM from 'react-dom';
import {withAuthHeader} from "react-auth-kit";
import playlistService from "../services/playlistService";
import songService from "../services/songService";


class SongListDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myPlaylists : [],
            belongedPlaylists : []
        }
    }

    retrieveBelongedPlaylists(songId){
        songService.getBelongedPlaylists({songId: songId}, this.props.authHeader).then((res)=>{
            this.setState({belongedPlaylists: res.data.belongedPlaylists});
            console.log(res);
        });
    }



    componentDidMount() {
        playlistService.getPlaylistListNoPaging({}, this.props.authHeader).then((res)=>{
            this.setState({myPlaylists : res.data.listOfPlaylist});
            console.log(res);
        })
    }

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
                                            if (isOpen) {
                                                console.log('load list');
                                                this.retrieveBelongedPlaylists(song.id);
                                            }
                                        }}
                                        onSelect={(ekey, obj)=>{
                                            console.log(ekey);
                                        }}
                                        >
                                            <Dropdown.Toggle  variant="secondary">
                                                +To Playlist
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu variant="dark">
                                                {/*<Dropdown.Item onClick={(e)=>{*/}
                                                {/*    ReactDOM.render(<Spinner animation="border" />, e.target);*/}
                                                {/*    setTimeout(()=>ReactDOM.render(<span>"lmao</span>, e.target), 1000);*/}
                                                {/*}}  eventKey="1 hehe">*/}
                                                {/*    test playlist*/}
                                                {/*</Dropdown.Item>*/}
                                                {
                                                this.state.myPlaylists.map((p, index)=>(
                                                    <Dropdown.Item eventKey={p.id} onClick={(e)=>{
                                                        // ReactDOM.render(<Spinner animation="border" />, e.target);
                                                        // setTimeout(()=>ReactDOM.render(<span>{p.playlistName} <MdCheck/></span>, e.target), 1000);
                                                        if (!this.state.belongedPlaylists.includes(p.id)){
                                                            songService.addToPlaylist(p.id, song.id, this.props.authHeader).then((res)=>{
                                                                this.retrieveBelongedPlaylists(song.id);
                                                            });
                                                        } else {
                                                            songService.removeFromPlaylist(p.id, song.id, this.props.authHeader).then((res)=>{
                                                                this.retrieveBelongedPlaylists(song.id);
                                                            });
                                                        }
                                                    }}
                                                    >{p.playlistName} {this.state.belongedPlaylists.includes(p.id) ?
                                                                        <MdCheck/> : null}
                                                    </Dropdown.Item>
                                                ))


                                                }

                                                {/*<Dropdown.Divider />*/}
                                                {/*<Dropdown.Item eventKey="4 hehe">Separated link</Dropdown.Item>*/}
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
export default withAuthHeader(SongListDisplayComponent);