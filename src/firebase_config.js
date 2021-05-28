import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDa0Cwcs8TFKQ7vu8GdUtDUtnIPyS4wUX8",
    authDomain: "lawmax-0.firebaseapp.com",
    databaseURL: "https://lawmax-0.firebaseio.com",
    projectId: "lawmax-0",
    storageBucket: "lawmax-0.appspot.com",
    messagingSenderId: "303039104495",
    appId: "1:303039104495:web:20465715f7974168ae221a",
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
