import firebase from 'firebase';

export const initializeFirebase = () => {
  console.log('initializeFirebase')
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
}
export const askForPermissioToReceiveNotifications = async () => {
  console.log('askForPermissioToReceiveNotifications')
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);
    
    return token;
  } catch (error) {
    console.log('error permission', error);
  }
}