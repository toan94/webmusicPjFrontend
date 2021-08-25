import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import fakeDatafn from '../services/fakeArtist'
import artistService from "../services/artistService";
import ArtistListDisplayComponent from "./ArtistListDisplayComponent";
import PaginationComponent from "./PaginationComponent";
import SearchConfigComponent from "./SearchConfigComponent";


export default class ArtistListComponentWithPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            artistList : [],
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 3,
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.retrieveArtistList = this.retrieveArtistList.bind(this);
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    getRequestParams(searchTitle, page, pageSize) {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    retrieveArtistList() {

        const { searchTitle, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);

        artistService.getArtistList(params)
            .then((response) => {
                const { artistList, totalPages } = response.data;

                this.setState({
                    artistList: artistList,
                    count: totalPages,
                });
                // console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handlePageChange(event, value) {
        // console.log(this);
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrieveArtistList();
            }
        );
    }

    componentDidMount() {
        // this.setState({artistList: fakeDatafn()}
        this.retrieveArtistList();
    }

    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrieveArtistList();
            }
        );
    }

    render() {
        // let artistList = this.state.artistList;
        return (
            <>
                <SearchConfigComponent searchTitle={this.state.searchTitle}
                                       onChangeSearchTitle={this.onChangeSearchTitle}
                                        retrieveArtistList={this.retrieveArtistList}
                                       handlePageSizeChange={this.handlePageSizeChange}
                                       pageSize={this.state.pageSize}
                />
                <ArtistListDisplayComponent artistList={this.state.artistList}/>
                <PaginationComponent count={this.state.count} page={this.state.page} handlePageChange={this.handlePageChange}/>
            </>
            // <Row className={"p-2 pt-5 justify-content-start"}>
            //     {
            //         artistList.map((artist, index)=>
            //             (<Col className={"d-flex justify-content-center p-1 col-md-auto "} key={index}>
            //                 <Card style={{ width: '15rem' }}>
            //                     <Card.Img className={"img-fluid img-thumbnail"} variant="top" src={artist.coverImg} />
            //
            //                     <Card.Body>
            //                         <Card.Title>{artist.name}</Card.Title>
            //                         {/*<Card.Text>*/}
            //                         {/*    Toan*/}
            //                         {/*</Card.Text>*/}
            //                         <Button variant="primary" className={"bg-info"}>See Artist</Button>
            //                     </Card.Body>
            //                 </Card>
            //             </Col>)
            //         )
            //     }
            //     {/*<Col className={"d-flex justify-content-center p-1 col-md-auto "}>*/}
            //     {/*    <Card style={{ width: '15rem' }}>*/}
            //     {/*        <div className={"h-75"}>*/}
            //     {/*            <Card.Img className={"img-fluid img-thumbnail"} variant="top" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />*/}
            //     {/*        </div>*/}
            //     {/*        <Card.Body>*/}
            //     {/*            <Card.Title>Toan Bui</Card.Title>*/}
            //     {/*            /!*<Card.Text>*!/*/}
            //     {/*            /!*    Toan*!/*/}
            //     {/*            /!*</Card.Text>*!/*/}
            //     {/*            <Button variant="primary" className={"bg-info"}>See Artist</Button>*/}
            //     {/*        </Card.Body>*/}
            //     {/*    </Card>*/}
            //     {/*</Col>*/}
            //
            // </Row>

        )
    }
};