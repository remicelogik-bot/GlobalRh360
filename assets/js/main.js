document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
      var expanded = document.body.classList.contains("nav-open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  var notice = document.getElementById("form-notice");
  if (notice && window.location.search.indexOf("erreur=1") !== -1) {
    notice.hidden = false;
    notice.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
