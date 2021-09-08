import React from "react";
import {MdPlayArrow, MdAddToQueue} from 'react-icons/md'
import SongListDisplayComponent from "./SongListDisplayComponent";
import songService from "../services/songService";
import SearchConfigComponent from "./SearchConfigComponent";
import PaginationComponent from "./PaginationComponent";
import {withAuthHeader, withIsAuthenticated} from "react-auth-kit";
import {withRouter} from "react-router-dom";

class SongListComponentWithPagination extends React.Component{


    constructor(props) {
        super(props);
        let {genre}  = this.props.match.params;

        // const search = this.props.location.search;
        // let defaultSearchTitle = new URLSearchParams(search).get('searchTitle');
        // defaultSearchTitle = defaultSearchTitle != null ? defaultSearchTitle : "";
        // console.log("default constructor: "+defaultSearchTitle);

        // console.log(props.location);
        this.state = {
            songList : [],
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 9,

            genre: genre
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.retrieveSongList = this.retrieveSongList.bind(this);
        this.updateGenre = this.updateGenre.bind(this);
    }

    updateGenre(genre, callback) {
        this.setState({genre:genre}, callback)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            console.log("search changed");
            let search = this.props.location.search;
            let defaultSearchTitle = new URLSearchParams(search).get('searchTitle');
            this.setState({searchTitle: defaultSearchTitle}, this.retrieveSongList);

            // this.props.retrieveListWithPurchaseState();
        }
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
///////////////////////////////////
        if (this.state.genre) {
            params["genre"] = this.state.genre;
        }

        return params;
    }

    retrieveSongList() {

        const { searchTitle, page, pageSize } = this.state;
        ///////////////////////////////////
        const params = this.getRequestParams(searchTitle, page, pageSize, this.state.genre);

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
        console.log("inside: "+ this.state.genre);

        const search = this.props.location.search;
        let defaultSearchTitle = new URLSearchParams(search).get('searchTitle');
        defaultSearchTitle = defaultSearchTitle != null ? defaultSearchTitle : "";
        console.log("default: "+defaultSearchTitle);
        this.setState({searchTitle: defaultSearchTitle}, this.retrieveSongList);

        // this.retrieveSongList();
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
        if(!this.props.isAuth) {
            this.props.history.push('signIn');
        }
        return (
            <>
                <h1 className="text-success text-center">Songs</h1>
                <SearchConfigComponent searchTitle={this.state.searchTitle}
                                       onChangeSearchTitle={this.onChangeSearchTitle}
                                       retrieveList={this.retrieveSongList}
                                       handlePageSizeChange={this.handlePageSizeChange}
                                       pageSize={this.state.pageSize}
                />
                <SongListDisplayComponent  songList={this.state.songList} setAudioList={this.props.setAudioList}
                                           audioList={this.props.audioList}
                                           retrieveListWithPurchaseState={this.retrieveSongList}
                                           setCoinAmount={this.props.setCoinAmount}
                                           updateGenre={this.updateGenre}
                />
                <PaginationComponent count={this.state.count} page={this.state.page} handlePageChange={this.handlePageChange}/>
                {/*<Button onClick={()=>this.props.setAudio([*/}
                {/*    { musicSrc: 'https://toantestt.s3.amazonaws.com/TangEmMotBauTroi-LuongGiaHuy-2945059.mp3' },*/}
                {/*    { musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3'}*/}
                {/*])}>fgsdfgs</Button>*/}
            </>
        )
    }
}

export default withRouter(withAuthHeader(SongListComponentWithPagination));