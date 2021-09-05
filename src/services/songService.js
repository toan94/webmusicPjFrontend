import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/test/';
const client = axios.create({baseURL: "http://localhost:8080/api/songs",
    headers: {"Content-type": "application/json" }});

class songService {
    getSongList(params, authHeader) {
        return client.get("all", {params:params, headers: {"Authorization": authHeader}});
        // return client.get("all");
    }

    getSongListAccordingToPlaylist(params, authHeader) {
        return client.get("songsFromPlaylist", {params:params, headers: {"Authorization": authHeader}});
        // return client.get("all");
    }

    getBelongedPlaylists(params, authHeader) {
        return client.get("belongedPlaylists", {params:params, headers: {"Authorization": authHeader}});
        // return client.get("all");
    }

    addToPlaylist(playlistId, songId, authHeader) {
        return client.post("addToPlaylist",{playlistId: playlistId, songId: songId},{headers: {"Authorization": authHeader}});
    }

    removeFromPlaylist(playlistId, songId, authHeader) {
        return client.post("removeFromPlaylist",{playlistId: playlistId, songId: songId},{headers: {"Authorization": authHeader}});
    }

    getMySongs(params, authHeader) {
        return client.get("mySongs", {params:params, headers: {"Authorization": authHeader}});
        // return client.get("all");
    }
    updateSongName(newSongName, songId, authHeader) {
        return client.patch("editSong", {newSongName, songId}, {headers: {"Authorization": authHeader}});
        // return client.get("all");
    }
    // getUserBoard() {
    //     return axios.get(API_URL + 'user', { headers: authHeader() });
    // }
    //
    // getModeratorBoard() {
    //     return axios.get(API_URL + 'mod', { headers: authHeader() });
    // }
    //
    // getAdminBoard() {
    //     return axios.get(API_URL + 'admin', { headers: authHeader() });
    // }
}

export default new songService();