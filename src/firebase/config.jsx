import firebase from "firebase/app"
import "firebase/firestore"
import { Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWiILGm_oOOaaXsiMPsTL7W4o0zTrwAEE",
    authDomain: "writing-app-dad3c.firebaseapp.com",
    projectId: "writing-app-dad3c",
    storageBucket: "writing-app-dad3c.appspot.com",
    messagingSenderId: "145143392425",
    appId: "1:145143392425:web:c0210cce70251b7f98a1b8"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()

  export {projectFirestore}