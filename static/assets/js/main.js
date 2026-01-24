document.addEventListener("DOMContentLoaded", () => {

  const loadSection = (id, file) => {
    fetch(file)
      .then(res => res.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(err => console.error(`Error loading ${file}`, err));
  };

  loadSection("hero-section", "sections/hero.html");
  loadSection("story-section", "sections/story.html");
  loadSection("services-section", "sections/services.html");
  loadSection("gallery-section", "sections/gallery.html");
  loadSection("footer-section", "sections/footer.html");

});


function toggleWhatsApp() {
  const popup = document.querySelector(".wa-popup");
  if (!popup) return;

  popup.style.display =
    popup.style.display === "block" ? "none" : "block";
}
