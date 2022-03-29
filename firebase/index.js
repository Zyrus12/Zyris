import firebase from "firebase";
const app = firebase.initializeApp({
    apiKey: "AIzaSyANPZrdDmvZIz-9Flq6oZ3neundBe8w0Jg",
  
    authDomain: "zyris-2bf3d.firebaseapp.com",
  
    databaseURL: "https://zyris-2bf3d-default-rtdb.firebaseio.com",
  
    projectId: "zyris-2bf3d",
  
    storageBucket: "zyris-2bf3d.appspot.com",
  
    messagingSenderId: "1026920632312",
  
    appId: "1:1026920632312:web:ddedf48ff82b966a65900d",
  
    measurementId: "G-V5T0SMKK1L"
});
const data = firebase.database();
const storage = firebase.storage();

export {data, storage, firebase as default};