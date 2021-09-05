import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/test/';
const client = axios.create({baseURL: "http://localhost:8080/api/admin",
    headers: {"Content-type": "application/json" }});

class adminService {


    deleteArtist(name, authHeader) {
        // return axios.get(API_URL + 'artists');
        return client.post("deleteUser", {name:name}, {headers: {"Authorization": authHeader}});
    }

    deletesong(songId, authHeader) {
        // return axios.get(API_URL + 'artists');
        return client.post("deleteSong", {songId:songId}, {headers: {"Authorization": authHeader}});
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

export default new adminService();