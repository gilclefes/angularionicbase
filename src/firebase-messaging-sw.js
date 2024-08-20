importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD_jVtRorS4_hNWozI8nH8cIp4WG6aP1EI",
  authDomain: "yabotest.firebaseapp.com",
  projectId: "yabotest",
  storageBucket: "yabotest.appspot.com",
  messagingSenderId: "1010152877586",
  appId: "1:1010152877586:web:33b7222ebf795278da72cb",
});
const messaging = firebase.messaging();
