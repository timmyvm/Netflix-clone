import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhhplJFvFoR-9zN-M7F7IWZ9ZqJ29xLrY",
  authDomain: "netflix-clone-17023.firebaseapp.com",
  projectId: "netflix-clone-17023",
  storageBucket: "netflix-clone-17023.appspot.com",
  messagingSenderId: "774569214703",
  appId: "1:774569214703:web:c98ca4150009bc189c511a",
  measurementId: "G-B4EHZZZBG4",
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };

export default db;
