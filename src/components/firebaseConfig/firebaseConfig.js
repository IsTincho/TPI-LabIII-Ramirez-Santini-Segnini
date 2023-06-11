// firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcpWUixFvfZWoEXwsAhix-ls2AyqY_c5g",
  authDomain: "tpi-labiii-rss.firebaseapp.com",
  databaseURL: "https://tpi-labiii-rss-default-rtdb.firebaseio.com",
  projectId: "tpi-labiii-rss",
  storageBucket: "tpi-labiii-rss.appspot.com",
  messagingSenderId: "240824195174",
  appId: "1:240824195174:web:7b800cffbbc5fd9b34f5a7",
  measurementId: "G-L19JX4BZVY",
};

// Inicializar la app de Firebase
firebase.initializeApp(firebaseConfig);

// Exportar instancias de los servicios que vayas a utilizar
export const auth = firebase.auth();
export const database = firebase.database();
