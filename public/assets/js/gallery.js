/* ===============================
   REGION → COUNTRY → IMAGE FILTER
================================ */

const regionBtns = document.querySelectorAll(".region-filter .btn");
const countryBox = document.querySelector(".country-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

let activeRegion = "all";
let activeCountry = "all";

/* REGION CLICK */
regionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    regionBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeRegion = btn.dataset.region;
    activeCountry = "all";

    buildCountryButtons();
    filterImages();
  });
});

/* BUILD COUNTRY BUTTONS */
function buildCountryButtons() {
  countryBox.innerHTML = "";

  if (activeRegion === "all") return;

  const countries = new Set();

  galleryItems.forEach(item => {
    if (item.dataset.region === activeRegion) {
      countries.add(item.dataset.country);
    }
  });

  countries.forEach(country => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = country;

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".country-filter .btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      activeCountry = country;
      filterImages();
    });

    countryBox.appendChild(btn);
  });
}

/* FILTER IMAGES */
function filterImages() {
  galleryItems.forEach(item => {
    const regionMatch =
      activeRegion === "all" || item.dataset.region === activeRegion;

    const countryMatch =
      activeCountry === "all" || item.dataset.country === activeCountry;

    item.style.display = regionMatch && countryMatch ? "block" : "none";
  });
}

/* ===============================
   LIGHTBOX (FILTER-AWARE)
================================ */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".nav.left");
const nextBtn = document.querySelector(".nav.right");

let currentImages = [];
let currentIndex = 0;

/* IMAGE CLICK */
galleryItems.forEach((item) => {
  const img = item.querySelector("img");

  img.addEventListener("click", () => {
    // collect ONLY visible images
    currentImages = Array.from(galleryItems)
      .filter(i => i.style.display !== "none")
      .map(i => i.querySelector("img"));

    currentIndex = currentImages.indexOf(img);

    showLightbox();
    lightbox.style.display = "flex";
  });
});

/* SHOW IMAGE */
function showLightbox() {
  lightboxImg.style.animation = "none";
  lightboxImg.offsetHeight; // reflow
  lightboxImg.style.animation = "zoomIn 0.3s ease";
  lightboxImg.src = currentImages[currentIndex].src;
}

/* NEXT */
nextBtn.addEventListener("click", () => {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  showLightbox();
});

/* PREVIOUS */
prevBtn.addEventListener("click", () => {
  if (!currentImages.length) return;
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  showLightbox();
});

/* CLOSE */
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});
