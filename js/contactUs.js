import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAzRJMUA6qYsRrf-7NNi2KqvzPtaLZRSu0",
  authDomain: "tv-shows-a6dfc.firebaseapp.com",
  databaseURL:
    "https://tv-shows-a6dfc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tv-shows-a6dfc",
  storageBucket: "tv-shows-a6dfc.appspot.com",
  messagingSenderId: "950780821633",
  appId: "1:950780821633:web:6614119aa73d65008f8d80",
  measurementId: "G-BLCV05YBNK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

let submit_js = document.getElementById("submit");
let Done_js = document.getElementById("Done");
submit_js.addEventListener("click", function (ContactUS) {
  ContactUS.preventDefault();
  let firstName_js = document.getElementById("firstName").value;
  let lastName_js = document.getElementById("lastName").value;
  let email_js = document.getElementById("email").value;
  let phone_js = document.getElementById("phone").value;
  let message_js = document.getElementById("message").value;
  let emailEncoded = email_js.replaceAll(".", "_");
  let emailRef = ref(db, `ContactUs/${emailEncoded}`);
  set(emailRef, {
    First_Name: firstName_js,
    Last_Name: lastName_js,
    Email: email_js,
    Phone: phone_js,
    Message: message_js,
  });
  Done_js.style.display = "block";
});
