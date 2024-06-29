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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
function Series(name, genres, summary, image, rating, id, premiered, schedule) {
  this.name = name;
  this.genres = genres;
  this.summary = summary;
  this.image = image.medium;
  this.rating = rating.average;
  this.id = id;
  this.premiered = premiered;
  this.schedule = schedule.time;
}

const url = "https://api.tvmaze.com/shows";
fetch(url)
  .then(res => res.json())
  .then(json => {
    const seriesArray = json.map(
      item =>
        new Series(
          item.name,
          item.genres,
          item.summary,
          item.image,
          item.rating,
          item.id,
          item.premiered,
          item.schedule
        )
    );

    seriesArray.forEach(series => {
      const newSeriesRef = push(ref(database, "series"));
      set(newSeriesRef, series)
        .then(() => {
          console.log("Data saved successfully.");
        })
        .catch(error => {
          console.error("Error saving data: ", error);
        });
    });

    // عرض البيانات في الصفحة
    let container = document.getElementById("mo");

    seriesArray.forEach((ele, index) => {
      if (index % 4 === 0) {
        const cardGrid = document.createElement("div");

        cardGrid.className = "card-grid";

        container.appendChild(cardGrid);
      }

      const card = document.createElement("div");
      card.className = "card";

      const content = `
          <a href="movieDetails.html">
          <img src="${ele.image}" alt="${ele.name}" style="width:100%; height:auto;">
          </a>
        `;
      card.innerHTML = content;

      container.lastElementChild.appendChild(card);
      card.addEventListener("click", () => {
        sessionStorage.setItem("movie", JSON.stringify(ele));
      });
    });
  })
  .catch(err => {
    console.error("error:" + err);
  });
