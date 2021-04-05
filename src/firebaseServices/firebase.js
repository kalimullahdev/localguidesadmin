import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAVyXN2JZi0CUWMu92zsPq8t7zxXFrEnz8",
    authDomain: "localguides-ea89b.firebaseapp.com",
    databaseURL: "https://localguides-ea89b-default-rtdb.firebaseio.com",
    projectId: "localguides-ea89b",
    storageBucket: "localguides-ea89b.appspot.com",
    messagingSenderId: "464298237578",
    appId: "1:464298237578:web:81c45634737a4a105ad773",
    measurementId: "G-NTQBW1VW38"
  });
  export const storage = firebaseApp.storage()
  export const auth = firebaseApp.auth();
  export default firebaseApp;


