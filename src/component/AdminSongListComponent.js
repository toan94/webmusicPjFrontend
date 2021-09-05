import React from "react";
import {MdPlayArrow, MdAddToQueue} from 'react-icons/md'
import SongListDisplayComponent from "./SongListDisplayComponent";
import songService from "../services/songService";
import SearchConfigComponent from "./SearchConfigComponent";
import PaginationComponent from "./PaginationComponent";
import {withAuthHeader, withIsAuthenticated} from "react-auth-kit";
import ForbiddenComponent from "./ForbiddenComponent";

class AdminSongListComponent extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            songList : [],
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 3,
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.retrieveSongList = this.retrieveSongList.bind(this);
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

    retrieveSongList() {

        const { searchTitle, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);

        songService.getSongList(params, this.props.authHeader)
            .then((response) => {
                console.log(response);
                const { songList, totalPages } = response.data;

                this.setState({
                    songList: songList,
                    count: totalPages,
                    // songList: response.data
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
                this.retrieveSongList();
            }
        );
    }

    componentDidMount() {
        this.retrieveSongList();
    }

    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrieveSongList();
            }
        );
    }
    render(){

        // console.log("authenticated  "+this.props.isAuthenticated);
        // console.log("appjs authenticated: " + this.props.isAuth);
        if(!this.props.isAdmin) {
            return <ForbiddenComponent />;
        }
        return (
            <>
                <SearchConfigComponent searchTitle={this.state.searchTitle}
                                       onChangeSearchTitle={this.onChangeSearchTitle}
                                       retrieveList={this.retrieveSongList}
                                       handlePageSizeChange={this.handlePageSizeChange}
                                       pageSize={this.state.pageSize}
                />
                <SongListDisplayComponent  songList={this.state.songList} setAudioList={this.props.setAudioList} audioList={this.props.audioList}
                                           isAdmin={this.props.isAdmin}/>
                <PaginationComponent count={this.state.count} page={this.state.page} handlePageChange={this.handlePageChange}/>
                {/*<Button onClick={()=>this.props.setAudio([*/}
                {/*    { musicSrc: 'https://toantestt.s3.amazonaws.com/TangEmMotBauTroi-LuongGiaHuy-2945059.mp3' },*/}
                {/*    { musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3'}*/}
                {/*])}>fgsdfgs</Button>*/}
            </>
        )
    }
}

export default withAuthHeader(AdminSongListComponent);