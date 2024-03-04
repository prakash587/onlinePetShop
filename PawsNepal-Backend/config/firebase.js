const {initializeApp} = require("firebase/app")
const {getAnalytics} = require("firebase/analytics")

const firebaseConfig = {
    apiKey: "AIzaSyDVT4dWNrFhMF7kRLxnsKhWvHfBbcZZSto",
    authDomain: "notification-ce89f.firebaseapp.com",
    projectId: "notification-ce89f",
    storageBucket: "notification-ce89f.appspot.com",
    messagingSenderId: "815737329663",
    appId: "1:815737329663:web:73156e0d4a40ab147e79ca",
    measurementId: "G-96HWKN7E5H"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);