import React from "react";
import {MdPlayArrow, MdAddToQueue} from 'react-icons/md'
import SongListDisplayComponent from "./SongListDisplayComponent";
import songService from "../services/songService";
import SearchConfigComponent from "./SearchConfigComponent";
import PaginationComponent from "./PaginationComponent";
import {withRouter} from "react-router-dom";
import {withAuthHeader} from "react-auth-kit";

class SongListComponentPerUser extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            songList: []

        }

        this.retrieveSongList = this.retrieveSongList.bind(this);
    }



    retrieveSongList() {

        if (this.props.self) {
            songService.getMySongs({}, this.props.authHeader)
                .then((response) => {
                    console.log(response);
                    const { songList } = response.data;

                    this.setState({
                        songList: songList,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            let {username}  = this.props.match.params;
            songService.getSongsByUsername({username}, this.props.authHeader)
                .then((response) => {
                    console.log(response);
                    const { songList } = response.data;

                    this.setState({
                        songList: songList,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        }


    }


    componentDidMount() {
        let {playlistId}  = this.props.match.params;
        this.setState({playlistId: playlistId}, ()=>this.retrieveSongList());

    }


    render(){

        return (
            <>

                <SongListDisplayComponent  songList={this.state.songList}
                                           setAudioList={this.props.setAudioList}
                                           audioList={this.props.audioList}
                                           isMySongs={this.props.self}
                                           retrieveMySongList={this.retrieveSongList}

                />
            </>
        )
    }
}

export default withRouter(withAuthHeader(SongListComponentPerUser));