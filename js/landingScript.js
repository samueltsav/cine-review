const API_URL = "http://localhost:3000";

const movieTitle = document.getElementById("movie-title");
const movieGenre = document.getElementById("movie-genre");
const movieYear = document.getElementById("movie-year");
const movieDuration = document.getElementById("movie-duration");
const movieRating = document.getElementById("movie-rating");
const movieDescription = document.getElementById("movie-description");
const moviePoster = document.getElementById("movie-poster");
const carousel = document.getElementById("carousel");

let currentSlide = 2;

let movies = [];

async function getMovies() {
  try {
    const res = await fetch(`${API_URL}/movies`);
    if (!res.ok) throw new Error("Failed to fetch");

    movies = await res.json();
    currentSlide = 0;
    updateCarousel();
  } catch (err) {
    console.error("Error:", err);
  }
}
function updateCarousel() {
  if (!movies.length) return;

  const movie = movies[currentSlide];

  carousel.innerHTML = `
  <div class="movie-poster">
    <div class="rating-badge">
      <span class="star">★</span>
      <span id="movie-rating">${movie.rating ?? "N/A"}</span>
    </div>

    <img
      src="${movie.image}"
      alt="${movie.title}"
    />
  </div>

  <div class="movie-content">
    <div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>

        <div class="movie-meta">
          <span class="movie-genre">${movie.genre}</span>
          <span>•</span>
          <span class="movie-year">${movie.year}</span>
          <span>•</span>
          <span class="movie-duration">${movie.duration} min</span>
        </div>
      </div>

      <p id="movie-description">
        ${movie.description ?? "No description available."}
      </p>
    </div>

    <div>
      <a href="#" class="view-details-btn">View Details</a>
    </div>
  </div>
  `;

  // Update indicators
  document.querySelectorAll(".indicator").forEach((ind, idx) => {
    ind.classList.toggle("active", idx === currentSlide);
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % movies.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + movies.length) % movies.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

// Auto-play carousel
setInterval(nextSlide, 5000);

// Accordion functionality
function toggleAccordion(index) {
  const items = document.querySelectorAll(".accordion-item");
  const clickedItem = items[index];
  const isActive = clickedItem.classList.contains("active");

  // Close all items
  items.forEach((item) => item.classList.remove("active"));

  // Open clicked item if it wasn't active
  if (!isActive) {
    clickedItem.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded",
  getMovies()
)

