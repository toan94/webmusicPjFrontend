import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import artistService from "../services/artistService";

export  default class ArtistListDisplayComponent extends React.Component {

    render(){
        let artistList = this.props.artistList;
        return (
            <Row className={"p-2 pt-5 justify-content-start"}>
                {
                    artistList.map((artist, index)=>
                        (<Col className={"d-flex justify-content-center p-1 col-md-auto "} key={index}>
                            <Card style={{ width: '15rem' }}>
                                <Card.Img className={"img-fluid"} variant="top" src={artist.coverImg} />

                                <Card.Body>
                                    <Card.Title>{artist.name}</Card.Title>
                                    {/*<Card.Text>*/}
                                    {/*    Toan*/}
                                    {/*</Card.Text>*/}
                                    <Button variant="primary" className={"bg-info"}>See Artist</Button>
                                </Card.Body>
                            </Card>
                        </Col>)
                    )
                }
                {/*<Col className={"d-flex justify-content-center p-1 col-md-auto "}>*/}
                {/*    <Card style={{ width: '15rem' }}>*/}
                {/*        <div className={"h-75"}>*/}
                {/*            <Card.Img className={"img-fluid img-thumbnail"} variant="top" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />*/}
                {/*        </div>*/}
                {/*        <Card.Body>*/}
                {/*            <Card.Title>Toan Bui</Card.Title>*/}
                {/*            /!*<Card.Text>*!/*/}
                {/*            /!*    Toan*!/*/}
                {/*            /!*</Card.Text>*!/*/}
                {/*            <Button variant="primary" className={"bg-info"}>See Artist</Button>*/}
                {/*        </Card.Body>*/}
                {/*    </Card>*/}
                {/*</Col>*/}

            </Row>

        )
    }
}