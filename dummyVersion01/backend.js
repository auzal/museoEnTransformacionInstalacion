function firebaseInit() {  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBxsdNVf9M4kV6h0zPpZCyJ-sAY3uJupCA",
    authDomain: "auzal-new-museum.firebaseapp.com",
    projectId: "auzal-new-museum",
    storageBucket: "auzal-new-museum.appspot.com",
    messagingSenderId: "571983042511",
    appId: "1:571983042511:web:cde768baa7b59f0a6764ba",
    measurementId: "G-PGZLJNQJQT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

var NUMBER_OF_DOCS_PER_FETCH = 1000;

document.addEventListener('DOMContentLoaded', function() {
  firebaseInit();

  // fetch initial data
  fetchAllDocuments().then(function(allDocs) {
    // got the initial data, load the sketch
    var allAnswers = allDocs.map(function(doc) {
      return doc.answer;
    })
    processInitialArchive(allAnswers);
  });

  // subscribe to changes
  var isFirstSnapshot = true;
  firebase.firestore().collection('desires').orderBy('time', 'desc').onSnapshot(function(snapshot) {
    if(isFirstSnapshot === true) {
      isFirstSnapshot = false;
      return;
    }

    snapshot.docChanges().forEach(function(change) {
      if(change.type === 'added') {
        var data = change.doc.data();
        var answer = data.answer;
        processEntry(answer);
      }
    });
  }); 
});

function fetchAllDocuments() {
  return new Promise(function(resolveFetchAllDocuments) {
    var allDocs = [];

    function recursiveFetch(startAfter) {
      return new Promise(function(resolve) {      
        fetchPageOfDocuments(startAfter).then(function(data) {
          if(data.allDocs.length === 0) {
            resolve()
          } else {          
            allDocs = allDocs.concat(data.allDocs);
            return resolve(recursiveFetch(data.startAfter));
          }
        });
      })
    }

    recursiveFetch().then(function() {
      resolveFetchAllDocuments(allDocs);
    })
  })
}

function fetchPageOfDocuments(startAfterDoc) {
  return new Promise(function(resolve, reject) {  
    var allDocs = [];
    var startAfter = null;
    var query = null;

    var db = firebase.firestore();

    if(typeof startAfterDoc === 'undefined') {
      query = db.collection('desires').orderBy('time').limit(NUMBER_OF_DOCS_PER_FETCH).get();
    } else {
      query = db.collection('desires').orderBy('time').startAfter(startAfterDoc).limit(NUMBER_OF_DOCS_PER_FETCH).get();
    }

    query.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var data = doc.data();
        allDocs.push(data);
      });

      startAfter = querySnapshot.docs[querySnapshot.docs.length - 1];

      resolve({
        allDocs,
        startAfter
      });
    });
  });
}
