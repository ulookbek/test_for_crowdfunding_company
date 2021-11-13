import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDi-_87MSpvojNNdxptgpLpRpkUgcuMeeU",
    authDomain: "test-crowdfunding.firebaseapp.com",
    projectId: "test-crowdfunding",
    storageBucket: "test-crowdfunding.appspot.com",
    messagingSenderId: "1046778042098",
    appId: "1:1046778042098:web:adf8d133bb17fd1853626b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
export default db;

