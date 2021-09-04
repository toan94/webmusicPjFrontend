import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyDRIS3KDLyXHycWhAW2UbDRPsVLEuLAYtQ",
    authDomain: "sem4pj.firebaseapp.com",
    projectId: "sem4pj",
    storageBucket: "sem4pj.appspot.com",
    messagingSenderId: "544490139196",
    appId: "1:544490139196:web:36bf4edc363efb902d5d39",
    measurementId: "G-14WL38HV8X"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'BCyGNrY50yef5K2IqRz-A0xJcC_dkKCEO7SF98uVNf7xUxDG62LuJHPTsQyYSQm9hyqzbz6qXb-rbO7nbu3D1yU'}).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });

    });


export const deleteToken = ()=> {
    firebase.messaging().deleteToken().then((f)=> console.log("fullfilment value: " +f));
}