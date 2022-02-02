import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzVh9nu676MPC3NMor0yZA6kRRBU-OU_M",
  authDomain: "worldtraveler-c4dba.firebaseapp.com",
  projectId: "worldtraveler-c4dba",
  storageBucket: "worldtraveler-c4dba.appspot.com",
  messagingSenderId: "80454388967",
  appId: "1:80454388967:web:cb0f8428f5649a99dce642"
}

// activate firebase app
firebase.initializeApp(firebaseConfig);

// configure settings
const auth = firebase.auth();

// set up provider(s)
const provider = new firebase.auth.GoogleAuthProvider();

// set up auth functions
function login() {
    return auth.signInWithPopup(provider);
}

function logout() {
    return auth.signOut();
}

export { login, logout, auth };