// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcpgMgw2QGXwC8zk8WTcNZMrDxm9gcYF4",
  authDomain: "jobportal-112da.firebaseapp.com",
  projectId: "jobportal-112da",
  storageBucket: "jobportal-112da.appspot.com",
  messagingSenderId: "426400287014",
  appId: "1:426400287014:web:62b86fe1636910ee1419e7",
  measurementId: "G-YKL1DSE8XB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
