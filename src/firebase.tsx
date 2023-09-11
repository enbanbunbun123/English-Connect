import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFEfWFLmdtefcaaH1Dw6UBNsHlLZePZPs",
  authDomain: "fir-signin-99989.firebaseapp.com",
  projectId: "fir-signin-99989",
  storageBucket: "fir-signin-99989.appspot.com",
  messagingSenderId: "605975442962",
  appId: "1:605975442962:web:afd31b1be411806b4e8acb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
