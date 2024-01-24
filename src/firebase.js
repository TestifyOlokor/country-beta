import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDrJQYyeh14vmy15qR03lDG3H0IcqcD1fc",
  authDomain: "countriesbeta.firebaseapp.com",
  projectId: "countriesbeta",
  storageBucket: "countriesbeta.appspot.com",
  messagingSenderId: "533971740383",
  appId: "1:533971740383:web:d4c6667efd7f0d286ceb6a",
  measurementId: "G-QLGLBH0P7N",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
