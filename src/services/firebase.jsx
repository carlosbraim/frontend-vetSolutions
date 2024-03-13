import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbOOVl1DMuJSn0vo7mtZjFK8kUZvpuJ6I",
  authDomain: "pet-solutions-d3390.firebaseapp.com",
  projectId: "pet-solutions-d3390",
  storageBucket: "pet-solutions-d3390.appspot.com",
  messagingSenderId: "552844043840",
  appId: "1:552844043840:web:9b883bd4b60030d30ea1a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);