// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaxpwTmH2vohzZL2x4eX7B2Mp9nKc_fb4",
  authDomain: "teachlab-b8fa1.firebaseapp.com",
  projectId: "teachlab-b8fa1",
  storageBucket: "teachlab-b8fa1.firebasestorage.app",
  messagingSenderId: "636257899158",
  appId: "1:636257899158:web:204a39d525bd544c2c28b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);