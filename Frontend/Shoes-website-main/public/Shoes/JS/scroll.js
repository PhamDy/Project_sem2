// scroll.js
window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    if (window.scrollY > 90) {
      header.classList.add("sticky");
    } else if (window.scrollY === 0) {
      header.classList.remove("sticky");
    }
  });
  
  