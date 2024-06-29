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
  .catch(err => {
    console.error("error:" + err);
  });
