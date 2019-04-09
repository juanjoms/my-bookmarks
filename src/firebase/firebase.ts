// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBdN8ZeoRwsGNkGMZpchOX5th5WM9DLHFs",
  authDomain: "bookmarks-juanjo.firebaseapp.com",
  databaseURL: "https://bookmarks-juanjo.firebaseio.com",
  projectId: "bookmarks-juanjo",
  storageBucket: "bookmarks-juanjo.appspot.com",
  messagingSenderId: "404754854625"
};

export const firebaseApp  = firebase.initializeApp(config);