import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7wHNCq3ceK-yvlfb3EJ1V3bgqWln6qkw",
  authDomain: "growthcx-todo.firebaseapp.com",
  projectId: "growthcx-todo",
  storageBucket: "growthcx-todo.appspot.com",
  messagingSenderId: "613170789069",
  appId: "1:613170789069:web:bac50aa2f06ade16ffc784",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();
export { auth, provider, db };
