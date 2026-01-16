const regionBtns = document.querySelectorAll(".region-filter .btn");
const countryBox = document.querySelector(".country-filter");
const items = document.querySelectorAll(".gallery-item");

let activeRegion = "all";
let activeCountry = "all";

/* REGION CLICK */
regionBtns.forEach(btn => {
  btn.onclick = () => {
    regionBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeRegion = btn.dataset.region;
    activeCountry = "all";

    buildCountryButtons();
    filterImages();
  };
});

/* BUILD COUNTRY BUTTONS */
function buildCountryButtons() {
  countryBox.innerHTML = "";

  if (activeRegion === "all") return;

  const countries = new Set();

  items.forEach(item => {
    if (item.dataset.region === activeRegion) {
      countries.add(item.dataset.country);
    }
  });

  countries.forEach(country => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = country;

    btn.onclick = () => {
      document
        .querySelectorAll(".country-filter .btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      activeCountry = country;
      filterImages();
    };

    countryBox.appendChild(btn);
  });
}

/* FILTER IMAGES */
function filterImages() {
  items.forEach(item => {
    const show =
      (activeRegion === "all" || item.dataset.region === activeRegion) &&
      (activeCountry === "all" || item.dataset.country === activeCountry);

    item.style.display = show ? "block" : "none";
  });
}
