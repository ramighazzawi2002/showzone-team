if (sessionStorage.getItem("issuccess") === "true") {
  let alert1 = document.getElementById("alert");
  alert1.style.display = "flex";

  sessionStorage.setItem("issuccess", false);
  setTimeout(function () {
    alert1.style.display = "";
  }, 5000);
}
