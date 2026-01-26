const MOVIES_URL = "http://localhost:3000/movies";
const REVIEWS_URL = "http://localhost:3000/reviews";
const WATCHLIST_URL = "http://localhost:3000/watchlist";

let currentMovieId = null;

const overlay = document.getElementById("details-overlay");
const model = document.getElementById("details-model");
const closeBtn = document.getElementById("details-close");

const posterImg = document.getElementById("details-poster");
const titleElem = document.getElementById("details-title");
const metaElem = document.getElementById("details-meta");
const starsElem = document.getElementById("details-stars");
const ratingTextElem = document.getElementById("details-rating-text");
const descElem = document.getElementById("details-description");

const directorsElem = document.getElementById("details-director");
const castElem = document.getElementById("details-cast");

const reviewCountElem = document.getElementById("details-review-count");
const reviewsElem = document.getElementById("details-reviews");

const writeReviewBtn = document.getElementById("details-write-review");
const watchlistBtn = document.getElementById("details-watchlist");

const reviewOverlay = document.getElementById("review-overlay");
const reviewClose = document.getElementById("review-close");
const reviewCancel = document.getElementById("review-cancel");
const reviewForm = document.getElementById("review-form");

const reviewerInput = document.getElementById("reviewer");
const ratingInput = document.getElementById("rating");
const commentInput = document.getElementById("comment");

// helper functions
function openOverlay(element) {
  element.classList.add("active");
  element.setAttribute("aria-hidden", "false");
  const dialog = element.querySelector("[role='dialog']");
  if (dialog) dialog.focus();
}

function closeOverlay(element) {
  element.classList.remove("active");
  element.setAttribute("aria-hidden", "true");
}

function stars(rating) {
  const maxStars = 5;
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalf ? 1 : 0);
  for (let i = 0; i < fullStars; i++) {
    stars.push('<i class="fa-solid fa-star"></i>');
  }
  if (hasHalf) {
    stars.push('<i class="fa-solid fa-star-half-stroke"></i>');
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push('<i class="fa-regular fa-star"></i>');
  }
  return stars.join("");
}

