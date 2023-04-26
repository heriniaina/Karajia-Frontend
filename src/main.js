import { createApp } from 'vue'


// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import App from './App.vue'

import router from "./router"

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmvqhQvcpBBcNre0V666gTvYAHwUj8TQk",
  authDomain: "karajia-chat.firebaseapp.com",
  projectId: "karajia-chat",
  storageBucket: "karajia-chat.appspot.com",
  messagingSenderId: "950409095181",
  appId: "1:950409095181:web:3d7c62d37b6cdb2eb14d44",
  measurementId: "G-D5N0T7HNP7"
};

initializeApp(firebaseConfig);


const auth = getAuth();


const app = createApp(App)
app.use(router)
app.mount('#app')
