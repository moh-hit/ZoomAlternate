import firebase from "firebase";

const config = {
    apiKey: "AIzaSyA606zHLKCgot-1d-jNkcW4QjFtrCXiThs",
    authDomain: "zoomalt.firebaseapp.com",
    databaseURL: "https://zoomalt-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "zoomalt",
    storageBucket: "zoomalt.appspot.com",
    messagingSenderId: "1011644348359",
    appId: "1:1011644348359:web:09bbda92b72009457e8be2"
  };


export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
