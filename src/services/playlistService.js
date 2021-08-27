import axios from 'axios';

const client = axios.create({baseURL: "http://localhost:8080/api/playlists",
    headers: {"Content-type": "application/json" }});

class playlistService {
    getPlaylistList(params, authHeader) {
        // return axios.get(API_URL + 'artists');
        return client.get("all", {params:params, headers: {"Authorization": authHeader}});
    }

    getPlaylistListNoPaging(params, authHeader) {
        // return axios.get(API_URL + 'artists');
        params.noPaging = "true";
        return client.get("all", {params:params, headers: {"Authorization": authHeader}});
    }

    createNewPlaylist(name, authHeader) {
        return client.post("create",{name: name},{headers: {"Authorization": authHeader}});
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

export default new playlistService();