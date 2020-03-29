importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js')

firebase.initializeApp({
    messagingSenderId: "580047032879"
});

const messaging = firebase.messaging();