importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDRIS3KDLyXHycWhAW2UbDRPsVLEuLAYtQ",
    authDomain: "sem4pj.firebaseapp.com",
    projectId: "sem4pj",
    storageBucket: "sem4pj.appspot.com",
    messagingSenderId: "544490139196",
    appId: "1:544490139196:web:36bf4edc363efb902d5d39",
    measurementId: "G-14WL38HV8X"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    //
    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //     // body: payload.notification.body,
    //
    // };
    // self.registration.showNotification(notificationTitle,
    //     notificationOptions);
});