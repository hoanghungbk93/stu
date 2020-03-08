import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyBDC5tP0O-sCHD1Ak-zgHpb5xHB3656gCc",
    authDomain: "stuproject-4b1ac.firebaseapp.com",
    databaseURL: "https://stuproject-4b1ac.firebaseio.com",
    projectId: "stuproject-4b1ac",
    storageBucket: "stuproject-4b1ac.appspot.com",
    messagingSenderId: "580047032879",
    appId: "1:580047032879:web:27e59dd91d71fc1691acda",
    measurementId: "G-7T097KVF40"
  });
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}
export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}