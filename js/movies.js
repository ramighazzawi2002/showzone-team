// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// import {
//   getDatabase,
//   ref,
//   push,
//   set,
//   update,
//   remove,
//   get,
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAzRJMUA6qYsRrf-7NNi2KqvzPtaLZRSu0",
//   authDomain: "tv-shows-a6dfc.firebaseapp.com",
//   databaseURL:
//     "https://tv-shows-a6dfc-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "tv-shows-a6dfc",
//   storageBucket: "tv-shows-a6dfc.appspot.com",
//   messagingSenderId: "950780821633",
//   appId: "1:950780821633:web:6614119aa73d65008f8d80",
//   measurementId: "G-BLCV05YBNK",
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = getDatabase(app);
const firstName = sessionStorage.getItem("firstName");
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

    const filterMoviesBySearch = (movies, searchQuery) => {
      if (!searchQuery) {
        return movies;
      }
      return movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    const displayMovies = (movies) => {
      let container = document.getElementById("mo");
      container.innerHTML = "";

      movies.forEach((ele, index) => {
        if (index % 6 === 0) {
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
    };

    const updateDisplay = () => {
      const selectedGenres = getSelectedGenres();
      const searchQuery = document.querySelector(".inputbar").value;
      let filteredMovies = filterMoviesByGenre(seriesArray, selectedGenres);
      filteredMovies = filterMoviesBySearch(filteredMovies, searchQuery);
      displayMovies(filteredMovies);
    };

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateDisplay);
    });

    document
      .querySelector(".inputbar")
      .addEventListener("input", updateDisplay);

    // Initial display of all series
    displayMovies(seriesArray);
  })
  .catch((err) => {
    console.error("error:" + err);
  });
document.addEventListener("DOMContentLoaded", function () {
  const Log_In_js = document.getElementById("Log_In");
  const Logo_user_2 = document.getElementById("Logo_user_2");
  if (firstName) {
    if (Log_In_js) Log_In_js.style.display = "none";
    if (Logo_user_2) Logo_user_2.style.display = "inline";
  }

  if (Log_Out_user) {
    Log_Out_user.addEventListener("click", function () {
      // إزالة بيانات المستخدم من sessionStorage
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("issuccess");
      sessionStorage.removeItem("issuccess2");
      sessionStorage.removeItem("movie");

      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = "../pages/logIn.html";
    });
  }
});
