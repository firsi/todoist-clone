import firebase from 'firebase/app';
import 'firebase/firestore'
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyD2Rg6fBIDPuC3Pmk2-MoF5fiAvqYKQBx8",
    authDomain: "todoist-d3d28.firebaseapp.com",
    databaseURL: "https://todoist-d3d28.firebaseio.com",
    projectId: "todoist-d3d28",
    storageBucket: "todoist-d3d28.appspot.com",
    messagingSenderId: "1052771697955",
    appId: "1:1052771697955:web:f1830c476113270b8f7896"
})

export  { firebaseConfig as firebase } 