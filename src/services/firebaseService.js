import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/test/';
const client = axios.create({baseURL: "http://localhost:8080/api/firebase",
    headers: {"Content-type": "application/json" }});

class firebaseService {


    saveToken(firebaseToken, authHeader) {
        // return client.post("saveToken", {firebaseToken : firebaseToken}, {headers: {"Authorization": authHeader}});
        return client.post("saveToken", {}, {headers: {"Authorization": authHeader}, params: {firebaseToken}});

    }

    delToken(authHeader) {
        return client.delete("deleteToken", {headers: {"Authorization": authHeader}});
    }

    subscribeTo(username, authHeader) {
        return client.post("subscribe", {}, {headers: {"Authorization": authHeader}, params: {username}});
    }
    unSubscribeFrom(username, authHeader) {
        return client.post("unSubscribe", {}, {headers: {"Authorization": authHeader}, params: {username}});
    }
    sendPush(username, note, authHeader){
        return client.post("sendNewUploadPushMessage", note, {headers: {"Authorization": authHeader}, params: {username}});
    }

}

export default new firebaseService();