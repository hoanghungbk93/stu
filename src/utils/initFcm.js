import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  messagingSenderId: "580047032879"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
	// Project Settings => Cloud Messaging => Web Push certificates
  "BDs39hr9Xevq2h-ECxA3zFrtXcpeg6ve2O-9PFdmApj_6UYN2MMsMMEIy391gBEnQaQrTle8QStR3iSP9TvAl_c"
);
export { messaging };