import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/test/';
const client = axios.create({baseURL: "http://localhost:8080/api/test",
    headers: {"Content-type": "application/json" }});

class artistService {
    getArtistList(params) {
        // return axios.get(API_URL + 'artists');
        return client.get("artists", {params:params});
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

export default new artistService();