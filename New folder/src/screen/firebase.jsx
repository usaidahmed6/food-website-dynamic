import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

import { addDoc, collection, getFirestore , setDoc , getDoc,  deleteDoc , doc , onSnapshot, getDocs} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFSat7IfKPkF8R1Ey0b0ZN7wNMyo2wooE",
    authDomain: "hackthon-of-react-js.firebaseapp.com",
    projectId: "hackthon-of-react-js",
    storageBucket: "hackthon-of-react-js.appspot.com",
    messagingSenderId: "397673324928",
    appId: "1:397673324928:web:26a369de4b09277d072165",
    measurementId: "G-LY5XQPVEB2"
  }
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const userRef = collection(db, 'Restaurant')
const userRef2 = collection(db, 'userSign')
const userRef3 = collection(db, 'AddDishes')
const userRef4 = collection(db, 'shoppnigCard')
const userRef5 = collection(db, 'foodOrder')
const storage = getStorage()
export {
    auth,
    app,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    userRef,
    db,
    addDoc,
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    userRef2,
    userRef3,
    storage,
    userRef5,
    collection,
    deleteDoc , doc ,
    onSnapshot, getDocs,
    setDoc,
    getDoc,
    userRef4

}



