import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/test/';
const client = axios.create({baseURL: "http://localhost:8080/api/firebase",
    headers: {"Content-type": "application/json" }});

class notificationService {


    getNotifications(authHeader) {
        // return axios.get(API_URL + 'artists');
        return client.get("/notifications", {headers: {"Authorization": authHeader}});
    }

}

export default new notificationService();