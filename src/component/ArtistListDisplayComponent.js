import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import artistService from "../services/artistService";

export  default class ArtistListDisplayComponent extends React.Component {

    render(){
        let artistList = this.props.artistList;
        return (
            <Row className={"p-2 pt-5 justify-content-start"}>
                <Col className={"d-flex justify-content-center p-1 col-md-auto "} >
                    <Card style={{ width: '15rem' }}>
                        <Card.Img className={"img-fluid"} variant="top" src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" style={{width: '100%', height: '200px', objectFit:'cover' }} />
                        <Card.Body>
                            <Card.Title>The Beatles</Card.Title>
                            {/*<Card.Text>*/}
                            {/*    Toan*/}
                            {/*</Card.Text>*/}
                            <Button variant="outline-dark" className={""}>See Artist</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {
                    artistList.map((artist, index)=>
                        (<Col className={"d-flex justify-content-center p-1 col-md-auto "} key={index}>
                            <Card style={{ width: '15rem' }}>
                                <Card.Img className={"img-fluid"} variant="top" src={artist.coverImg} style={{width: '100%', height: '200px', objectFit:'cover' }} />
                                <Card.Body>
                                    <Card.Title>{artist.name}</Card.Title>
                                    {/*<Card.Text>*/}
                                    {/*    Toan*/}
                                    {/*</Card.Text>*/}
                                    <Button variant="outline-dark" className={""}>See Artist</Button>
                                </Card.Body>
                            </Card>
                        </Col>)
                    )
                }

            </Row>

        )
    }
}