function timeAgo(isoDate) {
  const t = new Date(isoDate).getTime();
  if (!Number.isFinite(t)) return "";
  const diffMs = Date.now() - t;
  const sec = Math.floor(diffMs / 1000);

  if (sec < 10) return "just now";
  if (sec < 60) return `${sec} seconds ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;

  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} day${day === 1 ? "" : "s"} ago`;

  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo} month${mo === 1 ? "" : "s"} ago`;

  const yr = Math.floor(mo / 12);
  return `${yr} year${yr === 1 ? "" : "s"} ago`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return await res.json();
}

async function isInWatchlist(movieId) {
  const items = await fetchJson(`${WATCHLIST_URL}?movieId=${movieId}`);
  return items.length > 0 ? items[0] : null;
}

function toggleWatchlistButton(isOn) {
  watchlistBtn.classList.toggle("saved", isOn);
  watchlistBtn.setAttribute("aria-pressed", String(isOn));
  watchlistBtn.textContent = isOn ? "✅ In Watchlist" : "➕ Add to Watchlist";
}

function openDetails() {
  document.body.classList.add("model-open");
  openOverlay(overlay);
}

function closeDetails() {
  document.body.classList.remove("model-open");
  closeOverlay(overlay);
  currentMovieId = null;
}

// Close an overlay click
overlay.addEventListener("click", (e) => {
  if (e.target === overlay || e.target === closeBtn) {
    closeDetails();
  }
});

// Close on X
closeBtn.addEventListener("click", closeDetails);

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeDetails();
  }

  if (e.key === "Escape" && reviewOverlay?.classList.contains("active")) {
    closeOverlay(reviewOverlay);
    return;
  }

  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeDetails();
    return;
  }
});

// ---------- actions ----------
writeReviewBtn?.addEventListener("click", () => {
  if (!currentMovieId || !reviewOverlay) return;
  reviewForm?.reset();
  ratingInput.value = 5;
  openOverlay(reviewOverlay);
});

reviewClose?.addEventListener("click", () => closeOverlay(reviewOverlay));
reviewCancel?.addEventListener("click", () => closeOverlay(reviewOverlay));

reviewForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentMovieId) return;

  const payload = {
    movieId: Number(currentMovieId),
    reviewer: reviewerInput.value.trim(),
    rating: Math.max(1, Math.min(5, Number(ratingInput.value))),
    comment: commentInput.value.trim(),
    createdAt: new Date().toISOString(),
  };

  // POST new review
  await fetch(REVIEWS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  closeOverlay(reviewOverlay);
  await openMovieDetails(currentMovieId); // re-render model with new review
});

watchlistBtn.addEventListener("click", async (e) => {
  e.stopPropagation();
  if (!currentMovieId) return;

  const isOn = await window.watchlistStore.toggleWatchlist(currentMovieId);
  toggleWatchlistButton(isOn);
});

window.addEventListener("watchlist:changed", (e) => {
  if (!currentMovieId) return;
  const { movieId, isOn } = e.detail;
  if (Number(movieId) === Number(currentMovieId)) {
    toggleWatchlistButton(isOn);
  }
});



// main render function
async function openMovieDetails(movieId) {
  currentMovieId = Number(movieId);

  // show model early with loading state
  titleElem.textContent = "Loading...";
  descElem.textContent = "";
  metaElem.textContent = "";
  posterImg.src = "";
  descElem.textContent = "";
  castElem.textContent = "";
  directorsElem.textContent = "";
  ratingTextElem.textContent = "";
  starsElem.innerHTML = "";
  reviewCountElem.textContent = "0";
  reviewsElem.innerHTML = '<div class="review-card">Loading reviews...</div>';

  const existing = window.watchlistStore?.isInWatchlist(currentMovieId);
  toggleWatchlistButton(!!existing);

  openDetails();
  try {
    const [movieRes, reviewsRes] = await Promise.all([
      fetch(`${MOVIES_URL}/${currentMovieId}`),
      fetch(`${REVIEWS_URL}?movieId=${currentMovieId}`),
    ]);

    if (!movieRes.ok) throw new Error("Movie not found");
    const movie = await movieRes.json();
    const reviews = reviewsRes.ok ? await reviewsRes.json() : [];

    // movie basics
    posterImg.src = movie.image;
    posterImg.alt = `Poster of ${movie.title}`;
    titleElem.textContent = movie.title;

    metaElem.textContent = `${movie.genre} • ${movie.year} • ${movie.duration} mins`;
    descElem.textContent = movie.description || "No description available.";

    directorsElem.textContent = movie.director || "Unknown";
    castElem.innerHTML = "";
    (movie.cast || []).forEach((name) => {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = name;
      castElem.appendChild(pill);
    });

    // Ratings + reviews
    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    reviewCountElem.textContent = String(reviews.length);

    const avg =
      reviews.length === 0
        ? 0
        : reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) /
        reviews.length;

    starsElem.innerHTML = stars(avg);
    ratingTextElem.textContent = reviews.length
      ? `${avg.toFixed(1)} (${reviews.length})`
      : "No ratings yet";

    if (!reviews.length) {
      reviewsElem.innerHTML = `<div class="review-card">No reviews yet. Be the first to write one!</div>`;
    } else {
      reviewsElem.innerHTML = reviews
        .map(
          (r) => `
          <div class="review-card">
            <div class="review-top">
              <div class="review-name">${r.reviewer || "Anonymous"}</div>
              <div>${stars(r.rating)}</div>
            </div>
            <div class="review-comment">${r.comment || ""}</div>
            <div class="review-meta">${timeAgo(r.createdAt)}</div>
          </div>
        `
        )
        .join("");
    }

    // Watchlist state
    const existing = await isInWatchlist(currentMovieId);
    toggleWatchlistButton(!!existing);
  } catch (err) {
    titleElem.textContent = "Movie not found";
    descElem.textContent = "Could not load that movie. Please try again.";
    reviewsElem.innerHTML = "";
  }
}

// Example usage: openMovieDetails(1);

// Expose to global for watchlist page
window.openMovieDetails = openMovieDetails;
