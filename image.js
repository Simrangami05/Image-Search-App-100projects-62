const apiKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formElement = document.getElementById("image-search-form");
const inputElement = document.getElementById("query-input");
const resultsContainer = document.querySelector(".results-container");
const loadMoreButton = document.getElementById("load-more-btn");

let searchTerm = "";
let currentPage = 1;

async function fetchImages() {
  searchTerm = inputElement.value;
  const endpoint = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${searchTerm}&client_id=${apiKey}`;

  const response = await fetch(endpoint);
  const data = await response.json();
  const results = data.results;

  if (currentPage === 1) {
    resultsContainer.innerHTML = "";
  }

  results.forEach((item) => {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result-item");

    const imgElement = document.createElement("img");
    imgElement.src = item.urls.small;
    imgElement.alt = item.alt_description;

    const linkElement = document.createElement("a");
    linkElement.href = item.links.html;
    linkElement.target = "_blank";
    linkElement.textContent = item.alt_description;

    resultDiv.appendChild(imgElement);
    resultDiv.appendChild(linkElement);
    resultsContainer.appendChild(resultDiv);
  });

  currentPage++;

  if (currentPage > 1) {
    loadMoreButton.style.display = "block";
  }
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPage = 1;
  fetchImages();
});

loadMoreButton.addEventListener("click", fetchImages);
