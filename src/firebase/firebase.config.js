// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwAOBws7W6ZFAeTtdoeEJByZdT897SW4c",
  authDomain: "user-email-pass-auth-d399f.firebaseapp.com",
  projectId: "user-email-pass-auth-d399f",
  storageBucket: "user-email-pass-auth-d399f.appspot.com",
  messagingSenderId: "630545674506",
  appId: "1:630545674506:web:e0afe2333ba5538125caf3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
