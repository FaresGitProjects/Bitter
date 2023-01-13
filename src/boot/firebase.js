
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
   apiKey: "AIzaSyAS5gtKLVTCnss5xloWaePp-6zF3mw0KCU",
   authDomain: "bitter-d7420.firebaseapp.com",
   projectId: "bitter-d7420",
   storageBucket: "bitter-d7420.appspot.com",
   messagingSenderId: "1038249087903",
   appId: "1:1038249087903:web:1fed79eab01a3f597763aa",
   measurementId: "G-VDP7VFG652"
};

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()
  
export default db