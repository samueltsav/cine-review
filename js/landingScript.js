const API_URL = "http://localhost:3000";

const movieTitle = document.getElementById("movie-title");
const movieGenre = document.getElementById("movie-genre");
const movieYear = document.getElementById("movie-year");
const movieDuration = document.getElementById("movie-duration");
const movieRating = document.getElementsByClassName(".top-movie-card");
const movieDescription = document.getElementById("movie-description");
const moviePoster = document.getElementById("movie-poster");
const carousel = document.getElementById("carousel");
const topRatedContainer = document.getElementById("top-movies-grid");

let currentSlide = 0;

let movies = [];
let reviews = [];

// Calculate average rating from reviews
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;

  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
  }

  const average = sum / reviews.length;
  return average.toFixed(1);
}

async function getMovies() {
  try {
    const moviesRes = await fetch(`${API_URL}/movies`);
    if (!moviesRes.ok) throw new Error("Failed to fetch");
    movies = await moviesRes.json();

    
    const reviewsRes = await fetch(`${API_URL}/reviews`);
    if (!reviewsRes.ok) throw new Error("Failed to fetch reviews");
    reviews = await reviewsRes.json(); // Now this updates the global variable


    // Calculate average ratings for each movie based on reviews
    movies = movies.map((movie) => {
      const movieReviews = reviews.filter(
        (review) => Number(review.movieId) === Number(movie.id)
      );
      const avgRating = calculateAverageRating(movieReviews);
      return {
        ...movie,
        rating: avgRating > 0 ? avgRating : 0,
        reviewCount: movieReviews.length,
      };
    });

    currentSlide = 0;
    updateCarousel();
    renderTopRated();
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
        <span class="stars">★</span>
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

function renderTopRated() {
  const topMoviesGrid = document.getElementById("top-movies-grid");

  if (movies.length === 0) {
    topMoviesGrid.innerHTML = '<div class="loading">No movies available</div>';
    return;
  }

  // Sort movies by rating and get top 3
  const topMovies = [...movies]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  // Generate star rating
  function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  }

  topMoviesGrid.innerHTML = topMovies
    .map(
      (movie, index) => `
      <div class="top-movie-card">
        <div class="rank-badge">${index + 1}</div>

        <div class="top-movie-info">
          <img
            src="${movie.image}"
            alt="${movie.title}"
            class="top-movie-poster"
          />

          <div>
            <h4>${movie.title}</h4>

            <div class="rating-stars">
              <span class="stars">${getStarRating(movie.rating || 0)}</span>
              <span class="rating-value">${movie.rating ?? "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      `
    )
    .join("");
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

document.addEventListener("DOMContentLoaded", getMovies());
