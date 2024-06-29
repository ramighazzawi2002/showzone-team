if (sessionStorage.getItem("issuccess") === "true") {
  let alert1 = document.getElementById("alert");
  alert1.style.display = "flex";

  sessionStorage.setItem("issuccess", false);
  setTimeout(function () {
    alert1.style.display = "";
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
    // console.log(seriesArray);
    let container = document.getElementById("mo");
    // let ba = document.getElementById("ee");
    let arrayyys = [
      "Trending",
      "Upcoming",
      "TV Series",
      "Popular movies on september",
    ];
    let i = 0;
    seriesArray.forEach((ele, index) => {
      if (index % 4 === 0) {
        const cardGrid = document.createElement("div");
        const batata = document.createElement("div");
        batata.innerHTML = arrayyys[i];
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
  })
  .catch(err => {
    console.error("error:" + err);
  });
