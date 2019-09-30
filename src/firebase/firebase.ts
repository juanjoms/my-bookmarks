const firebaseConfig = {
  apiKey: "AIzaSyBdN8ZeoRwsGNkGMZpchOX5th5WM9DLHFs",
  authDomain: "bookmarks-juanjo.firebaseapp.com",
  databaseURL: "https://bookmarks-juanjo.firebaseio.com",
  projectId: "bookmarks-juanjo",
  storageBucket: "bookmarks-juanjo.appspot.com",
  messagingSenderId: "404754854625",
  appId: "1:404754854625:web:dff4ea5d7f56b21f"
};

let database: any;

export const useFirebase = (callback: (database: any) => void) => {

  const databaseLoaded = () => {
    const firebase = (window as any).firebase;
    firebase.initializeApp(firebaseConfig);
    database = firebase.firestore();
    callback(database)
  }

  if (database) {
    callback(database);
  } else {
    const firebaseTag = document.createElement('script');
    firebaseTag.src = 'https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js';
    const databaseTag = document.createElement('script');
    databaseTag.src = 'https://www.gstatic.com/firebasejs/6.1.0/firebase-firestore.js';
    databaseTag.onload = databaseLoaded;

    const firstScriptTag: any = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(firebaseTag, firstScriptTag);
    firstScriptTag.parentNode.insertBefore(databaseTag, firstScriptTag);
  }
}

export const saveBookmarks = (db: any, email: string, bookmarks: string) => {
  db.collection('bookmarks').doc(email).set({bookmarks})
}

export const queryBookmarks = (db: any, email: string): Promise<any> => {
  return db.collection('bookmarks').doc(email).get();
}