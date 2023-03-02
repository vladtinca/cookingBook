import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCX7P_R3SpBLWLbdtIF9JkQqC7-8DNSGmg",
    authDomain: "cooking-book-20000.firebaseapp.com",
    projectId: "cooking-book-20000",
    storageBucket: "cooking-book-20000.appspot.com",
    messagingSenderId: "54926905826",
    appId: "1:54926905826:web:6e55abf527cb197749a9bb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }