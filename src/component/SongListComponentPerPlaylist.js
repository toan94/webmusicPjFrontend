import React from "react";
import {MdPlayArrow, MdAddToQueue} from 'react-icons/md'
import SongListDisplayComponent from "./SongListDisplayComponent";
import songService from "../services/songService";
import SearchConfigComponent from "./SearchConfigComponent";
import PaginationComponent from "./PaginationComponent";
import {withRouter} from "react-router-dom";
import {withAuthHeader} from "react-auth-kit";

class SongListComponentPerPlaylist extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            songList : [],
            // currentIndex: -1,
            // searchTitle: "",
            //
            // page: 1,
            // count: 0,
            // pageSize: 3,

            playlistId:-1,
            playlistName: "",
            creationDate: ""
        }
        // this.handlePageChange = this.handlePageChange.bind(this);
        // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        // this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.retrieveSongList = this.retrieveSongList.bind(this);
    }

    // onChangeSearchTitle(e) {
    //     const searchTitle = e.target.value;
    //
    //     this.setState({
    //         searchTitle: searchTitle,
    //     });
    // }

    // getRequestParams(searchTitle, page, pageSize) {
    //     let params = {};
    //
    //     if (searchTitle) {
    //         params["title"] = searchTitle;
    //     }
    //
    //     if (page) {
    //         params["page"] = page - 1;
    //     }
    //
    //     if (pageSize) {
    //         params["size"] = pageSize;
    //     }
    //
    //     return params;
    // }

    retrieveSongList() {

        // const { searchTitle, page, pageSize } = this.state;
        // const params = this.getRequestParams(searchTitle, page, pageSize);

        songService.getSongListAccordingToPlaylist({playlistId: this.state.playlistId}, this.props.authHeader)
            .then((response) => {
                console.log(response);
                const { songList, playlistName, creationDate } = response.data;

                this.setState({
                    songList: songList,
                    playlistName: playlistName,
                    creationDate: creationDate
                    // count: totalPages,
                    // songList: response.data
                });
                // console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // handlePageChange(event, value) {
    //     // console.log(this);
    //     this.setState(
    //         {
    //             page: value,
    //         },
    //         () => {
    //             this.retrieveSongList();
    //         }
    //     );
    // }

    componentDidMount() {
        let {playlistId}  = this.props.match.params;
        this.setState({playlistId: playlistId}, ()=>this.retrieveSongList());

    }

    // handlePageSizeChange(event) {
    //     this.setState(
    //         {
    //             pageSize: event.target.value,
    //             page: 1
    //         },
    //         () => {
    //             this.retrieveSongList();
    //         }
    //     );
    // }
    render(){

        return (
            <>
                <h2>Playlist: {this.state.playlistName}</h2>
                <h2>Created At: {this.state.creationDate}</h2>
                <SongListDisplayComponent  songList={this.state.songList} setAudioList={this.props.setAudioList} audioList={this.props.audioList} />
                {/*<Button onClick={()=>this.props.setAudio([*/}
                {/*    { musicSrc: 'https://toantestt.s3.amazonaws.com/TangEmMotBauTroi-LuongGiaHuy-2945059.mp3' },*/}
                {/*    { musicSrc: 'https://toantestt.s3.amazonaws.com/gg.mp3'}*/}
                {/*])}>fgsdfgs</Button>*/}
            </>
        )
    }
}

export default withRouter(withAuthHeader(SongListComponentPerPlaylist));