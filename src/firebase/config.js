import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD8i7CHFVbHFLPFUiFP0Cg62hdNN-XbZPw",
    authDomain: "imagegallery-910df.firebaseapp.com",
    projectId: "imagegallery-910df",
    storageBucket: "imagegallery-910df.appspot.com",
    messagingSenderId: "531707370486",
    appId: "1:531707370486:web:9a8c6f57982caa19f745d7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {storage, firestore, timestamp};