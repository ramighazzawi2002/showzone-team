if (sessionStorage.getItem("issuccess") === "true") {
  let alert1 = document.getElementById("alert");
  alert1.style.display = "flex";

  sessionStorage.setItem("issuccess", false);
  setTimeout(function () {
    alert1.style.display = "none";
  }, 5000);
}

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

    let arrayyys = [
      "Trending",
      "Upcoming",
      "TV Series",
      "Popular movies in September",
    ];
    const filterMoviesByGenre = (movies, selectedGenres) => {
      if (!selectedGenres) {
        arrayyys = [
          "Trending",
          "Upcoming",
          "TV Series",
          "Popular movies in September",
        ];
        return movies;
      }
      arrayyys = "";
      return movies.filter((movie) =>
        movie.genres.some((genre) => selectedGenres.includes(genre))
      );
    };

    const filterMoviesBySearch = (movies, searchQuery) => {
      if (!searchQuery) {
        arrayyys = [
          "Trending",
          "Upcoming",
          "TV Series",
          "Popular movies in September",
        ];
        return movies;
      }
      arrayyys = "";
      return movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    const displayMovies = (movies, limit = 16) => {
      let container = document.getElementById("mo");
      container.innerHTML = "";

      let i = 0;

      movies.slice(0, limit).forEach((ele, index) => {
        if (index % 4 === 0) {
          const cardGrid = document.createElement("div");
          const batata = document.createElement("div");
          batata.innerHTML = arrayyys[i] ?? "";
          cardGrid.className = "card-grid";
          container.appendChild(batata);
          container.appendChild(cardGrid);
          if (i < 4) {
            i++;
          }
        }

        const card = document.createElement("div");
        card.className = "card";

        const content = `
          <a href="pages/movieDetails.html">
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

      // Display all filtered movies if filters are applied, otherwise display only 16
      if (selectedGenres || searchQuery) {
        displayMovies(filteredMovies, filteredMovies.length);
      } else {
        displayMovies(filteredMovies, 16);
      }
    };

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateDisplay);
    });

    document
      .querySelector(".inputbar")
      .addEventListener("input", updateDisplay);

    // Initial display of all series
    displayMovies(seriesArray, 16);
  })
  .catch((err) => {
    console.error("error:" + err);
  });
