import axios from 'axios';

const client = axios.create({baseURL: "http://localhost:8080/payment",
    headers: {"Content-type": "application/json" }});

class paymentService {

    getBalance(authHeader) {
        return client.get("getBalance", {headers: {"Authorization": authHeader}});
        // return client.get("all");
    }

    buySong(artistName, songId, authHeader) {
        return client.post("buySong",{artistName: artistName, songId: songId},{headers: {"Authorization": authHeader}});
    }


}

export default new paymentService();