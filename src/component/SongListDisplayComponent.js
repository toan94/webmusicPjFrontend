import {Button, Card, Col, Container, Dropdown, Form, Modal, Row, Spinner} from "react-bootstrap";
import React from "react";
import {MdAddToQueue, MdPlayArrow, MdCheck, MdMenu, MdMonetizationOn} from "react-icons/md";
import ReactDOM from 'react-dom';
import {withAuthHeader} from "react-auth-kit";
import playlistService from "../services/playlistService";
import songService from "../services/songService";
import SongActionComponent from "./SongActionComponent";
import adminService from "../services/adminService";
import paymentService from "../services/paymentService";
import StripeButton from "./StripeButton";
import {withRouter} from "react-router-dom";


class SongListDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myPlaylists : [],
            belongedPlaylists : [],
            showOutOfCoin: false

        }
    }

    retrieveBelongedPlaylists(songId){
        songService.getBelongedPlaylists({songId: songId}, this.props.authHeader).then((res)=>{
            this.setState({belongedPlaylists: res.data.belongedPlaylists});
            console.log(res);
        });
    }


    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            console.log("route changed");
            let {genre} = this.props.match.params;
            this.props.updateGenre(genre, this.props.retrieveListWithPurchaseState);
            // this.props.retrieveListWithPurchaseState();
        }
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
                                <Card.Header>
                                    <span>Artist: <b>{song.artist}</b></span>

                                    {
                                        this.props.isMySongs ?
                                            // <Button size="sm" variant="light" className="float-end p-0"><MdMenu /></Button>
                                            <>
                                                <SongActionComponent songId={song.id} retrieveMySongList={this.props.retrieveListWithPurchaseState}/>
                                            </>
                                            : null
                                    }
                                    {
                                        song.forSale
                                            ? <span className="text-success float-end"><MdMonetizationOn/></span>
                                            : null}
                                    {/*{*/}
                                    {/*    song.purchased*/}
                                    {/*    ? <span className="text-success float-end">Owned</span>*/}
                                    {/*    : null*/}
                                    {/*}*/}

                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{song.name}</Card.Title>
                                    <span className="text-success">Genre: {song.genre}</span>
                                </Card.Body>
                                <Card.Footer>
                                {
                                    (() =>{


                                        if (!this.props.isAdmin && (song.purchased || !song.forSale )) {

                                            return (

                                                    <div className="btn-group">
                                                        <Dropdown autoClose="outside" onToggle={(isOpen) => {
                                                            if (isOpen) {
                                                                console.log('load list');
                                                                this.retrieveBelongedPlaylists(song.id);
                                                            }
                                                        }}
                                                                  onSelect={(ekey, obj) => {
                                                                      console.log(ekey);
                                                                  }}
                                                        >
                                                            <Dropdown.Toggle variant="outline-dark">
                                                                +To Playlist
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu variant="dark">

                                                                {
                                                                    this.state.myPlaylists.map((p, index) => (
                                                                        <Dropdown.Item eventKey={p.id} onClick={(e) => {
                                                                            // ReactDOM.render(<Spinner animation="border" />, e.target);
                                                                            // setTimeout(()=>ReactDOM.render(<span>{p.playlistName} <MdCheck/></span>, e.target), 1000);
                                                                            if (!this.state.belongedPlaylists.includes(p.id)) {
                                                                                songService.addToPlaylist(p.id, song.id, this.props.authHeader).then((res) => {
                                                                                    this.retrieveBelongedPlaylists(song.id);
                                                                                });
                                                                            } else {
                                                                                songService.removeFromPlaylist(p.id, song.id, this.props.authHeader).then((res) => {
                                                                                    this.retrieveBelongedPlaylists(song.id);
                                                                                });
                                                                            }
                                                                        }}
                                                                        >{p.playlistName} {this.state.belongedPlaylists.includes(p.id) ?
                                                                            <MdCheck/> : null}
                                                                        </Dropdown.Item>
                                                                    ))
                                                                }

                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        &nbsp;
                                                        <Button variant="outline-dark" onClick={() => {
                                                            setAudioList(audioList.concat([{
                                                                musicSrc: cloudPath + song.name + '.mp3',
                                                                name: song.name,
                                                                singer: song.artist
                                                            }]));
                                                        }}><MdAddToQueue/></Button>
                                                        &nbsp;
                                                        <Button variant="outline-success" onClick={() => {
                                                            setAudioList([{
                                                                musicSrc: cloudPath + song.name + '.mp3',
                                                                name: song.name,
                                                                singer: song.artist
                                                            }])
                                                        }}><MdPlayArrow/></Button>
                                                    </div>

                                            )
                                        }
                                        else if (this.props.isAdmin) {

                                            return (
                                                <Button className="w-50" variant="outline-danger" onClick={()=>{
                                                    adminService.deletesong(song.id, this.props.authHeader).then((res)=>{
                                                        this.props.retrieveList();
                                                    }).catch(e=>console.log(e));
                                                }}>Delete</Button>
                                            )
                                        }
                                        else if (!this.props.admin && !song.purchased && song.forSale) {
                                            return (
                                                <Button variant="outline-success" onClick={()=>{
                                                    paymentService.buySong(song.artist, song.id, this.props.authHeader).then((res)=>{
                                                        this.props.retrieveListWithPurchaseState();
                                                        this.props.setCoinAmount();
                                                    }).catch(e=>this.setState({showOutOfCoin: true}));
                                                }}>Buy for 10 Coins</Button>
                                            )
                                        }
                                    })()
                                }
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                }
                <Modal
                    show={this.state.showOutOfCoin}
                    onHide={()=>this.setState({showOutOfCoin: false})}
                    backdrop="static"
                    keyboard={false}
                    className="text-danger"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Purchase Failed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center">
                        <h2>Not Enough Coin</h2>
                    </Modal.Body>

                </Modal>
            </Row>


        )
    }
}
export default withRouter(withAuthHeader(SongListDisplayComponent));