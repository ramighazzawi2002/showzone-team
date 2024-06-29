function Series(name, genres, summary, image, rating) {
  this.name = name;
  this.genres = genres;
  this.summary = summary;
  this.image = image ? image.medium : "default-image.png"; // استخدم صورة افتراضية إذا لم تتوفر صورة
  this.rating = rating.average;
}

const url = "https://api.tvmaze.com/shows";
fetch(url)
  .then((res) => res.json())
  .then((json) => {
    const seriesArray = json
      .slice(0, 16)
      .map(
        (item) =>
          new Series(
            item.name,
            item.genres,
            item.summary,
            item.image,
            item.rating
          )
      );
    console.log(seriesArray);
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
          
          <img src="${ele.image}" alt="${ele.name}" style="width:100%; height:auto;">
          
         
        `;
      card.innerHTML = content;

      container.lastElementChild.appendChild(card);
    });
  })
  .catch((err) => {
    console.error("error:" + err);
  });
