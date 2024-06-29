import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
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

fetch("https://api.tvmaze.com/shows")
  .then((res) => res.json())
  .then((json) => {
    const seriesArray = json.map(
      (item) =>
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

    const checkboxes = document.querySelectorAll(".checkbox");

    const getSelectedGenres = () => {
      const selectedGenres = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.id);

      return selectedGenres.length > 0 ? selectedGenres : null;
    };

    const filterMoviesByGenre = (movies, selectedGenres) => {
      if (!selectedGenres) {
        return movies;
      }
      return movies.filter((movie) =>
        movie.genres.some((genre) => selectedGenres.includes(genre))
      );
    };

    const displayMovies = (movies) => {
      let container = document.getElementById("mo");
      container.innerHTML = "";

      movies.forEach((ele, index) => {
        if (index % 4 === 0) {
          const cardGrid = document.createElement("div");
          cardGrid.className = "card-grid";
          container.appendChild(cardGrid);
        }

        const card = document.createElement("div");
        card.className = "card";

        const content = `<img src="${ele.image}" alt="${ele.name}" style="width:100%; height:auto;">
        `;
        card.innerHTML = content;

        container.lastElementChild.appendChild(card);
      });
    };

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedGenres = getSelectedGenres();
        const filteredMovies = filterMoviesByGenre(seriesArray, selectedGenres);
        displayMovies(filteredMovies);
      });
    });

    // Initial display of all series
    displayMovies(seriesArray);
  })
  .catch((err) => {
    console.error("error:" + err);
  });
