import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);

export default app;
