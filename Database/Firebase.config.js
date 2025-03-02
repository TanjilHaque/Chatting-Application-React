// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDR_nQ8mg0z8MAXhcnTbNReU1DcXDuPQYU",
  authDomain: "chat-app-by-tanjil.firebaseapp.com",
  projectId: "chat-app-by-tanjil",
  storageBucket: "chat-app-by-tanjil.firebasestorage.app",
  messagingSenderId: "336080417340",
  appId: "1:336080417340:web:4ce6def8f304307d39c939"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;