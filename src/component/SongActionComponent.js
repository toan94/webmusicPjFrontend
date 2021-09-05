import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {MdAdd} from "react-icons/md";
import playlistService from "../services/playlistService";
import React from "react";
import songService from "../services/songService";
import {withAuthHeader} from "react-auth-kit";

class SongActionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditName: false,
            showDeleteConfirmation: false
        }
    }

    render(){


        return (
            <>

                <Dropdown className="d-inline float-end" >
                    <Dropdown.Toggle className="p-0" variant="light">

                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item onClick={()=>this.setState({showEditName:true})}>
                            Edit Song Name
                        </Dropdown.Item>
                        <Dropdown.Item >Mark As For Sale</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item  className="text-danger" onClick={()=>this.setState({showDeleteConfirmation:true})}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


                {/*<Button variant="dark" className={"ms-3"} onClick={()=>this.setState({showEditName:true})}>*/}
                {/*    Edit Name*/}
                {/*</Button>*/}

                <Modal
                    id="ShowEditName"
                    show={this.state.showEditName}
                    onHide={()=>this.setState({showEditName:false})}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Changing song name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={
                            (e)=>{
                                e.preventDefault();
                                // console.log(e.target.playlistName.value);
                                songService.updateSongName(e.target.newSongName.value, this.props.songId, this.props.authHeader)
                                    .then((res)=>{
                                        this.props.retrieveMySongList();
                                        // console.log(res);
                                });
                                this.setState({showEditName: false});
                                // this.props.retrieveList();
                                // this.props.history.push('/myPlaylist');
                            }
                        }>
                            <Form.Group className="mb-3" >
                                <Form.Label>New Song Name</Form.Label>
                                <Form.Control type="text" placeholder="New song name" name="newSongName"/>
                                <Form.Text className="text-muted">
                                    Enter a new name
                                </Form.Text>
                            </Form.Group>

                            <Button variant="outline-success" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Modal.Body>
                    {/*<Modal.Footer>*/}

                    {/*</Modal.Footer>*/}
                </Modal>



                <Modal
                    id="ShowDeleteConfirmation"
                    show={this.state.showDeleteConfirmation}
                    onHide={()=>this.setState({showDeleteConfirmation:false})}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title><span className="text-danger">Confirm Song Deletion!</span></Modal.Title>
                    </Modal.Header>
                    {/*<Modal.Body>*/}

                    {/*</Modal.Body>*/}
                    <Modal.Footer>
                        <Button variant="outline-danger" className="">Delete</Button>
                        <Button variant="secondary" onClick={()=>this.setState({showDeleteConfirmation: false})}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default withAuthHeader(SongActionComponent);