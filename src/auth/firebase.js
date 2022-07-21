import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

// TODO: Replace the following with your app's Firebase project configuration
//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
//! get firebaseconfig settings from firebase console settings 👇
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, navigate, displayName) => {
  //? firebase method used to create a new user 👉 createUserWithEmailAndPassword()
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? firebase method used to update user profile 👉 updateProfile()
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    toastSuccessNotify("Registered successfully!");
    navigate("/");
    console.log(userCredential);
  } catch (err) {
    toastErrorNotify(err.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
//! Enable login with email/password 🚩
export const signIn = async (email, password, navigate) => {
  //? firebase method used for current user to login 👉 signInWithEmailAndPassword()
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
    // sessionStorage.setItem('user', JSON.stringify(userCredential.user));
    console.log(userCredential);
  } catch (err) {
    toastErrorNotify(err.message);
    console.log(err);
  }
};

export const userObserver = (setCurrentUser) => {
  //? Firebase method that monitors whether the user is signin or not and returns the new user as a response when the user changes 👉 onAuthStateChanged()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};

export const logOut = () => {
  signOut(auth);
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Google
//! Enable login with Google 🚩
//* => Authentication => sign-in-method => Authorized domains => add domain
//! After deploying the project, add the deploy link to the domain list for google sign-in to work. 🚩
export const signUpProvider = (navigate) => {
  //? firebase method used to login with google 👉 GoogleAuthProvider()
  const provider = new GoogleAuthProvider();
  //? Firebase method used to login with popup window 👉 signInWithPopup
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
      toastSuccessNotify("Logged out successfully!");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};
