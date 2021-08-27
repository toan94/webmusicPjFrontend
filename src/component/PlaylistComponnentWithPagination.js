import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import artistService from "../services/artistService";
import ArtistListDisplayComponent from "./ArtistListDisplayComponent";
import PaginationComponent from "./PaginationComponent";
import SearchConfigComponent from "./SearchConfigComponent";
import {withAuthHeader} from "react-auth-kit";
import playlistService from "../services/playlistService";
import PlaylistListDisplayComponent from "./PlaylistListDisplayComponent";


class ArtistListComponentWithPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playlistList : [],
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 3,
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.retrievePlaylistList = this.retrievePlaylistList.bind(this);
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

    retrievePlaylistList() {

        const { searchTitle, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);

        playlistService.getPlaylistList(params, this.props.authHeader)
            .then((response) => {
                const { listOfPlaylist, totalPages } = response.data;
                console.log(response.data);
                this.setState({
                    playlistList: listOfPlaylist,
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
                this.retrievePlaylistList();
            }
        );
    }

    componentDidMount() {
        // this.setState({artistList: fakeDatafn()}
        this.retrievePlaylistList();
    }

    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrievePlaylistList();
            }
        );
    }

    render() {
        // let artistList = this.state.artistList;
        return (
            <>
                <SearchConfigComponent searchTitle={this.state.searchTitle}
                                       onChangeSearchTitle={this.onChangeSearchTitle}
                                       retrieveList={this.retrievePlaylistList}
                                       handlePageSizeChange={this.handlePageSizeChange}
                                       pageSize={this.state.pageSize}
                />
                <PlaylistListDisplayComponent playlistList={this.state.playlistList}/>
                <PaginationComponent count={this.state.count} page={this.state.page} handlePageChange={this.handlePageChange}/>
            </>
        )
    }
};
export default withAuthHeader(ArtistListComponentWithPagination);