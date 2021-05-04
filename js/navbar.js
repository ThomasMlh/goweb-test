const myLinks = document.getElementById("nav-links");
const burgerIcon = document.getElementById("icon");

burgerIcon.addEventListener("click", () => {
  if (window.innerWidth <= 767) {
    if (myLinks.style.display === "block") {
      myLinks.style.display = "none";
    } else {
      myLinks.style.display = "block";
    }
  } else {
    myLinks.style.display = "block";
  }
});

window.addEventListener("resize", () => {
  window.innerWidth > 767
    ? (myLinks.style.display = "block")
    : (myLinks.style.display = "none");
});
