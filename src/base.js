
import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAYdnwWlxTfrYGRuX0Ioi3FILDOjiXgl2M",
  authDomain: "todo-awesomeness.firebaseapp.com",
  databaseURL: "https://todo-awesomeness.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;