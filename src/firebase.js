import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBaFahje2BjUSm8FojyWpqXBo2dXVEQYaE",
  authDomain: "a-sustainable-home-5419b.firebaseapp.com",
  databaseURL: "https://a-sustainable-home-5419b.firebaseio.com",
  projectId: "a-sustainable-home-5419b",
  storageBucket: "a-sustainable-home-5419b.appspot.com",
  messagingSenderId: "792122295768",
  appId: "1:792122295768:web:92c2238c3f4e8aad9cdead",
  measurementId: "G-3ZGEW78Z5C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase; 