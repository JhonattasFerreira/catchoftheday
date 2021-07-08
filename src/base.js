import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCp3p6XOCe6ZMyxWkXa_PFmfoSgGY5bo1E",
  authDomain: "catch-of-the-day-jhonattas-fer.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jhonattas-fer-default-rtdb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;