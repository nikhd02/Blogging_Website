// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC5qGqsEl76kz2o5VrU_Bm_vY7GZTZ0SYI",
  authDomain: "blogging-3732e.firebaseapp.com",
  projectId: "blogging-3732e",
  storageBucket: "blogging-3732e.appspot.com",
  messagingSenderId: "288660850052",
  appId: "1:288660850052:web:59c2ac2d2b6f7cb86a09d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth, provider)
    .then((result) =>{
        user = result.user;
    })
    .catch((error) => {
        console.log(error);
        });

    return user;
}

